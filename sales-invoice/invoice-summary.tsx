'use client';

export default function InvoiceSummary({ products }: { products: any[] }) {
  const subtotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <div className="text-right mt-4 space-y-1">
      <div>Subtotal: ₹{subtotal.toFixed(2)}</div>
      <div>Tax (18%): ₹{tax.toFixed(2)}</div>
      <div className="font-semibold text-lg">Total: ₹{total.toFixed(2)}</div>
    </div>
  );
}
