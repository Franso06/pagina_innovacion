"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

// Esquema de validación para el formulario
const formSchema = z.object({
  notes: z.string().min(10, {
    message: "Las notas deben tener al menos 10 caracteres",
  }),
  clientSignature: z.boolean().refine((val) => val === true, {
    message: "Debes confirmar que el cliente ha firmado la orden",
  }),
  allTasksCompleted: z.boolean().refine((val) => val === true, {
    message: "Debes confirmar que todas las tareas han sido completadas",
  }),
})

interface CompleteOrderFormProps {
  orderId: string
}

export function CompleteOrderForm({ orderId }: CompleteOrderFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: "",
      clientSignature: false,
      allTasksCompleted: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      // Aquí iría la lógica para marcar la orden como completada en Supabase
      console.log("Completando orden:", { orderId, ...values })

      // Simular una petición
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSuccess("La orden ha sido marcada como completada correctamente.")
      setTimeout(() => {
        router.push("/ordenes")
      }, 2000)
    } catch (error) {
      console.error(error)
      setError("Hubo un problema al completar la orden. Intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader className="bg-green-50 border-b">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <CardTitle className="text-green-700">Completar Orden</CardTitle>
        </div>
        <CardDescription>Marca esta orden como finalizada y proporciona los detalles de cierre</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
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
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas de cierre</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe el trabajo realizado, materiales utilizados y cualquier observación relevante..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Proporciona todos los detalles sobre el trabajo realizado</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="allTasksCompleted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Confirmo que todas las tareas han sido completadas</FormLabel>
                    <FormDescription>Todos los puntos del checklist han sido verificados y completados</FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clientSignature"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Confirmo que el cliente ha firmado la orden</FormLabel>
                    <FormDescription>El cliente ha verificado y aprobado el trabajo realizado</FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="button" variant="outline" className="mr-2" onClick={() => router.back()}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Completando..." : "Marcar como completada"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
