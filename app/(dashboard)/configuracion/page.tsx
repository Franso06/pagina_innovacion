import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { SettingsForm } from "@/components/settings-form"

export const metadata: Metadata = {
  title: "Configuración | TechField",
  description: "Configuración de la cuenta y preferencias",
}

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Configuración" text="Administra tu cuenta y preferencias del sistema" />
      <SettingsForm />
    </DashboardShell>
  )
}
