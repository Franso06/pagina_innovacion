"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Clock } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Technician {
  id: string
  name: string
  specialty?: string
  activeOrders: number
  availability: "available" | "busy" | "unavailable"
}

interface TechnicianAssignmentProps {
  orderId: string
  currentTechnicianId?: string
  scheduledDate: Date
}

export function TechnicianAssignment({ orderId, currentTechnicianId, scheduledDate }: TechnicianAssignmentProps) {
  const router = useRouter()
  const [selectedTechnicianId, setSelectedTechnicianId] = useState(currentTechnicianId || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Datos de ejemplo para técnicos
  const technicians: Technician[] = [
    {
      id: "1",
      name: "Carlos Martínez",
      specialty: "Climatización",
      activeOrders: 3,
      availability: "busy",
    },
    {
      id: "2",
      name: "Laura Sánchez",
      specialty: "Electricidad",
      activeOrders: 1,
      availability: "available",
    },
    {
      id: "3",
      name: "Miguel Ángel Pérez",
      specialty: "Redes",
      activeOrders: 5,
      availability: "busy",
    },
    {
      id: "4",
      name: "Ana Patricia Gómez",
      specialty: "Sistemas",
      activeOrders: 0,
      availability: "available",
    },
  ]

  const handleAssign = async () => {
    setError(null)
    setSuccess(null)

    if (!selectedTechnicianId) {
      setError("Debes seleccionar un técnico para asignar la orden.")
      return
    }

    setIsSubmitting(true)

    try {
      // Aquí iría la lógica para actualizar la asignación en Supabase
      console.log("Asignando orden:", { orderId, technicianId: selectedTechnicianId })

      // Simular una petición
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess("La orden ha sido asignada correctamente.")
      router.refresh()
    } catch (error) {
      console.error(error)
      setError("Hubo un problema al asignar el técnico. Intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Renderizar badge de disponibilidad
  const renderAvailabilityBadge = (availability: Technician["availability"]) => {
    switch (availability) {
      case "available":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Disponible
          </Badge>
        )
      case "busy":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Ocupado
          </Badge>
        )
      case "unavailable":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            No disponible
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Asignar Técnico</CardTitle>
        <CardDescription>Selecciona un técnico para asignar a esta orden</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {success && (
          <Alert className="bg-green-50 border-green-200 mb-4">
            <AlertTitle>¡Éxito!</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Fecha programada: {format(scheduledDate, "PPP", { locale: es })}</span>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Técnico</label>
          <Select value={selectedTechnicianId} onValueChange={setSelectedTechnicianId}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un técnico" />
            </SelectTrigger>
            <SelectContent>
              {technicians.map((tech) => (
                <SelectItem key={tech.id} value={tech.id}>
                  {tech.name} - {tech.specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedTechnicianId && (
          <div className="pt-4">
            <h3 className="text-sm font-medium mb-2">Información del técnico</h3>
            {technicians
              .filter((tech) => tech.id === selectedTechnicianId)
              .map((tech) => (
                <div key={tech.id} className="flex items-start gap-4 p-3 border rounded-md">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {tech.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">{tech.name}</h4>
                      {renderAvailabilityBadge(tech.availability)}
                    </div>
                    <p className="text-sm text-muted-foreground">{tech.specialty}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{tech.activeOrders} órdenes activas</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setSelectedTechnicianId("")}>
          Limpiar
        </Button>
        <Button onClick={handleAssign} disabled={isSubmitting || !selectedTechnicianId}>
          {isSubmitting ? "Asignando..." : "Asignar técnico"}
        </Button>
      </CardFooter>
    </Card>
  )
}
