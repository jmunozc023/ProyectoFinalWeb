const mongoose = require('mongoose');

mongoose.connect('')
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));
