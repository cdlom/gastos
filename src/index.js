const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { mongoose } = require('./database');

const app = express();


//settings
app.set('port', process.env.PORT || 3000 );


//middlewares
app.use(morgan('dev'));
app.use(express.json());


// static files

console.log(path.join(__dirname,'public'));
app.use(express.static(path.join(__dirname,'public')));

//routes
app.use('/api/conceptos', require('./routes/concepto.routes'));
// app.get('/*', function(req, res) {
//     res.sendfile(path.join(__dirname,'public/index.html'),function(err){
//         if(err) {
//             res.status(500).send(err)
//         }
//     })
// });
// // app.get("/*", (req, res) => {

//     console.log(path.resolve(__dirname,'public','index.html'));
//     res.sendfile(path.resolve(__dirname,'public','index.html'));

// });

app.get("/*", (req, res) => {

    console.log(path.resolve(__dirname,'public','index.html'));
    res.sendfile(path.resolve(__dirname,'public','index.html'));
    // res.render('public/index',{
    //     layout: false
    // });
});





// starting the server
app.listen( app.get('port') , () => {

    console.log(`Server on port ${app.get('port')}`);

});
