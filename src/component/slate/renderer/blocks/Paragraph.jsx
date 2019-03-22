/**
 * Created by YuQian on 3/22/2019.
 */
import React from 'react'

function Paragraph(props) {
    const {
        attributes, children, node
    } = props;

    const textAlign = node.get('data').get('align', 'left');
    const style = {borderBottom: 'none', textAlign};

    return <p style={style} {...attributes}>
        {children}
    </p>
}

export default Paragraph