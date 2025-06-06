import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { OrderForm } from "@/components/order-form"

export const metadata: Metadata = {
  title: "Editar Orden | TechField",
  description: "Editar una orden de trabajo existente",
}

export default async function EditOrderPage({ params }: { params: { id: string } }) {
  // En un entorno real, verificaríamos los permisos del usuario desde el servidor
  // Por ahora, simulamos esta verificación en el cliente

  // Datos de ejemplo para técnicos disponibles
  const technicians = [
    { id: "1", name: "Carlos Martínez" },
    { id: "2", name: "Laura Sánchez" },
    { id: "3", name: "Miguel Ángel Pérez" },
    { id: "4", name: "Ana Patricia Gómez" },
  ]

  // Aquí obtendrías los datos reales de la orden desde Supabase
  // Por ahora usamos datos de ejemplo
  const orderData = {
    id: params.id,
    title: "Mantenimiento preventivo - Aire acondicionado",
    description: "Realizar mantenimiento preventivo de equipo de aire acondicionado en oficina central",
    orderType: "mantenimiento",
    priority: "medium",
    clientName: "Empresa Ejemplo S.A.",
    clientRut: "76.123.456-7",
    clientAddress: "Av. Principal #123, Santiago",
    clientPhone: "+56 9 1234 5678",
    clientEmail: "contacto@empresaejemplo.cl",
    location: "Av. Principal #123, Piso 5, Santiago",
    locationCoordinates: "-33.4489,-70.6693",
    scheduledDate: new Date("2023-06-15T10:00:00"),
    assignedTo: "1",
    supervisorNotes: "Cliente ha reportado ruidos extraños en la unidad. Verificar estado de ventiladores y compresor.",
  }

  if (!orderData) {
    notFound()
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={`Editar Orden #${params.id}`} text="Modifica los detalles de la orden de trabajo" />
      <OrderForm initialData={orderData} technicians={technicians} />
    </DashboardShell>
  )
}
