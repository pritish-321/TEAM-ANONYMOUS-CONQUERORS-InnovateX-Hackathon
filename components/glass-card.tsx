import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: ReactNode
  className?: string
}

export default function GlassCard({ children, className}: GlassCardProps) {
  return (
    <div className={cn("glass-card rounded-lg p-4 md:p-6", className)}>
      {children}
    </div>
  )
}
