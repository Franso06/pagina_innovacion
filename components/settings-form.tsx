"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Moon, Sun, Laptop } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingresa un correo electrónico válido.",
  }),
  phone: z
    .string()
    .min(9, {
      message: "El número de teléfono debe tener al menos 9 caracteres.",
    })
    .optional(),
  bio: z
    .string()
    .max(500, {
      message: "La biografía no puede exceder los 500 caracteres.",
    })
    .optional(),
})

const notificationsFormSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  orderAssignments: z.boolean(),
  orderUpdates: z.boolean(),
  systemUpdates: z.boolean(),
})

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"], {
    required_error: "Por favor selecciona un tema.",
  }),
  fontSize: z.enum(["small", "medium", "large"], {
    required_error: "Por favor selecciona un tamaño de fuente.",
  }),
  language: z.string({
    required_error: "Por favor selecciona un idioma.",
  }),
})

export function SettingsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Formulario de perfil
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Usuario Demo",
      email: "usuario@demo.com",
      phone: "+56 9 1234 5678",
      bio: "Técnico especializado en mantenimiento de equipos de climatización y sistemas eléctricos.",
    },
  })

  // Formulario de notificaciones
  const notificationsForm = useForm<z.infer<typeof notificationsFormSchema>>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: true,
      orderAssignments: true,
      orderUpdates: true,
      systemUpdates: false,
    },
  })

  // Formulario de apariencia
  const appearanceForm = useForm<z.infer<typeof appearanceFormSchema>>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      theme: "system",
      fontSize: "medium",
      language: "es",
    },
  })

  // Manejar envío del formulario de perfil
  async function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      // Aquí iría la lógica para actualizar el perfil
      console.log("Actualizando perfil:", values)

      // Simular una petición
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess("Tu información de perfil ha sido actualizada correctamente.")
    } catch (error) {
      console.error(error)
      setError("Hubo un problema al actualizar tu perfil. Intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Manejar envío del formulario de notificaciones
  async function onNotificationsSubmit(values: z.infer<typeof notificationsFormSchema>) {
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      // Aquí iría la lógica para actualizar las preferencias de notificaciones
      console.log("Actualizando notificaciones:", values)

      // Simular una petición
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess("Tus preferencias de notificaciones han sido actualizadas correctamente.")
    } catch (error) {
      console.error(error)
      setError("Hubo un problema al actualizar tus preferencias. Intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Manejar envío del formulario de apariencia
  async function onAppearanceSubmit(values: z.infer<typeof appearanceFormSchema>) {
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      // Aquí iría la lógica para actualizar las preferencias de apariencia
      console.log("Actualizando apariencia:", values)

      // Simular una petición
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess("Tus preferencias de apariencia han sido actualizadas correctamente.")
    } catch (error) {
      console.error(error)
      setError("Hubo un problema al actualizar tus preferencias. Intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="profile">Perfil</TabsTrigger>
        <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
        <TabsTrigger value="appearance">Apariencia</TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>Actualiza tu información personal y de contacto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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

            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Avatar" />
                <AvatarFallback>UD</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Foto de perfil</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Cambiar foto
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600">
                    Eliminar
                  </Button>
                </div>
              </div>
            </div>

            <Form {...profileForm}>
              <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                <FormField
                  control={profileForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu nombre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
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
                  control={profileForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input placeholder="+56 9 1234 5678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Biografía</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Cuéntanos sobre ti y tu experiencia..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Máximo 500 caracteres</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Guardando..." : "Guardar cambios"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Notificaciones</CardTitle>
            <CardDescription>Configura cómo y cuándo quieres recibir notificaciones</CardDescription>
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

            <Form {...notificationsForm}>
              <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Canales de notificación</h3>
                  <FormField
                    control={notificationsForm.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Notificaciones por correo</FormLabel>
                          <FormDescription>Recibe notificaciones en tu correo electrónico</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={notificationsForm.control}
                    name="pushNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Notificaciones push</FormLabel>
                          <FormDescription>Recibe notificaciones en tu dispositivo</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Tipos de notificación</h3>
                  <FormField
                    control={notificationsForm.control}
                    name="orderAssignments"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Asignación de órdenes</FormLabel>
                          <FormDescription>Cuando se te asigne una nueva orden de trabajo</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={notificationsForm.control}
                    name="orderUpdates"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Actualizaciones de órdenes</FormLabel>
                          <FormDescription>Cambios en el estado de tus órdenes</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={notificationsForm.control}
                    name="systemUpdates"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Actualizaciones del sistema</FormLabel>
                          <FormDescription>Noticias y actualizaciones de la plataforma</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Guardando..." : "Guardar preferencias"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="appearance" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Apariencia</CardTitle>
            <CardDescription>Personaliza la apariencia de la aplicación</CardDescription>
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

            <Form {...appearanceForm}>
              <form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)} className="space-y-6">
                <FormField
                  control={appearanceForm.control}
                  name="theme"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Tema</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-3 gap-4"
                        >
                          <div className="flex items-center space-x-2 rounded-md border p-4">
                            <RadioGroupItem value="light" id="light" />
                            <div className="flex items-center gap-2">
                              <Sun className="h-4 w-4" />
                              <label htmlFor="light" className="text-sm font-medium">
                                Claro
                              </label>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 rounded-md border p-4">
                            <RadioGroupItem value="dark" id="dark" />
                            <div className="flex items-center gap-2">
                              <Moon className="h-4 w-4" />
                              <label htmlFor="dark" className="text-sm font-medium">
                                Oscuro
                              </label>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 rounded-md border p-4">
                            <RadioGroupItem value="system" id="system" />
                            <div className="flex items-center gap-2">
                              <Laptop className="h-4 w-4" />
                              <label htmlFor="system" className="text-sm font-medium">
                                Sistema
                              </label>
                            </div>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={appearanceForm.control}
                  name="fontSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tamaño de fuente</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un tamaño" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="small">Pequeño</SelectItem>
                          <SelectItem value="medium">Mediano</SelectItem>
                          <SelectItem value="large">Grande</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={appearanceForm.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idioma</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un idioma" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="pt">Português</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Guardando..." : "Guardar preferencias"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
