const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

const PeriodoModel = require('../models/periodo.model');



//Eliminar todos los pronosticos de un período
router.delete('/deleteallpronostico/:id', async (req, res) => {

    //await PeriodoModel.findByIdAndRemove(req.params.id);
    // const periodo = await PeriodoModel.findById(req.params.id);
    // const periodoaggregate = await PeriodoModel.aggregate(
    //     [
    //         { $match: { _id: req.params.id } },
    //         { $project:{ pronostico: {$size: '$pronostico'}}}
    //     ]
    // )

    // var _pronostico = periodo.pronostico;

    // console.log("estoy en node agregate");
    // console.log(periodoaggregate);

    // var i = 0

    // for (i = 0; i < periodo.pronostico.lenght; i++) {

    //     console.log("estoy en el bucle");
    //     console.log(periodo.pronostico[i]);

    //     periodo.pronostico[i].remove();

    // }
    // console.log("estoy en node luego del remove");
    // console.log(periodo);


    // periodo.save();



///// New Try
// PeriodoModel.findById(req.params.id, function (err, periodo)
// {
//     console.log (periodo.pronostico.lenght);
// }

// )

//     res.json({ Status: 'Pronosticos del período Eliminados' });


// });
PeriodoModel.aggregate( [
    { $match: { _id: mongoose.Types.ObjectId( req.params.id)} },
    { $project: { "pronosticosize" :{ "$size": "$pronostico"}}}
    //{ $project: { periodo: 1,  pronostico : 1 }}
    ],
    async function(err, docs){
     //   console.log(req.params.id);
        

// Ahora si , a borrar
    const periodo = await PeriodoModel.findById(req.params.id);
    var i = 0
    var _size = docs[0].pronosticosize - 1
    console.log(_size);
    for (i = _size ; i >= 0 ; i--) {

        console.log("estoy en el bucle", i );
        console.log(periodo.pronostico[i]);

        periodo.pronostico[i].remove();

    }
    console.log("estoy en node luego del remove");
    console.log(periodo);


    periodo.save();


    }
)


res.json({ Status: 'Pronosticos del período Eliminados' });

});

// Agregar un pronostico a un periodo
router.post('/addpronostico/:idPeriodo', async (req, res) => {

    // const newpronostico = {
    //     pronosticoid: { type: String, required: true },
    //     pronosticodesc: { type: String, required: true },
    //     pronosticotipo: { type: String, required: true },
    //     pronosticoimporte: { type: Number, required: true }
    // };



    console.log('req.body');
    console.log(req.body);

    // newpronostico.pronosticoid = req.body.pronostico[0].pronosticoid;
    // newpronostico.pronosticodesc = req.body.pronostico[0].pronosticodesc;
    // newpronostico.pronosticotipo = req.body.pronostico[0].pronosticotipo;
    // newpronostico.pronosticoimporte = req.body.pronostico[0].pronosticoimporte;


    //console.log('newpronostico');
    //console.log(newpronostico);

    const { pronostico } = req.body;

    const periodos = await PeriodoModel.findById(req.params.idPeriodo);

    console.log('periodo encontrado');
    console.log(periodos);
    //  periodos.pronostico.push( newpronostico);

    periodos.pronostico.push(pronostico);

    //    res.json({ Status: 'Pronostico Agregado' });

    // const { periodo, pronostico } = req.body;

    // const newPeriodo = new PeriodoModel({ periodo, pronostico });

    await periodos.save()
        .then(function () {

            //            console.log("New Periodo");
            //          console.log(newPeriodo);

            res.json({ Status: 'Pronostico Agregado' });
        })
        .catch(function (e) {
            console.error(e);
            res.json({ Status: 'Error en la creación de período' });
        });

});





// Agregar un periodo completo
router.post('/', async (req, res) => {

    console.log('post');
    console.log(req.body);

    const { periodo, pronostico } = req.body;

    const newPeriodo = new PeriodoModel({ periodo, pronostico });

    await newPeriodo.save()
        .then(function () {

            console.log("New Periodo");
            console.log(newPeriodo);

            res.json( newPeriodo );
        })
        .catch(function (e) {
            console.error(e);
            res.json({ Status: 'Error en la creación de período' });
        });

});


//modificar un periodo completo
router.put('/:id', async (req, res) => {

    const { periodo, pronostico, real } = req.body;



    //const newPeriodo = new PeriodoModel( { periodo, pronostico , real });

    var newPeriodo = {};

    newPeriodo.periodo = periodo;
    newPeriodo.pronostico = pronostico;
    newPeriodo.real = real;

    console.log(newPeriodo);

    await PeriodoModel.findByIdAndUpdate(req.params.id, newPeriodo);

    res.json({ Status: 'Período Actualizado' });


});



//Eliminar un periodo completo
router.delete('/:id', async (req, res) => {

    await PeriodoModel.findByIdAndRemove(req.params.id);

    res.json({ Status: 'Período Eliminado' });


});



//Obtener todos los periodos
router.get('/', async (req, res) => {
    const periodos = await PeriodoModel.find();
    console.log(periodos);
    res.json(periodos);


});



//Obtener un periodo por Id
router.get('/:id', async (req, res) => {
    const periodos = await PeriodoModel.findById(req.params.id);
    res.json(periodos);


});

//Obtener un periodo por periodo
router.get('/periodo/:id', async (req, res) => {
    const periodos = await PeriodoModel.find({ periodo: req.params.id });
    res.json(periodos);


});

module.exports = router;