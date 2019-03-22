/**
 * Created by YuQian on 3/20/2019.
 */
import React from 'react';
import BLOCKS from '../constants/Blocks.jsx';
import { hasBlock } from '../utils/HasBlock.jsx';
import {Tooltip, Button} from 'antd';

const ButtonGroup = Button.Group;

function Heading(props) {
    const {onChange, editor, header} = props;
    const onClickBlock = (e, level) => {
        e.preventDefault();
        const change = editor.command('setBlocks', hasBlock(editor, BLOCKS[`HEADING_${level}`]) ? BLOCKS.PARAGRAPH : BLOCKS[`HEADING_${level}`]);
        onChange(change)
    };
    return (
        <div className='toolbar'>
            <ButtonGroup>
                {
                    header.map(i => <Tooltip key={i} title={"标题"+i}>
                        <Button onMouseDown={(e) => onClickBlock(e, i)} size="small"
                                type={hasBlock(editor, BLOCKS[`HEADING_${i}`]) ? 'primary' : ''}>H{i}</Button>
                    </Tooltip>)
                }
            </ButtonGroup>
        </div>
    )
}

export default Heading;