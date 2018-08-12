const express = require('express');

const router = express.Router();

const ConceptoModel = require('../models/concepto');

router.get('/', async (req , res ) => {
    const conceptos = await ConceptoModel.find();
    console.log(conceptos);
    res.json(conceptos);


});


router.get('/:id', async (req , res ) => {
    const concepto = await ConceptoModel.findById(req.params.id);
    res.json(concepto);


});



router.post('/' , async (req, res) => {
    const { conceptodesc, conceptotipo } = req.body;
    const newConcepto = new ConceptoModel( {conceptodesc , conceptotipo});
    await newConcepto.save();   
    console.log(newConcepto);
    res.json({Status: 'Concepto Guardado'});


});

router.put('/:id', async (req, res) => {
    const { conceptodesc, conceptotipo } = req.body;
    const newConcepto = { conceptodesc, conceptotipo };

    console.log(req.params.id);

    await ConceptoModel.findByIdAndUpdate(req.params.id, newConcepto);

    res.json({Status: 'Concepto Modificado'});

    
});

router.delete('/:id', async (req, res) => {
    
    await ConceptoModel.findByIdAndRemove(req.params.id);

    res.json({Status: 'Concepto Eliminado'});

    
});


module.exports = router;
