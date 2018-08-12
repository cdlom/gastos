const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/gastos')
    .then(db => console.log('DB is connected'))
    .catch(err => console.err(err));

module.exports = mongoose;