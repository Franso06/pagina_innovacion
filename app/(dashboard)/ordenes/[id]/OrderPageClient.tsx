"use client"

import { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { OrderDetails } from "@/components/order-details"
import { ProgressReportForm } from "@/components/progress-report-form"
import { EvidenceUploader } from "@/components/evidence-uploader"
import { ChecklistForm } from "@/components/checklist-form"
import { TechnicianAssignment } from "@/components/technician-assignment"
import { ImpedimentForm } from "@/components/impediment-form"
import { CompleteOrderForm } from "@/components/complete-order-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { type UserRole, getCurrentUserRole } from "@/lib/roles"
import { Edit, Trash2 } from "lucide-react"

export default function OrderPageClient({ params }: { params: { id: string } }) {
  const [userRole, setUserRole] = useState<UserRole>("technician")

  useEffect(() => {
    setUserRole(getCurrentUserRole())
  }, [])

  // Aquí obtendrías los datos reales de la orden desde Supabase
  // Por ahora usamos datos de ejemplo
  const order = {
    id: params.id,
    orderNumber: 12345,
    title: "Mantenimiento preventivo - Aire acondicionado",
    description:
      "Realizar mantenimiento preventivo de equipo de aire acondicionado en oficina central. Incluye limpieza de filtros, revisión de refrigerante y comprobación de funcionamiento general.",
    orderType: "mantenimiento",

    client: {
      name: "Empresa Ejemplo S.A.",
      rut: "76.123.456-7",
      address: "Av. Principal #123, Santiago",
      phone: "+56 9 1234 5678",
      email: "contacto@empresaejemplo.cl",
    },

    location: {
      address: "Av. Principal #123, Piso 5, Santiago",
      coordinates: "-33.4489,-70.6693",
      mapLink: "https://maps.google.com/?q=-33.4489,-70.6693",
    },

    createdAt: "2023-06-10T08:30:00",
    scheduledDate: "2023-06-15T10:00:00",
    startTime: "2023-06-15T10:15:00",
    endTime: "2023-06-15T12:30:00",

    status: "in_progress",
    priority: "medium",

    assignedTo: "1",
    supervisorNotes: "Cliente ha reportado ruidos extraños en la unidad. Verificar estado de ventiladores y compresor.",

    updatedAt: "2023-06-12T09:30:00",

    attachedDocuments: [
      {
        id: "1",
        fileName: "Manual_Equipo.pdf",
        fileType: "application/pdf",
        filePath: "/placeholder.svg?height=300&width=400",
        description: "Manual técnico del equipo",
        createdAt: "2023-06-10T08:35:00",
      },
      {
        id: "2",
        fileName: "Historial_Mantenimiento.xlsx",
        fileType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        filePath: "/placeholder.svg?height=300&width=400",
        description: "Registro de mantenimientos anteriores",
        createdAt: "2023-06-10T08:40:00",
      },
    ],

    progressReports: [
      {
        id: "1",
        notes: "Iniciando revisión del equipo. Se observa acumulación de polvo en filtros.",
        status: "in_progress",
        createdAt: "2023-06-12T09:30:00",
      },
    ],

    evidence: [
      {
        id: "1",
        filePath: "/placeholder.svg?height=300&width=400",
        fileType: "image/jpeg",
        description: "Estado inicial del equipo",
        createdAt: "2023-06-12T09:35:00",
      },
    ],

    checklist: {
      id: "1",
      title: "Mantenimiento de Aire Acondicionado",
      items: [
        { id: "1", description: "Limpieza de filtros", required: true, orderNumber: 1 },
        { id: "2", description: "Revisión de nivel de refrigerante", required: true, orderNumber: 2 },
        { id: "3", description: "Limpieza de condensador", required: true, orderNumber: 3 },
        { id: "4", description: "Comprobación de temperatura de salida", required: true, orderNumber: 4 },
        { id: "5", description: "Revisión de ruidos anormales", required: false, orderNumber: 5 },
      ],
    },
  }

  if (!order) {
    notFound()
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading={`OT #${order.orderNumber}: ${order.title}`}
        text="Detalle de la orden y reporte de avances"
      >
        {userRole === "supervisor" && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/ordenes/${params.id}/editar`}>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Link>
            </Button>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </Button>
          </div>
        )}
      </DashboardHeader>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Detalles</TabsTrigger>
          <TabsTrigger value="progress">Avances</TabsTrigger>
          <TabsTrigger value="evidence">Evidencias</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-4">
          <div className="grid gap-4">
            <OrderDetails order={order} />

            {userRole === "supervisor" && order.status !== "completed" && (
              <TechnicianAssignment
                orderId={order.id}
                currentTechnicianId={order.assignedTo}
                scheduledDate={new Date(order.scheduledDate)}
              />
            )}

            {userRole === "technician" && order.status === "in_progress" && <ImpedimentForm orderId={order.id} />}

            {userRole === "technician" && order.status === "in_progress" && <CompleteOrderForm orderId={order.id} />}
          </div>
        </TabsContent>
        <TabsContent value="progress" className="mt-4">
          <ProgressReportForm orderId={order.id} />
        </TabsContent>
        <TabsContent value="evidence" className="mt-4">
          <EvidenceUploader orderId={order.id} />
        </TabsContent>
        <TabsContent value="checklist" className="mt-4">
          <ChecklistForm orderId={order.id} checklist={order.checklist} />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
