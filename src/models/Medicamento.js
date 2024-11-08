import { Schema, model, models } from 'mongoose';

const medicamentoSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  pacienteId: {
    type: Schema.Types.ObjectId,
    ref: 'Paciente',
    required: true
  },
  dosis: {
    type: String,
    required: true
  },
  horario: {
    type: String,
    required: true
  }
});

export default models.Medicamento || model('Medicamento', medicamentoSchema);