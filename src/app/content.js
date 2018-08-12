import React, {Component} from 'react';

class Content extends Component{

    render() {
        const { body } = this.props;
        return(
            <div className="Content">
            {body}
            </div>
        );
    }
}