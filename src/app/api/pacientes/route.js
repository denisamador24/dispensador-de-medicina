import connectToDatabase from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Paciente from "@/models/Paciente";

export async function POST(req, res) {
  // se usara nextResponse
  // guardar paciente en la base de datos

  try {
    connectToDatabase();
    // datos json del body
    const data = await req.json();
    console.log(data);
    // const paciente = new Paciente({ "nombre": data.nombre, "habitacion": data.habitacion });
    // const result = await paciente.save();
    return NextResponse.json({ na: "ss" });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "error" });
  }
}

export async function GET(req, res) {
  try {
    connectDB();
    const pacientes = await Paciente.find();
    return NextResponse.json(pacientes);
  } catch (error) {
    return NextResponse.error(error);
  }
}