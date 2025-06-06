export type UserRole = "supervisor" | "technician"

export interface RolePermissions {
  createOrders: boolean
  editOrders: boolean
  assignTechnicians: boolean
  viewAllOrders: boolean
  markOrderComplete: boolean
  uploadEvidence: boolean
  viewMetrics: boolean
  manageUsers: boolean
}

// Permisos por rol
export const rolePermissions: Record<UserRole, RolePermissions> = {
  supervisor: {
    createOrders: true,
    editOrders: true,
    assignTechnicians: true,
    viewAllOrders: true,
    markOrderComplete: true,
    uploadEvidence: true,
    viewMetrics: true,
    manageUsers: true,
  },
  technician: {
    createOrders: false,
    editOrders: false,
    assignTechnicians: false,
    viewAllOrders: false,
    markOrderComplete: true,
    uploadEvidence: true,
    viewMetrics: false,
    manageUsers: false,
  },
}

// Hook para verificar permisos
export function hasPermission(role: UserRole, permission: keyof RolePermissions): boolean {
  return rolePermissions[role][permission]
}

// Función para obtener el rol del usuario actual (desde localStorage)
export function getCurrentUserRole(): UserRole {
  if (typeof window !== "undefined") {
    const savedRole = localStorage.getItem("userRole") as UserRole | null
    return savedRole || "supervisor" // Por defecto, supervisor
  }
  return "supervisor" // Por defecto en el servidor
}

// Función para cambiar el rol del usuario (solo para demostración)
export function setCurrentUserRole(role: UserRole): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("userRole", role)
  }
}
