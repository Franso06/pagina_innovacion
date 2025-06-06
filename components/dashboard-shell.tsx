import type React from "react"
interface DashboardShellProps {
  children: React.ReactNode
  className?: string
}

export function DashboardShell({ children, className }: DashboardShellProps) {
  return <div className="flex flex-1 flex-col space-y-4 p-4 md:p-8">{children}</div>
}
