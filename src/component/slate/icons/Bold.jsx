/**
 * Created by YuQian on 3/19/2019.
 */
import React from 'react';
import MARKS from '../constants/Marks.jsx';
import {hasMark} from '../utils/HasMark.jsx';
import {Icon, Tooltip, Button} from 'antd'

function Bold(props) {
    const {onChange, editor} = props;
    const type = MARKS.BOLD;
    const isActive = hasMark(editor, type);
    const onClickMark = (e) => {
        e.preventDefault();
        const change = editor.toggleMark(type);
        onChange(change)
    };

    return (
        <div className='toolbar' onMouseDown={onClickMark}>
            <Tooltip title="ctrl+b 加粗">
                <Button size="small" type={isActive ? 'primary' : ''}><Icon type="bold"/></Button>
            </Tooltip>
        </div>
    )
}

export default Bold;