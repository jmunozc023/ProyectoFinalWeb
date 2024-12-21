const mongoose = require('mongoose');
const {Schema} = mongoose;

const DestinoSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    location: {type: String, required: true},
    price: {type: Number, required: true},
    date:  {type: Date, default: Date.now}
});

module.exports = mongoose.model('Destino', DestinoSchema);


