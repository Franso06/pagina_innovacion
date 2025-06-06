export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      technicians: {
        Row: {
          id: string
          full_name: string
          phone: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          phone?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          phone?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      work_orders: {
        Row: {
          id: string
          title: string
          description: string | null
          location: string | null
          status: string
          priority: string
          due_date: string | null
          assigned_to: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          location?: string | null
          status?: string
          priority?: string
          due_date?: string | null
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          location?: string | null
          status?: string
          priority?: string
          due_date?: string | null
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      progress_reports: {
        Row: {
          id: string
          work_order_id: string
          technician_id: string | null
          notes: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          work_order_id: string
          technician_id?: string | null
          notes?: string | null
          status: string
          created_at?: string
        }
        Update: {
          id?: string
          work_order_id?: string
          technician_id?: string | null
          notes?: string | null
          status?: string
          created_at?: string
        }
      }
      evidence: {
        Row: {
          id: string
          work_order_id: string
          report_id: string | null
          technician_id: string | null
          file_path: string
          file_type: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          work_order_id: string
          report_id?: string | null
          technician_id?: string | null
          file_path: string
          file_type: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          work_order_id?: string
          report_id?: string | null
          technician_id?: string | null
          file_path?: string
          file_type?: string
          description?: string | null
          created_at?: string
        }
      }
      checklist_templates: {
        Row: {
          id: string
          title: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          created_at?: string
        }
      }
      checklist_items: {
        Row: {
          id: string
          template_id: string
          description: string
          required: boolean
          order_number: number
          created_at: string
        }
        Insert: {
          id?: string
          template_id: string
          description: string
          required?: boolean
          order_number: number
          created_at?: string
        }
        Update: {
          id?: string
          template_id?: string
          description?: string
          required?: boolean
          order_number?: number
          created_at?: string
        }
      }
      checklist_responses: {
        Row: {
          id: string
          work_order_id: string
          technician_id: string | null
          template_id: string | null
          item_id: string | null
          response: boolean | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          work_order_id: string
          technician_id?: string | null
          template_id?: string | null
          item_id?: string | null
          response?: boolean | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          work_order_id?: string
          technician_id?: string | null
          template_id?: string | null
          item_id?: string | null
          response?: boolean | null
          notes?: string | null
          created_at?: string
        }
      }
    }
  }
}
