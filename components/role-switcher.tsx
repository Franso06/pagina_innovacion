"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Shield } from "lucide-react"

export type UserRole = "supervisor" | "technician"

export function RoleSwitcher() {
  const [currentRole, setCurrentRole] = useState<UserRole>("supervisor")

  useEffect(() => {
    // Cargar el rol desde localStorage al iniciar
    const savedRole = localStorage.getItem("userRole") as UserRole | null
    if (savedRole) {
      setCurrentRole(savedRole)
    }
  }, [])

  const handleRoleChange = (role: UserRole) => {
    // Guardar el rol en localStorage
    localStorage.setItem("userRole", role)
    setCurrentRole(role)
    // Recargar la página para aplicar los cambios
    window.location.reload()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9">
          <Shield className="h-4 w-4 mr-2" />
          {currentRole === "supervisor" ? "Supervisor" : "Técnico"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Cambiar rol</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleRoleChange("supervisor")}>Supervisor</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleRoleChange("technician")}>Técnico</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
