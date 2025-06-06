import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { NotificationsList } from "@/components/notifications-list"

export const metadata: Metadata = {
  title: "Notificaciones | TechField",
  description: "Centro de notificaciones y alertas",
}

export default function NotificationsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Notificaciones" text="Centro de notificaciones y alertas del sistema" />
      <NotificationsList />
    </DashboardShell>
  )
}
