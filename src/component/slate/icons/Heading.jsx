/**
 * Created by YuQian on 3/20/2019.
 */
import React from 'react';
import BLOCKS from '../constants/BLOCKS.jsx';
import { hasBlock } from '../utils/HasBlock.jsx';
import {Tooltip, Button} from 'antd'

function Heading(props) {
    const {onChange, editor, level} = props;
    const type = BLOCKS[`HEADING_${level}`];
    const isActive = hasBlock(editor, type);
    const onClickMark = (e) => {
        e.preventDefault();
        const change = editor.command('setBlocks', isActive ? BLOCKS.PARAGRAPH : type);
        onChange(change)
    };
    return (
        <div className='toolbar' onMouseDown={onClickMark}>
            <Tooltip title={`标题${level}`}>
                <Button size="small" type={isActive ? 'primary' : ''}>{`H${level}`}</Button>
            </Tooltip>
        </div>
    )
}

export default Heading;