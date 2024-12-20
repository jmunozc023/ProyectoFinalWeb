const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://josepmunoz85:Ulacit2412$@cluster0.uptj2.mongodb.net/ProyFin')
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));