import type { Metadata } from "next"
import OrderPageClient from "./OrderPageClient"

export const metadata: Metadata = {
  title: "Detalle de Orden | TechField",
  description: "Detalle de orden de trabajo y reporte de avances",
}

export default function OrderPage({ params }: { params: { id: string } }) {
  return <OrderPageClient params={params} />
}
