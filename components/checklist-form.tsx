"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ChecklistItem {
  id: string
  description: string
  required: boolean
  orderNumber: number
}

interface ChecklistFormProps {
  orderId: string
  checklist: {
    id: string
    title: string
    items: ChecklistItem[]
  }
}

export function ChecklistForm({ orderId, checklist }: ChecklistFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Crear un esquema dinámico basado en los elementos del checklist
  const formSchema = z.object({
    items: z.array(
      z.object({
        itemId: z.string(),
        checked: z.boolean(),
        notes: z.string().optional(),
      }),
    ),
  })

  // Valores por defecto
  const defaultValues = {
    items: checklist.items.map((item) => ({
      itemId: item.id,
      checked: false,
      notes: "",
    })),
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null)
    setSuccess(null)

    // Verificar que todos los elementos requeridos estén marcados
    const requiredItems = checklist.items.filter((item) => item.required)
    const requiredItemIds = new Set(requiredItems.map((item) => item.id))

    const allRequiredChecked = values.items.every((item) => !requiredItemIds.has(item.itemId) || item.checked)

    if (!allRequiredChecked) {
      setError("Debes completar todos los elementos requeridos del checklist.")
      return
    }

    setIsSubmitting(true)

    try {
      // Aquí iría la lógica para enviar las respuestas a Supabase
      console.log("Enviando checklist:", { orderId, ...values })

      // Simular una petición
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess("Tu checklist ha sido registrado correctamente.")
      router.refresh()
    } catch (error) {
      console.error(error)
      setError("Hubo un problema al enviar el checklist. Intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{checklist.title}</CardTitle>
        <CardDescription>Completa todos los elementos requeridos del checklist</CardDescription>
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
            {checklist.items.map((item, index) => (
              <div key={item.id} className="space-y-4 pb-4 border-b last:border-0">
                <FormField
                  control={form.control}
                  name={`items.${index}.checked`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium">
                          {item.description}
                          {item.required && <span className="text-red-500 ml-1">*</span>}
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`items.${index}.notes`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-muted-foreground">Notas adicionales</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Observaciones o comentarios sobre este punto..."
                          className="min-h-[60px]"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            ))}
            <div className="flex items-center">
              <p className="text-sm text-muted-foreground mr-auto">
                <span className="text-red-500">*</span> Elementos requeridos
              </p>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar checklist"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
