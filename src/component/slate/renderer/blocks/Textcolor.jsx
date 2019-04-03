/**
 * Created by leo on 4/2/2019.
 */
import React from 'react';

class TextColor extends React.PureComponent {

    render() {
        const {attributes, children, editor} = this.props;
        const style = {};
        console.log(editor.value.blocks)
        editor.value.blocks.some(block => {
            style.color = block.data.get('color')
        });
        return <span style={style} {...attributes}>
            {children}
        </span>
    }
}

export default TextColor