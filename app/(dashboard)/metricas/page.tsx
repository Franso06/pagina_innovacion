import type { Metadata } from "next"
import MetricsPageClient from "./MetricsPageClient"

export const metadata: Metadata = {
  title: "Métricas | TechField",
  description: "Estadísticas y métricas del sistema",
}

export default function MetricsPage() {
  return <MetricsPageClient />
}
