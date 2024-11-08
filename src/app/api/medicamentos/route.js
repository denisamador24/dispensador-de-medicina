import { NextResponse } from "next/server";
import Medicamento from "@/models/Medicamento";
import connectToDatabase from "@/lib/mongoose";

export async function GET(req, res) {
  try {
    connectToDatabase();
    const medicamentos = await Medicamento.find();
    return NextResponse.json(medicamentos);
  } catch (error) {
    return NextResponse.error(error);
  }
}

export async function POST(req, res) {
  try {
    connectToDatabase();
    const data = await req.json();
    const medicamento = await Medicamento.create(data);
    return NextResponse.json({ data: medicamento });
  } catch (error) {
    return NextResponse.error(error);
  }
}

export async function PATCH(req, res) {
  try {
    connectToDatabase();
    const data = await req.json();
    const medicamento = await Medicamento.findByIdAndUpdate(
      { _id: data._id },
      {
        nombre: data.nombre,
        pacienteId: data.pacienteId,
        dosis: data.dosis,
        horario: data.horario
      },
      { new: true });
    return NextResponse.json(medicamento);
  } catch (error) {
    return NextResponse.error(error);
  }
}