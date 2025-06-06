import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface RecentActivityProps {
  className?: string
}

export function RecentActivity({ className }: RecentActivityProps) {
  // Datos de ejemplo para la actividad reciente
  const activities = [
    {
      id: "1",
      user: "Carlos M.",
      action: "completó la orden",
      target: "Mantenimiento de red",
      time: "hace 35 minutos",
      initials: "CM",
    },
    {
      id: "2",
      user: "Laura S.",
      action: "inició la orden",
      target: "Reparación de sistema eléctrico",
      time: "hace 2 horas",
      initials: "LS",
    },
    {
      id: "3",
      user: "Miguel A.",
      action: "subió evidencia para",
      target: "Instalación de cámaras",
      time: "hace 3 horas",
      initials: "MA",
    },
    {
      id: "4",
      user: "Ana P.",
      action: "reportó avance en",
      target: "Mantenimiento preventivo",
      time: "hace 5 horas",
      initials: "AP",
    },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
        <CardDescription>Últimas actualizaciones del equipo</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarFallback>{activity.initials}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.user} {activity.action} <span className="font-bold">{activity.target}</span>
                </p>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
