"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ClipboardList, FileText, Settings, Bell, Users, BarChart } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { UserRole } from "@/lib/roles"

export function DashboardNav() {
  const pathname = usePathname()
  const [userRole, setUserRole] = useState<UserRole>("supervisor")

  useEffect(() => {
    // Cargar el rol desde localStorage
    const savedRole = localStorage.getItem("userRole") as UserRole | null
    setUserRole(savedRole || "supervisor")
  }, [])

  // Rutas comunes para ambos roles
  const commonRoutes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      href: "/ordenes",
      label: "Órdenes",
      icon: ClipboardList,
      active: pathname === "/ordenes" || pathname.startsWith("/ordenes/"),
    },
    {
      href: "/notificaciones",
      label: "Notificaciones",
      icon: Bell,
      active: pathname === "/notificaciones",
    },
    {
      href: "/configuracion",
      label: "Configuración",
      icon: Settings,
      active: pathname === "/configuracion",
    },
  ]

  // Rutas específicas para supervisores
  const supervisorRoutes = [
    {
      href: "/tecnicos",
      label: "Técnicos",
      icon: Users,
      active: pathname === "/tecnicos" || pathname.startsWith("/tecnicos/"),
    },
    {
      href: "/metricas",
      label: "Métricas",
      icon: BarChart,
      active: pathname === "/metricas",
    },
  ]

  // Rutas específicas para técnicos
  const technicianRoutes = [
    {
      href: "/reportes",
      label: "Mis Reportes",
      icon: FileText,
      active: pathname === "/reportes",
    },
  ]

  // Combinar rutas según el rol
  const routes =
    userRole === "supervisor" ? [...commonRoutes, ...supervisorRoutes] : [...commonRoutes, ...technicianRoutes]

  return (
    <nav className="grid items-start gap-2 py-4">
      {routes.map((route) => (
        <Link key={route.href} href={route.href}>
          <Button
            variant={route.active ? "secondary" : "ghost"}
            className={cn("w-full justify-start", route.active ? "bg-muted font-medium" : "font-normal")}
          >
            <route.icon className="mr-2 h-4 w-4" />
            {route.label}
          </Button>
        </Link>
      ))}
    </nav>
  )
}
