/**
 * Created by YuQian on 3/19/2019.
 */
import React from 'react';
import {Tooltip, Icon  } from 'antd';

class Image extends React.PureComponent {

    render() {
        const {
            attributes, children, node
        } = this.props;
        const src = this.props.node.data.get('src');
        const textAlign = node.data.get('align');
        const style = {borderBottom: 'none', textAlign};
        console.log(this.props)
        return (
            <div className={ this.props.isFocused ? "selected imgIconDiv" : "imgIconDiv" } style={style}>
                <img alt="图片地址"src={src}/>
                <span className="imgIcon t_l"></span>
                <span className="imgIcon t_r"></span>
                <span className="imgIcon b_l"></span>
                <span className="imgIcon b_r"></span>
                <div className="tools_more">
                    <Tooltip title="删除" placement="bottom">
                        <div className="tools_item">
                            <Icon type="delete" />
                        </div>
                    </Tooltip>
                </div>
            </div>
        )
    }
}

export default Image