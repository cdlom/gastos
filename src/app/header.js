//dependencias
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//import Sidebar from './sidebar';

class Header extends Component {


    static propTypes = {
        title: PropTypes.string.isRequired,
        items: PropTypes.array.isRequired
    };

    componentDidMount() {
        var elem = document.querySelector(".sidenav");
        var instance = M.Sidenav.init(elem, {
            edge: "left",
            inDuration: 250
        });
    }

    render() {
        const { title, items } = this.props;
        console.log(this.props);
        return (
            <div>
                <nav >
                    <div className="nav-wrapper">
                        <a className="brand-logo" href="/">{title}</a>
                        {/* <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a> */}
                        <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            {items && items.map(
                                (item, key) => <li key={key}> <Link to={item.url}>{item.title}</Link></li>)}
                        </ul>
                    </div>
                </nav>
                {/* <Sidebar/> */}
                <ul id="mobile-demo" className="sidenav">
                    {items && items.map(
                        (item, key) => <li key={key}> <Link to={item.url}>{item.title}</Link></li>)}
                </ul>

             </div> 

            // <div>
            //     <ul id="mobile-demo" className="sidenav">
            //         {items && items.map(
            //             (item, key) => <li key={key}> <Link to={item.url}>{item.title}</Link></li>)}
            //     </ul>
            // </div>

        )

    }

}

export default Header;