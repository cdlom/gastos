// Dependencies
import React, { Component } from 'react';
//import PropTypes from 'prop-types';


class Footer extends Component {

  render() {
  	const  copyright = '&copy  MERN LTA'  ;

    return (
      <div className="Footer">
        <p dangerouslySetInnerHTML={{ __html: copyright }} />
      </div>
    );
  }
}

export default Footer;