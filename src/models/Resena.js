const mongoose = require('mongoose');
const {Schema} = mongoose;

const ResenaSchema = new Schema({
    rating: {type: Number, required: true},
    review: {type: String, required: true},
    destinos:[{
        destino: {type: Schema.Types.ObjectId, ref: 'Destino'},
    }],
    usuarios:[{
        usuario: {type: Schema.Types.ObjectId, ref: 'User'},
    }],
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Resena', ResenaSchema);