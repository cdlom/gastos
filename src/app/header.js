//dependencias
import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Header extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        items: PropTypes.array.isRequired
    };


    render() {
        const { title, items } = this.props;
        console.log(this.props);
        return (
            <div>
                <nav >
                    <div className="nav-wrapper">
                        <a className="brand-logo" href="/">{title}</a>

                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            {items && items.map((item, key) => <li key={key}> <a href="/">{item.title}</a></li>)}
                        </ul>
                    </div>


                </nav>

            </div>

        )

    }

}

export default Header;