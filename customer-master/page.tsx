"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const CustomerMasterPage = () => {
  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    contactNumber: "",
    email: "",
  })

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  // Handle saving the customer
  const handleSaveCustomer = () => {
    // Here, you can add the logic to save the customer
    console.log("Customer saved:", customer)
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Customer Master</h2>

      {/* Customer Name */}
      <div className="space-y-2 mb-4">
        <Label htmlFor="name">Customer Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={customer.name}
          onChange={handleChange}
          className="bg-muted/50 border-border/40"
          placeholder="Enter customer name"
        />
      </div>

      {/* Customer Address */}
      <div className="space-y-2 mb-4">
        <Label htmlFor="address">Customer Address</Label>
        <Input
          id="address"
          name="address"
          type="text"
          value={customer.address}
          onChange={handleChange}
          className="bg-muted/50 border-border/40"
          placeholder="Enter customer address"
        />
      </div>

      {/* Customer Contact Number */}
      <div className="space-y-2 mb-4">
        <Label htmlFor="contactNumber">Contact Number</Label>
        <Input
          id="contactNumber"
          name="contactNumber"
          type="tel"
          value={customer.contactNumber}
          onChange={handleChange}
          className="bg-muted/50 border-border/40"
          placeholder="Enter contact number"
        />
      </div>

      {/* Customer Email */}
      <div className="space-y-2 mb-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={customer.email}
          onChange={handleChange}
          className="bg-muted/50 border-border/40"
          placeholder="Enter email address"
        />
      </div>

      {/* Save Button */}
      <div className="mt-4">
        <Button
          variant="primary" // Change variant as needed (primary, secondary, etc.)
          onClick={handleSaveCustomer} // On button click, save the customer
          className="w-full py-2"
        >
          Save Customer
        </Button>
      </div>
    </div>
  )
}

export default CustomerMasterPage
