/**
 * Created by YuQian on 3/19/2019.
 */
import React from 'react';

class Image extends React.PureComponent {

    render() {
        const {
            attributes, children, node
        } = this.props;
        const src = this.props.node.data.get('src');
        const textAlign = node.data.get('align');
        const style = {borderBottom: 'none', textAlign};
        
        return (
            <div style={style}>
                <img alt="" className={
                    this.props.isFocused ? "selected" : ""
                } src={src}/>
            </div>
        )
    }
}

export default Image