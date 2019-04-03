/**
 * Created by leo on 4/2/2019.
 */
import React from 'react';
import MARKS from '../constants/Marks.jsx';
import {hasMark} from '../utils/HasMark.jsx';
import {Icon, Tooltip, Button} from 'antd';
import { TwitterPicker } from 'react-color';

let type = MARKS.TEXTCOLOR;

class Textcolor extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            showPicker: false,
            currentColor: '#fff'
        };
        this.onClickMark = this.onClickMark.bind(this);
        this.onChangeColor = this.onChangeColor.bind(this);
    }

    onClickMark (e){
        e.preventDefault();
        this.setState({showPicker: !this.state.showPicker})
    }
    onChangeColor (color, e) {
        let {onChange, editor} = this.props;
        e.preventDefault();
        this.setState({currentColor: color});
        // onChange(editor.toggleMark(type));
        onChange(editor.removeMark(type));
        onChange(editor.addMark(type));
        onChange(editor.setBlocks({
            data: {color: color.hex}
        }));
    }
    render() {
        let {onChange, editor} = this.props;
        let isActive = hasMark(editor, type);
        return (
            <div className='toolbar toolbar-fscolor'>
                <Tooltip title="文字颜色">
                    <Button onMouseDown={this.onClickMark} size="small" type={isActive ? 'primary' : ''}><Icon type="font-colors" /></Button>
                </Tooltip>
                { this.state.showPicker && <TwitterPicker color={this.state.currentColor} onChange={ this.onChangeColor } /> }
            </div>
        )
    }
}

export default Textcolor