import {
  MapPin,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  User,
  Briefcase,
  Mail,
  Phone,
  FileText,
  MapIcon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface OrderDetailsProps {
  order: {
    id: string
    orderNumber: number
    title: string
    description?: string
    orderType: string
    client: {
      name: string
      rut?: string
      address?: string
      phone?: string
      email?: string
    }
    location: {
      address: string
      coordinates?: string
      mapLink?: string
    }
    createdAt: string
    scheduledDate: string
    startTime?: string
    endTime?: string
    status: string
    priority: string
    assignedTo?: string
    supervisorNotes?: string
    updatedAt: string
    attachedDocuments?: {
      id: string
      fileName: string
      fileType: string
      filePath: string
      description?: string
      createdAt: string
    }[]
  }
}

export function OrderDetails({ order }: OrderDetailsProps) {
  // Formatear fecha
  const formatDate = (dateString: string) => {
    if (!dateString) return "No definido"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Renderizar badge de estado
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="h-3 w-3" />
            Pendiente
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200">
            <Clock className="h-3 w-3" />
            En progreso
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3" />
            Completada
          </Badge>
        )
      case "observed":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-orange-50 text-orange-700 border-orange-200">
            <AlertTriangle className="h-3 w-3" />
            Observada
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-red-50 text-red-700 border-red-200">
            <XCircle className="h-3 w-3" />
            Cancelada
          </Badge>
        )
      default:
        return null
    }
  }

  // Renderizar badge de prioridad
  const renderPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return (
          <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
            Baja
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Media
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            Alta
          </Badge>
        )
      case "urgent":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-red-50 text-red-700 border-red-200">
            <AlertTriangle className="h-3 w-3" />
            Urgente
          </Badge>
        )
      default:
        return null
    }
  }

  // Renderizar badge de tipo de orden
  const renderOrderTypeBadge = (type: string) => {
    switch (type) {
      case "instalacion":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Instalación
          </Badge>
        )
      case "mantenimiento":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Mantenimiento
          </Badge>
        )
      case "inspeccion":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Inspección
          </Badge>
        )
      case "reparacion":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            Reparación
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Otro
          </Badge>
        )
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Información General</CardTitle>
          <div className="text-sm font-medium text-muted-foreground">OT #{order.orderNumber}</div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
            <Briefcase className="h-5 w-5 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Tipo de Orden</p>
              <p className="text-sm text-muted-foreground">{renderOrderTypeBadge(order.orderType)}</p>
            </div>
          </div>
          <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Estado</p>
              <p className="text-sm text-muted-foreground">{renderStatusBadge(order.status)}</p>
            </div>
          </div>
          <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Prioridad</p>
              <p className="text-sm text-muted-foreground">{renderPriorityBadge(order.priority)}</p>
            </div>
          </div>
          <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Fecha programada</p>
              <p className="text-sm text-muted-foreground">{formatDate(order.scheduledDate)}</p>
            </div>
          </div>
          <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Fecha de creación</p>
              <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
            </div>
          </div>
          {order.startTime && (
            <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Hora de inicio</p>
                <p className="text-sm text-muted-foreground">{formatDate(order.startTime)}</p>
              </div>
            </div>
          )}
          {order.endTime && (
            <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Hora de término</p>
                <p className="text-sm text-muted-foreground">{formatDate(order.endTime)}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Datos del Cliente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
            <User className="h-5 w-5 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Nombre</p>
              <p className="text-sm text-muted-foreground">{order.client.name}</p>
            </div>
          </div>
          {order.client.rut && (
            <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">RUT</p>
                <p className="text-sm text-muted-foreground">{order.client.rut}</p>
              </div>
            </div>
          )}
          {order.client.phone && (
            <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Teléfono</p>
                <p className="text-sm text-muted-foreground">{order.client.phone}</p>
              </div>
            </div>
          )}
          {order.client.email && (
            <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Email</p>
                <p className="text-sm text-muted-foreground">{order.client.email}</p>
              </div>
            </div>
          )}
          {order.client.address && (
            <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Dirección</p>
                <p className="text-sm text-muted-foreground">{order.client.address}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ubicación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Dirección</p>
              <p className="text-sm text-muted-foreground">{order.location.address}</p>
            </div>
          </div>
          {order.location.coordinates && (
            <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <MapIcon className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Coordenadas</p>
                <p className="text-sm text-muted-foreground">{order.location.coordinates}</p>
              </div>
            </div>
          )}
          {order.location.mapLink && (
            <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <MapIcon className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Enlace de mapa</p>
                <Link
                  href={order.location.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Ver en Google Maps
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Descripción</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground whitespace-pre-line">{order.description || "Sin descripción"}</p>

          {order.supervisorNotes && (
            <>
              <Separator className="my-4" />
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Notas del supervisor:</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{order.supervisorNotes}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {order.attachedDocuments && order.attachedDocuments.length > 0 && (
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Documentos Adjuntos</CardTitle>
            <CardDescription>Documentos relacionados con esta orden de trabajo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {order.attachedDocuments.map((doc) => (
                <div key={doc.id} className="border rounded-md p-3 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium truncate">{doc.fileName}</span>
                  </div>
                  {doc.description && <p className="text-xs text-muted-foreground mb-2">{doc.description}</p>}
                  <div className="mt-auto pt-2">
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href={doc.filePath} target="_blank">
                        Ver documento
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
