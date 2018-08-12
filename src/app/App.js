
//dependencias
import React , { Component } from 'react';

//components
import Header from './header';
import Content from './content';

//data
import items from './data/menu';


class App extends Component {
    render() {

        const { children } = this.props;

        return (
            <div className="App">
               <Header title="Gastos Personales" items={items}/>
               <Content body={children} />
            </div>
        )

    }

}

export default App;