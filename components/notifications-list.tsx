"use client"

import { useState } from "react"
import { Bell, AlertTriangle, CheckCircle, Info, Calendar, MessageSquare, Trash2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
// import { toast } from "@/components/ui/use-toast"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "error"
  read: boolean
  date: Date
  category: "system" | "order" | "message"
}

export function NotificationsList() {
  // Estado para las notificaciones
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Nueva orden asignada",
      message: "Se te ha asignado la orden #12345 - Mantenimiento preventivo",
      type: "info",
      read: false,
      date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
      category: "order",
    },
    {
      id: "2",
      title: "Orden marcada como urgente",
      message: "La orden #12348 ha sido marcada como urgente por el supervisor",
      type: "warning",
      read: false,
      date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
      category: "order",
    },
    {
      id: "3",
      title: "Orden completada",
      message: "Has completado exitosamente la orden #12340",
      type: "success",
      read: true,
      date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 día atrás
      category: "order",
    },
    {
      id: "4",
      title: "Actualización del sistema",
      message: "El sistema se actualizará esta noche a las 22:00 hrs",
      type: "info",
      read: true,
      date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 días atrás
      category: "system",
    },
    {
      id: "5",
      title: "Nuevo mensaje",
      message: "Has recibido un nuevo mensaje de Laura Sánchez",
      type: "info",
      read: false,
      date: new Date(Date.now() - 1000 * 60 * 45), // 45 minutos atrás
      category: "message",
    },
    {
      id: "6",
      title: "Recordatorio de mantenimiento",
      message: "Mañana tienes programado el mantenimiento para el cliente Empresa Ejemplo S.A.",
      type: "info",
      read: false,
      date: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 horas atrás
      category: "order",
    },
  ])

  // Función para marcar como leída
  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Función para marcar todas como leídas
  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
    // toast({
    //   title: "Notificaciones actualizadas",
    //   description: "Todas las notificaciones han sido marcadas como leídas",
    // })
    // Notificaciones marcadas como leídas
  }

  // Función para eliminar una notificación
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
    // toast({
    //   title: "Notificación eliminada",
    //   description: "La notificación ha sido eliminada correctamente",
    // })
    // Notificación eliminada
  }

  // Función para eliminar todas las notificaciones
  const deleteAllNotifications = () => {
    setNotifications([])
    // toast({
    //   title: "Notificaciones eliminadas",
    //   description: "Todas las notificaciones han sido eliminadas",
    // })
    // Todas las notificaciones eliminadas
  }

  // // Filtrar notificaciones por categoría
  // const allNotifications = notifications
  const unreadNotifications = notifications.filter((notification) => !notification.read)
  const orderNotifications = notifications.filter((notification) => notification.category === "order")
  const systemNotifications = notifications.filter((notification) => notification.category === "system")
  const messageNotifications = notifications.filter((notification) => notification.category === "message")

  // Renderizar icono según el tipo
  const renderIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />
    }
  }

  // Renderizar icono según la categoría
  const renderCategoryIcon = (category: Notification["category"]) => {
    switch (category) {
      case "order":
        return <Calendar className="h-4 w-4 text-muted-foreground" />
      case "system":
        return <Info className="h-4 w-4 text-muted-foreground" />
      case "message":
        return <MessageSquare className="h-4 w-4 text-muted-foreground" />
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />
    }
  }

  // Renderizar badge según el tipo
  const renderBadge = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Información
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Advertencia
          </Badge>
        )
      case "success":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Éxito
          </Badge>
        )
      case "error":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Error
          </Badge>
        )
      default:
        return null
    }
  }

  // Función para formatear la fecha
  const formatDate = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true, locale: es })
  }

  // Renderizar una notificación
  const renderNotification = (notification: Notification) => (
    <Card
      key={notification.id}
      className={`mb-4 ${notification.read ? "bg-background" : "bg-blue-50 dark:bg-blue-900/10"}`}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            {renderIcon(notification.type)}
            <div>
              <CardTitle className="text-base">{notification.title}</CardTitle>
              <CardDescription className="flex items-center gap-1 text-xs">
                {renderCategoryIcon(notification.category)}
                <span>{formatDate(notification.date)}</span>
              </CardDescription>
            </div>
          </div>
          {renderBadge(notification.type)}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm">{notification.message}</p>
      </CardContent>
      <CardFooter className="pt-0 flex justify-end gap-2">
        {!notification.read && (
          <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
            Marcar como leída
          </Button>
        )}
        <Button variant="ghost" size="sm" className="text-red-600" onClick={() => deleteNotification(notification.id)}>
          <Trash2 className="h-4 w-4 mr-1" />
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {unreadNotifications.length} sin leer
          </Badge>
          <Badge variant="outline" className="text-xs">
            {notifications.length} total
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadNotifications.length === 0}>
            Marcar todas como leídas
          </Button>
          <Button variant="outline" size="sm" onClick={deleteAllNotifications} disabled={notifications.length === 0}>
            Eliminar todas
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">
            Todas
            {notifications.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {notifications.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread">
            Sin leer
            {unreadNotifications.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadNotifications.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="orders">
            Órdenes
            {orderNotifications.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {orderNotifications.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="system">
            Sistema
            {systemNotifications.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {systemNotifications.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="messages">
            Mensajes
            {messageNotifications.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {messageNotifications.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          {notifications.length === 0 ? (
            <div className="text-center py-10">
              <Bell className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No hay notificaciones</h3>
              <p className="text-muted-foreground">No tienes notificaciones en este momento.</p>
            </div>
          ) : (
            notifications.map(renderNotification)
          )}
        </TabsContent>

        <TabsContent value="unread" className="mt-4">
          {unreadNotifications.length === 0 ? (
            <div className="text-center py-10">
              <CheckCircle className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No hay notificaciones sin leer</h3>
              <p className="text-muted-foreground">Has leído todas tus notificaciones.</p>
            </div>
          ) : (
            unreadNotifications.map(renderNotification)
          )}
        </TabsContent>

        <TabsContent value="orders" className="mt-4">
          {orderNotifications.length === 0 ? (
            <div className="text-center py-10">
              <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No hay notificaciones de órdenes</h3>
              <p className="text-muted-foreground">No tienes notificaciones relacionadas con órdenes.</p>
            </div>
          ) : (
            orderNotifications.map(renderNotification)
          )}
        </TabsContent>

        <TabsContent value="system" className="mt-4">
          {systemNotifications.length === 0 ? (
            <div className="text-center py-10">
              <Info className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No hay notificaciones del sistema</h3>
              <p className="text-muted-foreground">No tienes notificaciones del sistema en este momento.</p>
            </div>
          ) : (
            systemNotifications.map(renderNotification)
          )}
        </TabsContent>

        <TabsContent value="messages" className="mt-4">
          {messageNotifications.length === 0 ? (
            <div className="text-center py-10">
              <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No hay mensajes</h3>
              <p className="text-muted-foreground">No tienes mensajes nuevos en este momento.</p>
            </div>
          ) : (
            messageNotifications.map(renderNotification)
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
