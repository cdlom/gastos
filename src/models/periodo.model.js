const mongoose = require('mongoose');

const { Schema } = mongoose;

const PeriodoSchema = new Schema({
    periodo: { type: String, required: true , index:{ unique: true } },
    pronostico:[ {
        pronosticoid: { type: String, required: true },
        pronosticodesc: { type: String, required: true },
        pronosticotipo: { type: String, required: true },
        pronosticoimporte: { type: Number, required: true }
    }],
    real:[{
        realid:{ type: String, required: true },
        realfecha: {type: Date, required: true},
        realdesc: { type: String, required: true },
        realtipo: { type: String, required: true },
        realimporte: { type: Number, required: true }, 
        realobservacion: {type: String, required: true}
    }]
});

module.exports = mongoose.model('Periodo', PeriodoSchema);