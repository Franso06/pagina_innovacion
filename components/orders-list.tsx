"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowUpDown, Search, AlertTriangle, Clock, CheckCircle, XCircle, Filter, User, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface Order {
  id: string
  orderNumber: number
  title: string
  description: string
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
  status: string
  priority: string
  scheduledDate: string
  createdAt: string
}

interface OrdersListProps {
  orders: Order[]
}

export function OrdersList({ orders: initialOrders }: OrdersListProps) {
  const router = useRouter()
  const [orders, setOrders] = useState(initialOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Filtrar órdenes
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.client.rut && order.client.rut.toLowerCase().includes(searchTerm.toLowerCase())) ||
      String(order.orderNumber).includes(searchTerm)

    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesPriority = priorityFilter === "all" || order.priority === priorityFilter
    const matchesType = typeFilter === "all" || order.orderType === typeFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesType
  })

  // Formatear fecha
  const formatDate = (dateString: string) => {
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
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Buscar órdenes..."
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
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filtrar órdenes</SheetTitle>
              </SheetHeader>
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Estado</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="pending">Pendiente</SelectItem>
                      <SelectItem value="in_progress">En progreso</SelectItem>
                      <SelectItem value="completed">Completada</SelectItem>
                      <SelectItem value="observed">Observada</SelectItem>
                      <SelectItem value="cancelled">Cancelada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Prioridad</label>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="low">Baja</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="urgent">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo de orden</label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="instalacion">Instalación</SelectItem>
                      <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                      <SelectItem value="inspeccion">Inspección</SelectItem>
                      <SelectItem value="reparacion">Reparación</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  className="w-full mt-4"
                  onClick={() => {
                    setStatusFilter("all")
                    setPriorityFilter("all")
                    setTypeFilter("all")
                    setIsFilterOpen(false)
                  }}
                  variant="outline"
                >
                  Limpiar filtros
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Ordenar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  const sorted = [...orders].sort(
                    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
                  )
                  setOrders(sorted)
                }}
              >
                Más recientes primero
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  const sorted = [...orders].sort(
                    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
                  )
                  setOrders(sorted)
                }}
              >
                Más antiguos primero
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  const sorted = [...orders].sort(
                    (a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime(),
                  )
                  setOrders(sorted)
                }}
              >
                Fecha programada (ascendente)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 }
                  const sorted = [...orders].sort(
                    (a, b) =>
                      priorityOrder[a.priority as keyof typeof priorityOrder] -
                      priorityOrder[b.priority as keyof typeof priorityOrder],
                  )
                  setOrders(sorted)
                }}
              >
                Prioridad (mayor a menor)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">OT #</TableHead>
              <TableHead className="w-[250px]">
                <Button variant="ghost" className="p-0 font-medium">
                  Título
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead className="hidden md:table-cell">Fecha programada</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No se encontraron órdenes.
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id} className="cursor-pointer" onClick={() => router.push(`/ordenes/${order.id}`)}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>
                    <Link href={`/ordenes/${order.id}`} className="hover:underline">
                      {order.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span className="truncate max-w-[120px]">{order.client.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{renderOrderTypeBadge(order.orderType)}</TableCell>
                  <TableCell>{renderStatusBadge(order.status)}</TableCell>
                  <TableCell>{renderPriorityBadge(order.priority)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span>{formatDate(order.scheduledDate)}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
