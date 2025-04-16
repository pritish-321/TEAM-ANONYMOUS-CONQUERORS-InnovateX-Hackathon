import React from 'react';
import { Button } from '@/components/ui/button';
// app/product-master/page.tsx
import { Input } from "@/components/ui/input"; // Named import


type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  gst: number;
};

type Props = {
  products: Product[];
  updateProduct: (index: number, updated: Product) => void;
  removeProduct: (index: number) => void;
};

const InvoiceTable: React.FC<Props> = ({ products, updateProduct, removeProduct }) => {
  return (
    <table className="min-w-full table-auto border-collapse bg-white text-left shadow-lg rounded-lg">
      <thead className="bg-blue-500 text-white">
        <tr>
          <th className="px-4 py-2 font-medium">Product Name</th>
          <th className="px-4 py-2 font-medium">Price</th>
          <th className="px-4 py-2 font-medium">Quantity</th>
          <th className="px-4 py-2 font-medium">GST (%)</th>
          <th className="px-4 py-2 font-medium">Total</th>
          <th className="px-4 py-2 font-medium">Actions</th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {products.map((product, index) => (
          <tr key={product.id} className="border-t hover:bg-blue-50">
            <td className="px-4 py-2">{product.name}</td>
            <td className="px-4 py-2">
              <Input
                id={`price-${index}`} // Add unique id for each input
                name="price" // Add name for the field
                type="number"
                value={product.price}
                onChange={(e) => updateProduct(index, { ...product, price: parseFloat(e.target.value) })}
                className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Price"
              />
            </td>
            <td className="px-4 py-2">
              <Input
                id={`quantity-${index}`} // Add unique id for each input
                name="quantity" // Add name for the field
                type="number"
                value={product.quantity}
                onChange={(e) => updateProduct(index, { ...product, quantity: parseInt(e.target.value) })}
                className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Quantity"
              />
            </td>
            <td className="px-4 py-2">
              <Input
                id={`gst-${index}`} // Add unique id for each input
                name="gst" // Add name for the field
                type="number"
                value={product.gst}
                onChange={(e) => updateProduct(index, { ...product, gst: parseFloat(e.target.value) })}
                className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="GST"
              />
            </td>
            <td className="px-4 py-2">
              {(product.price * product.quantity * (1 + product.gst / 100)).toFixed(2)}
            </td>
            <td className="px-4 py-2">
              <Button variant="destructive" onClick={() => removeProduct(index)}>
                Remove
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InvoiceTable;
