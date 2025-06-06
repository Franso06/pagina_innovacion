import { redirect } from "next/navigation"

export default function Home() {
  // Redirigir directamente al dashboard sin autenticación
  redirect("/dashboard")

  return null
}
