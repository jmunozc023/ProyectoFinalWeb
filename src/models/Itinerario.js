// filepath: /d:/ULACIT/Desarrollo aplicaciones web/PProyecto Final/ProyectoFinalWeb/src/models/Itinerario.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItinerarioSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    destinos: [{
        destino: { type: Schema.Types.ObjectId, ref: 'Destino' },
        visitDate: { type: Date, required: true }
    }],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Itinerario', ItinerarioSchema);