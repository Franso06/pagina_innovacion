-- Actualización de la tabla de órdenes de trabajo con todos los campos recomendados
CREATE TABLE IF NOT EXISTS work_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number SERIAL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  
  -- Tipo de orden
  order_type TEXT NOT NULL CHECK (order_type IN ('instalacion', 'mantenimiento', 'inspeccion', 'reparacion', 'otro')),
  
  -- Datos del cliente
  client_name TEXT NOT NULL,
  client_rut TEXT,
  client_address TEXT,
  client_phone TEXT,
  client_email TEXT,
  
  -- Ubicación
  location TEXT,
  location_coordinates TEXT, -- Formato: "latitud,longitud"
  location_map_link TEXT,
  
  -- Fechas y tiempos
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE,
  
  -- Estado y prioridad
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'observed', 'cancelled')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  
  -- Asignación y supervisión
  assigned_to UUID REFERENCES technicians(id),
  supervisor_notes TEXT,
  
  -- Actualización
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla para documentos adjuntos
CREATE TABLE IF NOT EXISTS attached_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_order_id UUID REFERENCES work_orders(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  description TEXT,
  uploaded_by UUID REFERENCES technicians(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla para evidencia de ejecución
CREATE TABLE IF NOT EXISTS execution_evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_order_id UUID REFERENCES work_orders(id) ON DELETE CASCADE,
  evidence_type TEXT NOT NULL CHECK (evidence_type IN ('photo', 'reading', 'signature', 'document', 'other')),
  file_path TEXT NOT NULL,
  description TEXT,
  technician_id UUID REFERENCES technicians(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla para checklist de validación
CREATE TABLE IF NOT EXISTS validation_checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_order_id UUID REFERENCES work_orders(id) ON DELETE CASCADE,
  checklist_name TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  technician_id UUID REFERENCES technicians(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Tabla para items del checklist
CREATE TABLE IF NOT EXISTS validation_checklist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  checklist_id UUID REFERENCES validation_checklists(id) ON DELETE CASCADE,
  item_description TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  required BOOLEAN DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
