import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { TechniciansList } from "@/components/technicians-list"

export const metadata: Metadata = {
  title: "Técnicos | TechField",
  description: "Gestión de técnicos y asignación de órdenes",
}

export default function TechniciansPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Gestión de Técnicos" text="Administra los técnicos y sus asignaciones" />
      <TechniciansList />
    </DashboardShell>
  )
}
