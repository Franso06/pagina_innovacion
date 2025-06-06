"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, UserPlus, Phone, Mail, ClipboardList, CheckCircle, Clock, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { toast } from "@/components/ui/use-toast"

interface Technician {
  id: string
  name: string
  email: string
  phone: string
  specialty: string
  activeOrders: number
  completedOrders: number
  status: "available" | "busy" | "unavailable" | "offline"
}

export function TechniciansList() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")

  // Datos de ejemplo para técnicos
  const technicians: Technician[] = [
    {
      id: "1",
      name: "Carlos Martínez",
      email: "carlos.martinez@ejemplo.com",
      phone: "+56 9 1234 5678",
      specialty: "Climatización",
      activeOrders: 3,
      completedOrders: 45,
      status: "busy",
    },
    {
      id: "2",
      name: "Laura Sánchez",
      email: "laura.sanchez@ejemplo.com",
      phone: "+56 9 8765 4321",
      specialty: "Electricidad",
      activeOrders: 1,
      completedOrders: 32,
      status: "available",
    },
    {
      id: "3",
      name: "Miguel Ángel Pérez",
      email: "miguel.perez@ejemplo.com",
      phone: "+56 9 2345 6789",
      specialty: "Redes",
      activeOrders: 5,
      completedOrders: 28,
      status: "busy",
    },
    {
      id: "4",
      name: "Ana Patricia Gómez",
      email: "ana.gomez@ejemplo.com",
      phone: "+56 9 9876 5432",
      specialty: "Sistemas",
      activeOrders: 0,
      completedOrders: 15,
      status: "available",
    },
    {
      id: "5",
      name: "Roberto Fernández",
      email: "roberto.fernandez@ejemplo.com",
      phone: "+56 9 3456 7890",
      specialty: "Mantenimiento",
      activeOrders: 2,
      completedOrders: 37,
      status: "unavailable",
    },
    {
      id: "6",
      name: "Daniela Torres",
      email: "daniela.torres@ejemplo.com",
      phone: "+56 9 6543 2109",
      specialty: "Instalación",
      activeOrders: 0,
      completedOrders: 22,
      status: "offline",
    },
  ]

  // Filtrar técnicos
  const filteredTechnicians = technicians.filter((tech) => {
    const matchesSearch =
      tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.specialty.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || tech.status === statusFilter
    const matchesSpecialty = specialtyFilter === "all" || tech.specialty === specialtyFilter

    return matchesSearch && matchesStatus && matchesSpecialty
  })

  // Renderizar badge de estado
  const renderStatusBadge = (status: Technician["status"]) => {
    switch (status) {
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
      case "offline":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Desconectado
          </Badge>
        )
      default:
        return null
    }
  }

  // Función para asignar una orden a un técnico
  const assignOrder = (technicianId: string) => {
    router.push(`/ordenes/nueva?assignTo=${technicianId}`)
  }

  // Función para ver el detalle de un técnico
  const viewTechnicianDetail = (technicianId: string) => {
    console.log("Función en desarrollo - Vista detallada de técnicos")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Buscar técnicos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9"
          />
          <Button size="sm" variant="ghost" className="h-9 px-2 lg:px-3">
            <Search className="h-4 w-4" />
            <span className="sr-only">Buscar</span>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="available">Disponible</SelectItem>
              <SelectItem value="busy">Ocupado</SelectItem>
              <SelectItem value="unavailable">No disponible</SelectItem>
              <SelectItem value="offline">Desconectado</SelectItem>
            </SelectContent>
          </Select>
          <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por especialidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las especialidades</SelectItem>
              <SelectItem value="Climatización">Climatización</SelectItem>
              <SelectItem value="Electricidad">Electricidad</SelectItem>
              <SelectItem value="Redes">Redes</SelectItem>
              <SelectItem value="Sistemas">Sistemas</SelectItem>
              <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
              <SelectItem value="Instalación">Instalación</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Nuevo Técnico
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTechnicians.length === 0 ? (
          <div className="col-span-full text-center py-10">
            <p className="text-muted-foreground">No se encontraron técnicos con los filtros seleccionados.</p>
          </div>
        ) : (
          filteredTechnicians.map((technician) => (
            <Card key={technician.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {technician.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{technician.name}</CardTitle>
                      <CardDescription>{technician.specialty}</CardDescription>
                    </div>
                  </div>
                  {renderStatusBadge(technician.status)}
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{technician.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{technician.phone}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{technician.activeOrders} órdenes activas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{technician.completedOrders} completadas</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button variant="outline" size="sm" onClick={() => assignOrder(technician.id)}>
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Asignar orden
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Más opciones</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => viewTechnicianDetail(technician.id)}>
                      Ver detalles
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => assignOrder(technician.id)}>Asignar orden</DropdownMenuItem>
                    <DropdownMenuItem>Editar información</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">Desactivar cuenta</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
