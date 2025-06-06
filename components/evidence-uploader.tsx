"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Camera, Upload, X, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EvidenceUploaderProps {
  orderId: string
}

export function EvidenceUploader({ orderId }: EvidenceUploaderProps) {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [description, setDescription] = useState("")
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setFiles([...files, ...newFiles])

      // Crear URLs para las previsualizaciones
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file))
      setPreviews([...previews, ...newPreviews])
    }
  }

  const removeFile = (index: number) => {
    // Liberar URL de objeto
    URL.revokeObjectURL(previews[index])

    // Eliminar archivo y previsualización
    setFiles(files.filter((_, i) => i !== index))
    setPreviews(previews.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (files.length === 0) {
      setError("Por favor selecciona al menos un archivo para subir.")
      return
    }

    setIsUploading(true)

    try {
      // Aquí iría la lógica para subir los archivos a Supabase Storage
      console.log("Subiendo archivos:", { orderId, files, description })

      // Simular una petición
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSuccess(`Se han subido ${files.length} archivo(s) correctamente.`)

      // Limpiar formulario
      setFiles([])
      setPreviews([])
      setDescription("")
      router.refresh()
    } catch (error) {
      console.error(error)
      setError("Hubo un problema al subir los archivos. Intenta de nuevo.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subir Evidencia</CardTitle>
        <CardDescription>Sube fotos, documentos u otros archivos como evidencia de tu trabajo</CardDescription>
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

        <Tabs defaultValue="upload">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Subir Archivo</TabsTrigger>
            <TabsTrigger value="camera">Tomar Foto</TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="file-upload">Archivo</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="file-upload"
                  type="file"
                  accept="image/*,application/pdf"
                  multiple
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Seleccionar archivos
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="camera" className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="camera-capture">Cámara</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="camera-capture"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  ref={cameraInputRef}
                  onChange={handleFileChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => cameraInputRef.current?.click()}
                  className="w-full"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Tomar foto
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {previews.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Archivos seleccionados:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative group">
                  <div className="relative aspect-square rounded-md overflow-hidden border">
                    {files[index].type.startsWith("image/") ? (
                      <Image
                        src={preview || "/placeholder.svg"}
                        alt={`Vista previa ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-muted">
                        <FileText className="h-10 w-10 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  <p className="text-xs truncate mt-1">{files[index].name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Describe brevemente la evidencia que estás subiendo..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={isUploading || files.length === 0}>
            {isUploading ? "Subiendo..." : "Subir evidencia"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
