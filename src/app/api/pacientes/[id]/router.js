import { connectToDatabase } from "../../../lib/mongodb";
import { NextResponse } from "next/server";
import Paciente from "../../../models/Paciente";

export async function PATCH(req, res) {
  try {
    connectToDatabase();
    const data = await req.json();
    const paciente = await Paciente.findByIdAndUpdate({ _id: data._id }, data, { new: true });
    return NextResponse.json(paciente);
  } catch (error) {
    return NextResponse.error(error);
  }
}

export async function DELETE(req, res) {
  try {
    connectToDatabase();
    const data = await req.json();
    const paciente = await Paciente.findByIdAndDelete({ _id: data._id });
    return NextResponse.json(paciente);
  } catch (error) {
    return NextResponse.error(error);
  }
}