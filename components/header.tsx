"use client" // Add this to make the component a client-side component

import { useState } from "react"
import { Bell, Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    { name: "Dashboard", href: "/" },
    { name: "Product Master", href: "/product-master" },
    { name: "Customer Master", href: "/customer-master" },
    { name: "Customer Scanning", href: "/customer-scanning" },
    { name: "Sales Invoice", href: "/sales-invoice" },
  ]

  // Get the current page title
  const getPageTitle = () => {
    const currentItem = menuItems.find((item) => item.href === pathname)
    return currentItem ? currentItem.name : "Dashboard"
  }

  // Handle menu toggle
  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="border-b border-border/40 bg-muted/30 glass-card">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Button
          variant="primary" // Updated variant
          className="md:hidden mr-2"
          onClick={handleMenuToggle} // Added onClick handler
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle menu</span>
        </Button>

        <h2 className="text-lg font-semibold">{getPageTitle()}</h2>

        <div className="ml-auto flex items-center gap-4">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search-input" // Added id
              name="search" // Added name
              type="search"
              placeholder="Search..."
              className="w-64 pl-8 bg-muted/50 border-border/40 focus:border-primary/50 focus:ring-primary/20"
              value="" // You can handle state for search value here
              onChange={() => {}} // Provide a basic onChange handler
            />
          </div>

          <Button variant="primary" className="relative" onClick={() => {}}>
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            <span className="sr-only">Notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="primary" className="relative h-9 w-9 rounded-full" onClick={() => {}}>
                <Avatar className="h-9 w-9 border border-border/40">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback className="bg-muted">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
