import React from 'react';
import { Route , Switch } from 'react-router-dom';

//componentes
import App from './App';
import Conceptos from './Conceptos';
import Estimados from './Estimados';
import Movimientos from './Movimientos';
import Resumen from './Resumen';

const AppRoutes = () => 
<App>
    <Switch>
        <Route path="/Conceptos" componet = {Conceptos} />
        <Route path="/Estimados" componet = {Estimados} />
        <Route path="/Movimientos" componet = {Movimientos} />
        <Route path="/Resumen" componet = {Resumen} />
    </Switch>    
</App>;

export default AppRoutes;