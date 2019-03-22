/**
 * Created by YuQian on 3/19/2019.
 */
import React from 'react';

class Image extends React.PureComponent {

    render() {
        const src = this.props.node.data.get('src');
        return (<img alt="" className={
            this.props.isFocused ? "selected" : ""
        } src={src}/>)
    }
}

export default Image