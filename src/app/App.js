
//dependencias
import React , { Component } from 'react';

//components
import Header from './header';

//data
import items from './data/menu';


class App extends Component {
    render() {
        return (
            <div className="App">
               <Header items={items}/>

            </div>

        )

    }

}

export default App;