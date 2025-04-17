'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import { parseScannedProduct } from '@/lib/parseScannedProduct';
import type { ScannedProduct } from '@/types';

export default function ScanProducts({
  onScan,
}: {
  onScan: (product: ScannedProduct) => void;
}) {
  const [scanning, setScanning] = useState(false);
  const [status, setStatus] = useState<string>('');
  const qrContainerRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<any>(null);

  // On unmount, clean up
  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch((e: any) => console.error(e));
      }
    };
  }, []);

  // When scanning state changes
  useEffect(() => {
    if (scanning) {
      startScanner();
    } else {
      stopScanner();
    }
  }, [scanning]);

  const startScanner = async () => {
    setStatus('Starting scanner...');

    try {
      // Dynamically import to avoid SSR issues
      const { Html5Qrcode } = await import('html5-qrcode');
      
      if (!qrContainerRef.current) {
        setStatus('Container ref not available');
        return;
      }

      // Make sure the container is empty before creating a new scanner
      qrContainerRef.current.innerHTML = '<div id="qr-reader"></div>';
      
      const html5QrCode = new Html5Qrcode("qr-reader");
      scannerRef.current = html5QrCode;

      setStatus('Accessing camera...');

      // Basic configuration - as simple as possible
      const config = {
        fps: 10,
        qrbox: 250,
      };

      const barcodeSuccessCallback = (decodedText: string) => {
        console.log(`Barcode detected: ${decodedText}`);
        setStatus(`Barcode detected! Processing...`);

        try {
          const product = parseScannedProduct(decodedText);
          if (product) {
            console.log("Product parsed:", product);
            onScan(product);
            setScanning(false);
          } else {
            setStatus('Invalid product format');
          }
        } catch (error) {
          console.error("Parse error:", error);
          setStatus(`Parse error: ${(error as Error).message}`);
        }
      };

      // Just log errors instead of showing them
      const barcodeErrorCallback = (error: any) => {
        // Normal scanning - don't need to show these errors
        // console.debug("Barcode scan attempt:", error);
      };

      try {
        // First try with environment camera (back camera)
        await html5QrCode.start(
          { facingMode: "environment" }, 
          config, 
          barcodeSuccessCallback, 
          barcodeErrorCallback
        );
        setStatus('Scanning - please point at a barcode');
      } catch (err) {
        console.error("Environment camera error:", err);
        setStatus('Trying user camera...');

        try {
          // If that fails, try the user camera (front camera)
          await html5QrCode.start(
            { facingMode: "user" }, 
            config, 
            barcodeSuccessCallback, 
            barcodeErrorCallback
          );
          setStatus('Scanning - please point at a barcode');
        } catch (err2) {
          console.error("All cameras failed:", err2);
          setStatus('Camera access failed');
          setScanning(false);
        }
      }
    } catch (err) {
      console.error("Scanner init error:", err);
      setStatus('Scanner initialization failed');
      setScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current = null;
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
  };

  return (
    <div>
      {!scanning && (
        <Button
          onClick={() => setScanning(true)}
          variant="secondary"
          className="flex items-center gap-2"
        >
          <Camera className="w-4 h-4" /> Scan Product
        </Button>
      )}

      {scanning && (
        <div className="mt-4">
          <div ref={qrContainerRef} className="overflow-hidden">
            <div id="qr-reader" className="border border-border rounded-lg"></div>
          </div>
          
          <p className="text-sm mt-2 italic">{status}</p>
          
          <Button
            variant="destructive"
            className="mt-2"
            onClick={() => setScanning(false)}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
