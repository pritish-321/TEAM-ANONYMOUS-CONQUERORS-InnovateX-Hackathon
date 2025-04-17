"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, Users, ScanLine, FileText, Settings, HelpCircle, LogOut } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()

  const menuItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Product Master", href: "/product-master", icon: Package },
    { name: "Customer Master", href: "/customer-master", icon: Users },
    { name: "Customer Scanning", href: "/customer-scanning", icon: ScanLine },
    { name: "Sales Invoice", href: "/sales-invoice", icon: FileText },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Help", href: "/help", icon: HelpCircle },
  ]

  return (
    <div className="hidden md:flex flex-col w-64 bg-muted/30 glass-card border-r border-border/40 h-screen">
      <div className="flex items-center justify-center h-16 border-b border-border/40">
        <h1 className="text-xl font-bold text-primary">FuturERP</h1>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto py-4">
        <nav className="flex-1 px-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm rounded-md transition-all duration-200 ${
                  isActive
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="px-2 mt-6">
          <Link
            href="#"
            className="flex items-center px-4 py-3 text-sm text-muted-foreground rounded-md hover:bg-muted/50 hover:text-foreground"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Link>
        </div>
      </div>
    </div>
  )
}
