'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export default function ProductMasterPage() {
  const router = useRouter();

  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    gst: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if ((name === 'price' || name === 'gst') && type === 'number') {
      const numeric = value.replace(/[^0-9.]/g, '');
      setProduct((prev) => ({ ...prev, [name]: numeric }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const saveProduct = () => {
    const existing = localStorage.getItem('savedProducts');
    const savedProducts = existing ? JSON.parse(existing) : [];
    const newProduct = { ...product, id: Date.now().toString() };
    localStorage.setItem('savedProducts', JSON.stringify([...savedProducts, newProduct]));

    alert('Product saved! Redirecting to Invoice...');
    router.push('/sales-invoice');
  };

  const openCamera = () => {
    alert('Camera opened! (Simulated for now)');
    // Future integration with getUserMedia
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Product Master</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          id="name"
          name="name"
          type="text"
          value={product.name}
          onChange={handleChange}
          className="bg-background text-foreground"
          placeholder="Product Name"
        />
        <Input
          id="price"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          className="bg-background text-foreground"
          placeholder="Price (₹)"
        />
        <Input
          id="category"
          name="category"
          type="text"
          value={product.category}
          onChange={handleChange}
          className="bg-background text-foreground"
          placeholder="Category"
        />
        <Input
          id="gst"
          name="gst"
          type="number"
          value={product.gst}
          onChange={handleChange}
          className="bg-background text-foreground"
          placeholder="GST (%)"
        />
      </div>

      <div className="flex gap-4">
        <Button variant="secondary" onClick={saveProduct}>
          Save Product
        </Button>
        <Button variant="secondary" onClick={openCamera}>
          Scan Product for Training
        </Button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Product Preview</h2>
        <div className="rounded-xl overflow-hidden shadow border bg-muted">
          <table className="min-w-full text-sm">
            <thead className="bg-accent text-accent-foreground">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">GST</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t bg-background text-foreground">
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">₹{product.price}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">{product.gst}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
