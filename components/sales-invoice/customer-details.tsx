'use client';

export default function CustomerDetails({ customer, setCustomer }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <input
        placeholder="Customer Name"
        value={customer.name}
        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
        className="border px-3 py-2 rounded"
      />
      <input
        placeholder="Phone"
        value={customer.phone}
        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
        className="border px-3 py-2 rounded"
      />
      <input
        placeholder="Address"
        value={customer.address}
        onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
        className="border px-3 py-2 rounded"
      />
    </div>
  );
}
