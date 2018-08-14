import React from 'react';
import { Route , Switch } from 'react-router-dom';

//componentes
import App from './App';
import Conceptos from './Conceptos';
import Estimados from './Estimados';
import Movimientos from './Movimientos';
import Resumen from './Resumen';
import Home from './Home';


console.log(Conceptos);
const AppRoutes = () => 
<App>
    <Switch>
        <Route exact path="/" component = {Home} />
        <Route exact path="/Conceptos" component = {Conceptos} />
        <Route path="/Estimados" component = {Estimados} />
        <Route path="/Movimientos" component = {Movimientos} />
        <Route path="/Resumen" component = {Resumen} />
    </Switch>    
</App>;

export default AppRoutes;