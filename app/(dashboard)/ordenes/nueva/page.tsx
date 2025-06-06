import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { OrderForm } from "@/components/order-form"

export const metadata: Metadata = {
  title: "Nueva Orden | TechField",
  description: "Crear una nueva orden de trabajo",
}

export default async function NewOrderPage() {
  // En un entorno real, verificaríamos los permisos del usuario desde el servidor
  // Por ahora, simulamos esta verificación en el cliente

  // Datos de ejemplo para técnicos disponibles
  const technicians = [
    { id: "1", name: "Carlos Martínez" },
    { id: "2", name: "Laura Sánchez" },
    { id: "3", name: "Miguel Ángel Pérez" },
    { id: "4", name: "Ana Patricia Gómez" },
  ]

  return (
    <DashboardShell>
      <DashboardHeader heading="Nueva Orden de Trabajo" text="Crea una nueva orden de trabajo" />
      <OrderForm technicians={technicians} />
    </DashboardShell>
  )
}
