/**
 * Created by YuQian on 3/22/2019.
 */
import React from 'react';

class Heading extends React.PureComponent {

    render() {
        const {
            attributes, children, node
        } = this.props;
        const { type } = node;
        const level = type.split('_')[1];
        const Tag = `h${level}`;
        const textAlign = node.get('data').get('align', 'left');
        const style = {textAlign};
        return <Tag style={style} {...attributes}>
            {children}
        </Tag>
    }
}

export default Heading