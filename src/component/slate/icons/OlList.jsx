/**
 * Created by YuQian on 3/22/2019.
 */
import React from 'react'

import BLOCKS from '../constants/Blocks.jsx';
import { hasBlock } from '../utils/HasBlock.jsx';
import {Icon, Tooltip, Button} from 'antd';

const DEFAULT_NODE = 'paragraph';

function OlList (props) {
    const { onChange, editor } = props;
    const { value } = editor;
    const { document, blocks } = value;
    const type = BLOCKS.OL_LIST;
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

        // 如果是 OL_LIST 里面的 LIST_ITEM 则从列表项转成段落
        if (isList && isType) {
            editor.setBlocks(DEFAULT_NODE).unwrapBlock(type)
        } else if (isList) { // 如果是 LIST_ITEM 且是 UL_LIST 则将 UL_LIST 转成 OL_LIST
            editor
                .unwrapBlock(
                    type === BLOCKS.UL_LIST ? BLOCKS.OL_LIST : BLOCKS.UL_LIST
                ).wrapBlock(type)
        } else { // 没有设置过 OL_LIST 的就转成 OL_LIST
            editor.setBlocks(BLOCKS.LIST_ITEM).wrapBlock(type)
        }
        onChange(editor);
    };


    return <div className='toolbar' onMouseDown={onClickBlock}>
        <Tooltip title='- + space'>
            <Button size="small" type={isActive ? 'primary' : ''}><Icon type="ordered-list" /></Button>
        </Tooltip>
    </div>
}

export default OlList