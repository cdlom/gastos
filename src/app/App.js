
//dependencias
import React, { Component } from 'react';

//components
import Header from './header';
import Content from './content';
import Footer from './footer';

//data
import items from './data/menu';


class App extends Component {
    render() {

        const { children } = this.props;
        console.log(children);
        return (
            <div className="App blue-grey darken-1">
                <Header title="Gastos Personales" items={items} />
                <div className="blue-grey darken-1">
                    {/* <div className="container"> */}
                        <Content body={children} />
                    {/* </div> */}
                </div>
                <div className="blue-grey darken-1">
                    <Footer/>
                </div>
            </div>
        )

    }

}

export default App;