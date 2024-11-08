import { Schema, model, models } from "mongoose"

const PacienteSchema = new Schema({
  nombre: { type: String, required: true },
  habitacion: { type: String, required: true },
},
  {
    timestamps: true,
  }
)

export default models.Paciente || model("Paciente", PacienteSchema)