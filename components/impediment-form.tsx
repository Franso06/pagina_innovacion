"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Esquema de validación para el formulario
const formSchema = z.object({
  impedimentType: z.string({
    required_error: "Selecciona un tipo de impedimento",
  }),
  description: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres",
  }),
})

interface ImpedimentFormProps {
  orderId: string
}

export function ImpedimentForm({ orderId }: ImpedimentFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      impedimentType: "",
      description: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      // Aquí iría la lógica para enviar el impedimento a Supabase
      console.log("Enviando impedimento:", { orderId, ...values })

      // Simular una petición
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess("El impedimento ha sido reportado correctamente. Se notificará al supervisor.")
      form.reset()
      router.refresh()
    } catch (error) {
      console.error(error)
      setError("Hubo un problema al reportar el impedimento. Intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader className="bg-amber-50 border-b">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <CardTitle className="text-amber-700">Reportar Impedimento</CardTitle>
        </div>
        <CardDescription>Informa si existe algún problema que impida realizar el trabajo</CardDescription>
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
              name="impedimentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de impedimento</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="access">Problema de acceso</SelectItem>
                      <SelectItem value="materials">Falta de materiales</SelectItem>
                      <SelectItem value="equipment">Equipo defectuoso</SelectItem>
                      <SelectItem value="safety">Condiciones inseguras</SelectItem>
                      <SelectItem value="client">Cliente ausente</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Categoría del impedimento encontrado</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe detalladamente el impedimento encontrado..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Proporciona todos los detalles necesarios para que el supervisor pueda tomar acción
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Reportar impedimento"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
