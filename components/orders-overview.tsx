"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface OrdersOverviewProps {
  className?: string
}

export function OrdersOverview({ className }: OrdersOverviewProps) {
  // Datos de ejemplo para el gráfico
  const data = [
    {
      name: "Lun",
      total: 2,
    },
    {
      name: "Mar",
      total: 3,
    },
    {
      name: "Mié",
      total: 1,
    },
    {
      name: "Jue",
      total: 4,
    },
    {
      name: "Vie",
      total: 2,
    },
    {
      name: "Sáb",
      total: 1,
    },
    {
      name: "Dom",
      total: 0,
    },
  ]

  return (
    <div className={className}>
      <div className="rounded-xl border bg-card p-4">
        <div className="flex flex-col space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium tracking-wide text-muted-foreground">Órdenes por día</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip />
                  <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
