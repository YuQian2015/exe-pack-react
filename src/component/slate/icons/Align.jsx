/**
 * Created by YuQian on 3/22/2019.
 */
import React from 'react';
import {Icon, Tooltip, Button} from 'antd';

const ButtonGroup = Button.Group;

function Align(props) {
    const {onChange, editor} = props;
    const isLeftActive = editor.value.blocks.some(block => block.get('data').get('align') === 'left');
    const isCenterActive = editor.value.blocks.some(block => block.get('data').get('align') === 'center');
    const isRightActive = editor.value.blocks.some(block => block.get('data').get('align') === 'right');
    const onClickBlock = (e, dir) => {
        e.preventDefault();
        onChange(editor.setBlocks({
            data: {align: dir}
        }))
    };
    return <div className='toolbar'>
        <ButtonGroup>
            <Tooltip title='左对齐'>
                <Button onMouseDown={(e) => onClickBlock(e, 'left')} size="small"
                        type={isLeftActive ? 'primary' : ''}><Icon type="align-left"/></Button>
            </Tooltip>
            <Tooltip title='居中'>
                <Button onMouseDown={(e) => onClickBlock(e, 'center')} size="small"
                        type={isCenterActive ? 'primary' : ''}><Icon type="align-center"/></Button>
            </Tooltip>
            <Tooltip title='右对齐'>
                <Button onMouseDown={(e) => onClickBlock(e, 'right')} size="small"
                        type={isRightActive ? 'primary' : ''}><Icon type="align-right"/></Button>
            </Tooltip>
        </ButtonGroup>
    </div>

}

export default Align