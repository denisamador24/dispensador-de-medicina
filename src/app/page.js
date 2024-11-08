"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Edit, Trash2 } from "lucide-react"

export default function Component() {
  const [pacientes, setPacientes] = useState([
    // { id: 1, nombre: "Juan Pérez", habitacion: "101" },
    // { id: 2, nombre: "María García", habitacion: "102" },
  ])

  const [medicamentos, setMedicamentos] = useState([
    // { id: 1, pacienteId: 1, nombre: "Paracetamol", dosis: "500mg", horario: "08:00, 14:00, 20:00" },
    // { id: 2, pacienteId: 1, nombre: "Ibuprofeno", dosis: "400mg", horario: "10:00, 22:00" },
    // { id: 3, pacienteId: 2, nombre: "Omeprazol", dosis: "20mg", horario: "07:00" },
  ])

  const [nuevoPaciente, setNuevoPaciente] = useState({ nombre: "", habitacion: "" })
  const [nuevoMedicamento, setNuevoMedicamento] = useState({ pacienteId: 0, nombre: "", dosis: "", horario: "" })

  const agregarPaciente = async () => {
    if (nuevoPaciente.nombre && nuevoPaciente.habitacion) {
      // agregar paciente en la base de datos
      // post a la API
      // convertir texto a número
      const habitacion = parseInt(nuevoPaciente.habitacion)
      const newPatient = {
        nombre: nuevoPaciente.nombre,
        habitacion: habitacion
      }
      const response = await fetch('api/pacientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPatient),
      })
      const newPaciente = await response.json()

      if (response.ok) {
        setPacientes([...pacientes, newPaciente.data])
        setNuevoPaciente({ nombre: "", habitacion: "" })
      }
    }
  }

  const agregarMedicamento = async () => {
    if (nuevoMedicamento.pacienteId && nuevoMedicamento.nombre && nuevoMedicamento.dosis && nuevoMedicamento.horario) {
      // agregar medicamento en la base de datos
      // post a la API
      const response = await fetch('api/medicamentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoMedicamento),
      })
      const newMedicamento = await response.json()
      console.log(newMedicamento);


      setMedicamentos([...medicamentos, newMedicamento.data])
      setNuevoMedicamento({ pacienteId: 0, nombre: "", dosis: "", horario: "" })
    }
  }

  useEffect(() => {
    // cargar pacientes de la base de datos
    // get a la API

    const getPatients = async () => {
      const response = await fetch('/api/pacientes')
      const data = await response.json()
      console.log(data);

      setPacientes(data)
    }

    const getMedicamentos = async () => {
      const response = await fetch('/api/medicamentos')
      const data = await response.json()
      console.log(data);

      setMedicamentos(data)
    }

    getPatients()
    getMedicamentos()
  }, []);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Administrador de Medicamentos para Pacientes</h1>

      <Tabs defaultValue="pacientes">
        <TabsList>
          <TabsTrigger value="pacientes">Pacientes</TabsTrigger>
          <TabsTrigger value="medicamentos">Medicamentos</TabsTrigger>
        </TabsList>

        <TabsContent value="pacientes">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Pacientes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Habitación</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pacientes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3}>No hay pacientes registrados</TableCell>
                    </TableRow>
                  )
                    :
                    (pacientes.map((paciente) => (
                      <TableRow key={paciente._id}>
                        <TableCell>{paciente.nombre}</TableCell>
                        <TableCell>{paciente.habitacion}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
                        </TableCell>
                      </TableRow>
                    )))}
                </TableBody>
              </Table>

              <div className="mt-4 space-y-2">
                <Label htmlFor="nombre">Nombre del Paciente</Label>
                <Input
                  id="nombre"
                  value={nuevoPaciente.nombre}
                  onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, nombre: e.target.value })}
                  placeholder="Nombre del paciente"
                />
                <Label htmlFor="habitacion">Habitación</Label>
                <Input
                  id="habitacion"
                  value={nuevoPaciente.habitacion}
                  onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, habitacion: e.target.value })}
                  placeholder="Número de habitación"
                />
                <Button onClick={agregarPaciente}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Agregar Paciente
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medicamentos">
          <Card>
            <CardHeader>
              <CardTitle>Administración de Medicamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Medicamento</TableHead>
                    <TableHead>Dosis</TableHead>
                    <TableHead>Horario</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medicamentos.length === 0
                    ?
                    <TableRow key={1}>
                      <TableCell colSpan={5}>No hay medicamentos registrados</TableCell>
                    </TableRow>
                    :
                    medicamentos.map((medicamento) => (
                      <TableRow key={medicamento.id}>
                        <TableCell>{pacientes.find(p => p.id === medicamento.pacienteId)?.nombre}</TableCell>
                        <TableCell>{medicamento.nombre}</TableCell>
                        <TableCell>{medicamento.dosis}</TableCell>
                        <TableCell>{medicamento.horario}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>

              <div className="mt-4 space-y-2">
                <Label htmlFor="paciente">Paciente</Label>
                <select
                  id="paciente"
                  className="w-full p-2 border rounded"
                  value={nuevoMedicamento.pacienteId}
                  onChange={(e) => setNuevoMedicamento({ ...nuevoMedicamento, pacienteId: e.target.value })}
                >
                  <option value={0}>Seleccionar paciente</option>
                  {pacientes.map((paciente) => (
                    <option key={paciente._id} value={paciente._id}>{paciente.nombre}</option>
                  ))}
                </select>
                <Label htmlFor="medicamento">Medicamento</Label>
                <Input
                  id="medicamento"
                  value={nuevoMedicamento.nombre}
                  onChange={(e) => setNuevoMedicamento({ ...nuevoMedicamento, nombre: e.target.value })}
                  placeholder="Nombre del medicamento"
                />
                <Label htmlFor="dosis">Dosis</Label>
                <Input
                  id="dosis"
                  value={nuevoMedicamento.dosis}
                  onChange={(e) => setNuevoMedicamento({ ...nuevoMedicamento, dosis: e.target.value })}
                  placeholder="Dosis del medicamento"
                />
                <Label htmlFor="horario">Horario</Label>
                <Input
                  id="horario"
                  value={nuevoMedicamento.horario}
                  onChange={(e) => setNuevoMedicamento({ ...nuevoMedicamento, horario: e.target.value })}
                  placeholder="Horario de administración (ej: 08:00, 14:00, 20:00)"
                />
                <Button onClick={agregarMedicamento}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Agregar Medicamento
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}