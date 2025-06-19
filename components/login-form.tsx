"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { supabase } from "@/lib/supabase"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const formSchema = z.object({
  email: z.string().email({
    message: "Por favor ingresa un correo electrónico válido.",
  }),
  password: z.string().min(1, {
    message: "La contraseña es requerida.",
  }),
})

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      console.log("Intentando iniciar sesión...")

      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })

      console.log("Respuesta de login:", { data, error })

      if (error) {
        console.error("Error de login:", error)
        throw error
      }

      if (data.user) {
        setSuccess("Inicio de sesión exitoso. Redirigiendo...")
        setTimeout(() => {
          router.push("/dashboard")
          router.refresh()
        }, 1000)
      }
    } catch (error) {
      console.error("Error completo:", error)

      let errorMessage = "Ocurrió un error durante el inicio de sesión."

      if (error instanceof Error) {
        // Ahora TypeScript sabe que 'error' tiene una propiedad 'message'
        console.error(error.message);
      } else {
        // Manejar otros tipos de errores
        console.error("An unknown error occurred", error);
      }

      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Información de debug */}
      <div className="text-xs text-muted-foreground">
        <p>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✓ Configurado" : "✗ No configurado"}</p>
        <p>Supabase Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✓ Configurado" : "✗ No configurado"}</p>
      </div>

      {success && (
        <Alert className="bg-green-50 border-green-200">
          <AlertTitle>¡Éxito!</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input placeholder="tu@ejemplo.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
