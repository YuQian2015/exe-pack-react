/**
 * Created by YuQian on 3/22/2019.
 */
import React from 'react'

import BLOCKS from '../constants/Blocks.jsx';
import {hasBlock} from '../utils/HasBlock.jsx';
import {Icon, Tooltip, Button} from 'antd';

const DEFAULT_NODE = 'paragraph';

function UlList(props) {
    const {onChange, editor} = props;
    const {value} = editor;
    const {document, blocks} = value;
    const type = BLOCKS.UL_LIST;
    let isActive = false;
    if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key);
        isActive = hasBlock(editor, BLOCKS.LIST_ITEM) && parent && parent.type === type
    }

    const onClickBlock = (e) => {
        e.preventDefault();
        const isList = hasBlock(editor, BLOCKS.LIST_ITEM);
        const isType = value.blocks.some(block => {
            return !!document.getClosest(block.key, parent => parent.type === type)
        });

        if (isList && isType) {
            editor.setBlocks(DEFAULT_NODE).unwrapBlock(type)
        } else if (isList) {
            editor
                .unwrapBlock(
                    type === BLOCKS.UL_LIST ? BLOCKS.OL_LIST : BLOCKS.UL_LIST
                ).wrapBlock(type)
        } else {
            editor.setBlocks(BLOCKS.LIST_ITEM).wrapBlock(type)
        }
        onChange(editor);
    };


    return <div className='toolbar' onMouseDown={onClickBlock}>
        <Tooltip title='- + space'>
            <Button size="small" type={isActive ? 'primary' : ''}><Icon type="bars"/></Button>
        </Tooltip>
    </div>
}

export default UlList