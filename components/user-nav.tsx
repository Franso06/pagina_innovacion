"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { UserIcon, Settings, Shield } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { UserRole } from "@/lib/roles"
import { RoleSwitcher } from "@/components/role-switcher"

interface UserNavProps {
  user: {
    email?: string
    name?: string
  }
}

export function UserNav({ user }: UserNavProps) {
  const router = useRouter()
  const [userRole, setUserRole] = useState<UserRole>("supervisor")

  useEffect(() => {
    // Usar localStorage para mantener el rol seleccionado
    const savedRole = localStorage.getItem("userRole") as UserRole | null
    setUserRole(savedRole || "supervisor")
  }, [])

  // Obtener iniciales del usuario para el avatar
  const getInitials = () => {
    return user.name
      ? `${user.name.split(" ")[0][0]}${user.name.split(" ")[1]?.[0] || ""}`
      : user.email?.charAt(0).toUpperCase() || "U"
  }

  return (
    <div className="flex items-center gap-4">
      <RoleSwitcher />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{getInitials()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name || user.email || "Usuario Demo"}</p>
              <p className="text-xs leading-none text-muted-foreground flex items-center">
                <Shield className="h-3 w-3 mr-1" />
                {userRole === "supervisor" ? "Supervisor" : "Técnico"}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/perfil")}>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/configuracion")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Configuración</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
