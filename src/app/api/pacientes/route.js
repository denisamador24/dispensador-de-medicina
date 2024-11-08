import connectToDatabase from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Paciente from "@/models/Paciente";

export async function POST(req, res) {
  try {
    await connectToDatabase();
    // datos json del body
    const data = await req.json();
    console.log(data);
    const paciente = await Paciente.create(data);
    return NextResponse.json({ data: paciente });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" });
  }
}

export async function GET(req, res) {
  try {
    await connectToDatabase();
    const pacientes = await Paciente.find();
    return NextResponse.json(pacientes);
  } catch (error) {
    return NextResponse.error(error);
  }
}

export async function PATCH(req, res) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const paciente = await Paciente.findByIdAndUpdate(
      { _id: data._id },
      {
        nombre: data.nombre,
        habitacion: data.habitacion
      },
      { new: true });
    return NextResponse.json(paciente);
  } catch (error) {
    return NextResponse.error(error);
  }
}

export async function DELETE(req, res) {
  try {
    await connectToDatabase();
    const data = await req.json();
    console.log("ID ____________", data._id);

    const paciente = await Paciente.findByIdAndDelete({ _id: data._id });
    return NextResponse.json(paciente);
  } catch (error) {
    return NextResponse.error(error);
  }
}
