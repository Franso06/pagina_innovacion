"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type UserRole, getCurrentUserRole } from "@/lib/roles"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

export default function MetricsPageClient() {
  // const [userRole, setUserRole] = useState<UserRole>("supervisor")

  // useEffect(() => {
  //   const role = getCurrentUserRole()
  //   setUserRole(role)
  //   // Eliminamos la redirección para permitir acceso sin restricciones
  // }, [])

  // Datos de ejemplo para las métricas
  const technicianOrdersData = [
    { name: "Carlos M.", orders: 12, completed: 8, pending: 4 },
    { name: "Laura S.", orders: 15, completed: 10, pending: 5 },
    { name: "Miguel A.", orders: 8, completed: 7, pending: 1 },
    { name: "Ana P.", orders: 10, completed: 6, pending: 4 },
  ]

  const executionTimeData = [
    { name: "Instalación", avg: 180 },
    { name: "Mantenimiento", avg: 120 },
    { name: "Inspección", avg: 60 },
    { name: "Reparación", avg: 150 },
  ]

  const orderTypeData = [
    { name: "Instalación", value: 25 },
    { name: "Mantenimiento", value: 45 },
    { name: "Inspección", value: 15 },
    { name: "Reparación", value: 15 },
  ]

  const monthlyOrdersData = [
    { name: "Ene", orders: 12 },
    { name: "Feb", orders: 15 },
    { name: "Mar", orders: 18 },
    { name: "Abr", orders: 14 },
    { name: "May", orders: 20 },
    { name: "Jun", orders: 22 },
  ]

  const clientHistoryData = [
    {
      client: "Empresa Ejemplo S.A.",
      location: "Oficina Central",
      lastService: "2023-06-10",
      totalOrders: 12,
      completedOrders: 10,
      pendingOrders: 2,
    },
    {
      client: "Industrias Nacionales Ltda.",
      location: "Planta Norte",
      lastService: "2023-06-05",
      totalOrders: 8,
      completedOrders: 7,
      pendingOrders: 1,
    },
    {
      client: "Comercial Segura S.A.",
      location: "Sucursal Este",
      lastService: "2023-06-08",
      totalOrders: 5,
      completedOrders: 4,
      pendingOrders: 1,
    },
    {
      client: "Consultores Asociados SpA",
      location: "Oficina Central",
      lastService: "2023-06-01",
      totalOrders: 3,
      completedOrders: 3,
      pendingOrders: 0,
    },
  ]

  // Colores para los gráficos
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <DashboardShell>
      <DashboardHeader heading="Métricas y Estadísticas" text="Visualiza el rendimiento del sistema y los técnicos" />

      <Tabs defaultValue="technicians" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="technicians">Técnicos</TabsTrigger>
          <TabsTrigger value="orders">Órdenes</TabsTrigger>
          <TabsTrigger value="times">Tiempos</TabsTrigger>
          <TabsTrigger value="clients">Clientes</TabsTrigger>
        </TabsList>

        <TabsContent value="technicians" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Órdenes por Técnico</CardTitle>
              <CardDescription>Número de órdenes asignadas, completadas y pendientes por técnico</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={technicianOrdersData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" stackId="a" fill="#4ade80" name="Completadas" />
                    <Bar dataKey="pending" stackId="a" fill="#fb923c" name="Pendientes" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Distribución por Tipo</CardTitle>
                <CardDescription>Distribución de órdenes por tipo de trabajo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={orderTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {orderTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Órdenes Mensuales</CardTitle>
                <CardDescription>Evolución de órdenes por mes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyOrdersData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 8 }} name="Órdenes" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="times" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tiempo Promedio de Ejecución</CardTitle>
              <CardDescription>Tiempo promedio (en minutos) por tipo de orden</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={executionTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="avg" fill="#8884d8" name="Tiempo promedio (min)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial por Cliente</CardTitle>
              <CardDescription>Historial de intervenciones por cliente y ubicación</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-4 text-left">Cliente</th>
                      <th className="py-2 px-4 text-left">Ubicación</th>
                      <th className="py-2 px-4 text-left">Último servicio</th>
                      <th className="py-2 px-4 text-center">Total órdenes</th>
                      <th className="py-2 px-4 text-center">Completadas</th>
                      <th className="py-2 px-4 text-center">Pendientes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientHistoryData.map((client, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="py-2 px-4">{client.client}</td>
                        <td className="py-2 px-4">{client.location}</td>
                        <td className="py-2 px-4">{new Date(client.lastService).toLocaleDateString()}</td>
                        <td className="py-2 px-4 text-center">{client.totalOrders}</td>
                        <td className="py-2 px-4 text-center">{client.completedOrders}</td>
                        <td className="py-2 px-4 text-center">{client.pendingOrders}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
