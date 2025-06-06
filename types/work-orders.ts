export interface Client {
  name: string
  rut?: string
  address?: string
  phone?: string
  email?: string
}

export interface Location {
  address: string
  coordinates?: string // "latitud,longitud"
  mapLink?: string
}

export interface WorkOrder {
  id: string
  orderNumber: number
  title: string
  description?: string

  // Tipo de orden
  orderType: "instalacion" | "mantenimiento" | "inspeccion" | "reparacion" | "otro"

  // Datos del cliente
  client: Client

  // Ubicación
  location: Location

  // Fechas y tiempos
  createdAt: string
  scheduledDate: string
  startTime?: string
  endTime?: string

  // Estado y prioridad
  status: "pending" | "in_progress" | "completed" | "observed" | "cancelled"
  priority: "low" | "medium" | "high" | "urgent"

  // Asignación y supervisión
  assignedTo?: string
  supervisorNotes?: string

  // Actualización
  updatedAt: string
}

export interface AttachedDocument {
  id: string
  workOrderId: string
  filePath: string
  fileType: string
  fileName: string
  description?: string
  uploadedBy?: string
  createdAt: string
}

export interface ExecutionEvidence {
  id: string
  workOrderId: string
  evidenceType: "photo" | "reading" | "signature" | "document" | "other"
  filePath: string
  description?: string
  technicianId?: string
  createdAt: string
}

export interface ValidationChecklist {
  id: string
  workOrderId: string
  checklistName: string
  completed: boolean
  technicianId?: string
  createdAt: string
  completedAt?: string
  items: ValidationChecklistItem[]
}

export interface ValidationChecklistItem {
  id: string
  checklistId: string
  itemDescription: string
  completed: boolean
  required: boolean
  notes?: string
  createdAt: string
}
