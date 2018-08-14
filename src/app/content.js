import React, {Component} from 'react';

class Content extends Component{

    render() {
        const { body } = this.props;
        console.log('body');
        console.log(body);

        return(
            <div className="Content">
            {body}
            </div>
        );
    }
}

export default Content;