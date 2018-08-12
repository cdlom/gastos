const mongoose = require('mongoose');

const { Schema } = mongoose;

const ConceptoSchema = new Schema ({
    conceptodesc: { type: String , required: true},
    conceptotipo: { type: String , required: true},
});

module.exports  = mongoose.model('Concepto', ConceptoSchema);