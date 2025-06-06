import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { OrdersOverview } from "@/components/orders-overview"
import { RecentActivity } from "@/components/recent-activity"
import { StatsCards } from "@/components/stats-cards"

export const metadata: Metadata = {
  title: "Dashboard | TechField",
  description: "Resumen de órdenes de trabajo y actividades recientes",
}

export default function DashboardPage() {
  // Datos de ejemplo para el dashboard
  const stats = {
    pendingOrders: 5,
    inProgressOrders: 3,
    completedOrders: 12,
    urgentOrders: 2,
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Bienvenido a tu panel de control" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCards stats={stats} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <OrdersOverview className="col-span-4" />
        <RecentActivity className="col-span-3" />
      </div>
    </DashboardShell>
  )
}
