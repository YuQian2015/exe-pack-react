/**
 * Created by YuQian on 3/20/2019.
 */
import React from 'react';
import MARKS from '../constants/Marks.jsx';
import {hasMark} from '../utils/HasMark.jsx';
import {Icon, Tooltip, Button} from 'antd'

function Strikethrough(props) {
    const {onChange, editor} = props;
    const type = MARKS.STRIKETHROUGH;
    const isActive = hasMark(editor, type);
    const onClickMark = (e) => {
        e.preventDefault();
        const change = editor.toggleMark(type);
        onChange(change)
    };

    return (
        <div className='toolbar' onMouseDown={onClickMark}>
            <Tooltip title="ctrl+d 下划线">
                <Button size="small" type={isActive ? 'primary' : ''}><Icon type="strikethrough" /></Button>
            </Tooltip>
        </div>
    )
}

export default Strikethrough;