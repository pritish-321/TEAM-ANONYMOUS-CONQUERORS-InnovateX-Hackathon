import React from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Props = {
  customer: { name: string; phone: string; address: string };
  products: Product[];
};

export default function PrintableInvoice({ customer, products }: Props) {
  const total = products.reduce((acc, p) => acc + p.price * p.quantity, 0);

  return (
    <div className="p-8 text-black text-sm">
      <h1 className="text-2xl font-bold mb-4">Invoice</h1>
      <div className="mb-6">
        <p><strong>Customer:</strong> {customer.name}</p>
        <p><strong>Phone:</strong> {customer.phone}</p>
        <p><strong>Address:</strong> {customer.address}</p>
      </div>

      <table className="w-full border border-black border-collapse mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-black p-2">Product Name</th>
            <th className="border border-black p-2">Price</th>
            <th className="border border-black p-2">Quantity</th>
            <th className="border border-black p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, index) => (
            <tr key={index}>
              <td className="border border-black p-2">{p.name}</td>
              <td className="border border-black p-2">{p.price}</td>
              <td className="border border-black p-2">{p.quantity}</td>
              <td className="border border-black p-2">{p.price * p.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right">
        <p className="text-lg font-semibold">Total: ₹{total}</p>
      </div>

      <div className="mt-8 text-xs text-gray-700">
        <p>Thank you for shopping with us!</p>
      </div>
    </div>
  );
}
