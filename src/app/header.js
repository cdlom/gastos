//dependencias
import React , { Component } from 'react';
import PropTypes from 'prop-types';


class Header extends Component {
    render() {
        return (
            <div>
                <nav className="light-blue darken-4">
                    <div className ="container">
                        <a className="brand-logo" href="/"> Gastos Personales- Header</a>

                    </div>

                </nav>

            </div>

        )

    }

}

export default Header;