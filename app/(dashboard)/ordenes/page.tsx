import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { OrdersList } from "@/components/orders-list"

export const metadata: Metadata = {
  title: "Órdenes de Trabajo | TechField",
  description: "Gestiona tus órdenes de trabajo asignadas",
}

export default async function OrdersPage() {
  // Aquí obtendrías las órdenes reales desde Supabase
  // Por ahora usamos datos de ejemplo
  const orders = [
    {
      id: "1",
      orderNumber: 12345,
      title: "Mantenimiento preventivo - Aire acondicionado",
      description: "Realizar mantenimiento preventivo de equipo de aire acondicionado en oficina central",
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
      status: "pending",
      priority: "medium",
      scheduledDate: "2023-06-15T10:00:00",
      createdAt: "2023-06-10T08:30:00",
    },
    {
      id: "2",
      orderNumber: 12346,
      title: "Reparación de sistema eléctrico",
      description: "Revisar y reparar falla en sistema eléctrico del área de producción",
      orderType: "reparacion",
      client: {
        name: "Industrias Nacionales Ltda.",
        rut: "77.987.654-3",
        address: "Calle Industrial #456, Santiago",
        phone: "+56 9 8765 4321",
        email: "soporte@industriasnacionales.cl",
      },
      location: {
        address: "Planta Norte, Sector B, Santiago",
        coordinates: "-33.4289,-70.6500",
        mapLink: "https://maps.google.com/?q=-33.4289,-70.6500",
      },
      status: "in_progress",
      priority: "high",
      scheduledDate: "2023-06-12T14:00:00",
      createdAt: "2023-06-11T09:15:00",
    },
    {
      id: "3",
      orderNumber: 12347,
      title: "Instalación de cámaras de seguridad",
      description: "Instalar 5 cámaras de seguridad en perímetro exterior",
      orderType: "instalacion",
      client: {
        name: "Comercial Segura S.A.",
        rut: "76.543.210-9",
        address: "Av. Seguridad #789, Santiago",
        phone: "+56 9 5432 1098",
        email: "operaciones@comercialsegura.cl",
      },
      location: {
        address: "Sucursal Este, Santiago",
        coordinates: "-33.4389,-70.6300",
        mapLink: "https://maps.google.com/?q=-33.4389,-70.6300",
      },
      status: "pending",
      priority: "medium",
      scheduledDate: "2023-06-18T11:30:00",
      createdAt: "2023-06-10T15:45:00",
    },
    {
      id: "4",
      orderNumber: 12348,
      title: "Mantenimiento de red",
      description: "Revisar y optimizar conexiones de red en área administrativa",
      orderType: "mantenimiento",
      client: {
        name: "Consultores Asociados SpA",
        rut: "76.321.654-8",
        address: "Torre Empresarial, Piso 12, Santiago",
        phone: "+56 9 3216 5478",
        email: "sistemas@consultoresasociados.cl",
      },
      location: {
        address: "Oficina Central, Piso 3, Santiago",
        coordinates: "-33.4189,-70.6400",
        mapLink: "https://maps.google.com/?q=-33.4189,-70.6400",
      },
      status: "completed",
      priority: "low",
      scheduledDate: "2023-06-08T09:00:00",
      createdAt: "2023-06-07T10:20:00",
    },
    {
      id: "5",
      orderNumber: 12349,
      title: "Reparación urgente - Servidor principal",
      description: "El servidor principal presenta fallas intermitentes. Requiere revisión inmediata.",
      orderType: "reparacion",
      client: {
        name: "Banco Nacional S.A.",
        rut: "97.123.456-7",
        address: "Av. Financiera #100, Santiago",
        phone: "+56 9 1122 3344",
        email: "sistemas@banconacional.cl",
      },
      location: {
        address: "Centro de datos, Rack 5, Santiago",
        coordinates: "-33.4589,-70.6700",
        mapLink: "https://maps.google.com/?q=-33.4589,-70.6700",
      },
      status: "in_progress",
      priority: "urgent",
      scheduledDate: "2023-06-11T16:00:00",
      createdAt: "2023-06-11T08:00:00",
    },
    {
      id: "6",
      orderNumber: 12350,
      title: "Inspección de sistema contra incendios",
      description: "Realizar inspección trimestral del sistema contra incendios",
      orderType: "inspeccion",
      client: {
        name: "Centro Comercial Plaza Mayor",
        rut: "76.555.444-3",
        address: "Av. Comercio #200, Santiago",
        phone: "+56 9 5554 4433",
        email: "operaciones@plazamayor.cl",
      },
      location: {
        address: "Centro Comercial Plaza Mayor, Santiago",
        coordinates: "-33.4689,-70.6800",
        mapLink: "https://maps.google.com/?q=-33.4689,-70.6800",
      },
      status: "pending",
      priority: "medium",
      scheduledDate: "2023-06-20T09:00:00",
      createdAt: "2023-06-10T11:30:00",
    },
  ]

  return (
    <DashboardShell>
      <DashboardHeader heading="Órdenes de Trabajo" text="Gestiona tus órdenes de trabajo asignadas" />
      <OrdersList orders={orders} />
    </DashboardShell>
  )
}
