"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
  status: z.string({
    required_error: "Por favor selecciona un estado",
  }),
  notes: z.string().min(10, {
    message: "Las notas deben tener al menos 10 caracteres",
  }),
})

interface ProgressReportFormProps {
  orderId: string
}

export function ProgressReportForm({ orderId }: ProgressReportFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "",
      notes: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      // Aquí iría la lógica para enviar el reporte a Supabase
      console.log("Enviando reporte:", { orderId, ...values })

      // Simular una petición
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess("Tu reporte de avance ha sido registrado correctamente.")
      form.reset()
      router.refresh()
    } catch (error) {
      console.error(error)
      setError("Hubo un problema al enviar el reporte. Intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reportar Avance</CardTitle>
        <CardDescription>Actualiza el estado de la orden y proporciona detalles sobre el avance</CardDescription>
      </CardHeader>
      <CardContent>
        {success && (
          <Alert className="bg-green-50 border-green-200 mb-4">
            <AlertTitle>¡Éxito!</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado actual</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="in_progress">En progreso</SelectItem>
                      <SelectItem value="paused">Pausado</SelectItem>
                      <SelectItem value="completed">Completado</SelectItem>
                      <SelectItem value="cancelled">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Selecciona el estado actual de la orden de trabajo</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas de avance</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe el avance realizado, problemas encontrados o cualquier información relevante..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Proporciona detalles sobre el trabajo realizado</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar reporte"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
