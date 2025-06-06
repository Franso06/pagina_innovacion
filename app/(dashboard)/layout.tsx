import type React from "react"
import { DashboardNav } from "@/components/nav"
import { UserNav } from "@/components/user-nav"
import { MobileNav } from "@/components/mobile-nav"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // No hay verificación de sesión, permitimos acceso directo
  // Esto es para la demo

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 md:hidden">
            <MobileNav />
          </div>
          <div className="hidden md:flex">
            <h1 className="text-xl font-bold">TechField</h1>
          </div>
          <UserNav user={{ name: "Usuario Demo", email: "usuario@demo.com" }} />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}
