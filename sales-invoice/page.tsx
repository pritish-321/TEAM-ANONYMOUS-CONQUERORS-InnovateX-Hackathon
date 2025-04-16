// SalesPage.tsx

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import CustomerDetails from '@/components/sales-invoice/customer-details';
import InvoiceTable from '@/components/sales-invoice/invoice-table';
import InvoiceSummary from '@/components/sales-invoice/invoice-summary';
import { Product, ScannedProduct } from '@/types'; // Import both types
import ScanProducts from '@/components/sales-invoice/scan-products'; // Import the ScanProducts component

export default function SalesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' });

  // Function to add product to invoice
  const addProduct = (product: ScannedProduct) => {
    const newProduct: Product = {
      ...product,
      id: crypto.randomUUID(),
      quantity: 1,
      gst: product.gst ?? 0, // Ensure gst is always a number (default to 0 if undefined)
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  // Function to update product details in invoice
  const updateProduct = (index: number, updated: Product) => {
    const updatedProducts = [...products];
    updatedProducts[index] = updated;
    setProducts(updatedProducts);
  };

  // Function to remove product from invoice
  const removeProduct = (index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  // Function to generate the invoice (simulated print)
  const handleGenerateInvoice = () => {
    window.print();
  };

  // Function to handle QR code scanning (for training)
  const handleScanForTraining = () => {
    alert('Camera opened for training (simulated)');
  };

  // Initial temporary product (for manual product entry)
  const initialTempProduct = {
    name: '',
    category: '',
    price: 0,
    gst: 0,
  };

  // State to manage the temporary product being entered manually
  const [tempProduct, setTempProduct] = useState<Omit<Product, 'id' | 'quantity'>>(initialTempProduct);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Sales Invoice</h1>

      {/* Customer Details Section */}
      <CustomerDetails customer={customer} setCustomer={setCustomer} />

      {/* Manual Product Entry Section */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold">Add Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            className="p-2 rounded border bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white"
            onChange={(e) =>
              setTempProduct((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Category"
            className="p-2 rounded border bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white"
            onChange={(e) =>
              setTempProduct((prev) => ({ ...prev, category: e.target.value }))
            }
          />
          <input
            type="number"
            placeholder="Price"
            className="p-2 rounded border bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white"
            onChange={(e) =>
              setTempProduct((prev) => ({ ...prev, price: parseFloat(e.target.value) || 0 }))
            }
          />
          <input
            type="number"
            placeholder="GST %"
            className="p-2 rounded border bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white"
            onChange={(e) =>
              setTempProduct((prev) => ({ ...prev, gst: parseFloat(e.target.value) || 0 }))
            }
          />
        </div>

        <div className="flex gap-4">
          <Button variant="secondary" onClick={() => addProduct(tempProduct as ScannedProduct)}>
            Save Product
          </Button>
          <Button variant="secondary" onClick={handleScanForTraining}>
            Scan Product for Training
          </Button>
        </div>
      </div>

      {/* Scan Product Button */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold">Scan Product</h2>
        <ScanProducts onScan={addProduct} /> {/* Integrating ScanProducts component here */}
      </div>

      {/* Invoice Table Section */}
      <InvoiceTable
        products={products}
        updateProduct={updateProduct}
        removeProduct={removeProduct}
      />

      {/* Invoice Summary Section */}
      <InvoiceSummary products={products} />

      {/* Generate Invoice Button */}
      <Button variant="secondary" onClick={handleGenerateInvoice}>
        Generate Invoice
      </Button>
    </div>
  );
}
