/**
 * Created by YuQian on 3/19/2019.
 */
import React from 'react';
import {Tooltip, Icon  } from 'antd';

class Image extends React.PureComponent {

    constructor (props){
        super(props)
        this.state = {
            showImg : true
        }
        this.show = this.show.bind(this);
    }
    show (){  // 删除图片方法待定，这只能支持当前删除，但是缓存中图片还是，如果操作imagelist好像不好同步
        this.setState({showImg: false})
    }
    render() {
        const {
            attributes, children, node
        } = this.props;
        const src = this.props.node.data.get('src');
        const textAlign = node.data.get('align');
        const style = {borderBottom: 'none', textAlign};
        console.log(this.props)
        return (
            <div>
            {
                this.state.showImg ? 
                <div className={ this.props.isFocused ? "selected imgIconDiv" : "imgIconDiv" } style={style}>
                    <div className="imgIconBox">
                        <img alt="图片地址"src={src}/>
                        <span className="imgIcon t_l"></span>
                        <span className="imgIcon t_r"></span>
                        <span className="imgIcon b_l"></span>
                        <span className="imgIcon b_r"></span>
                        <div className="tools_more">
                            <Tooltip title="删除" placement="bottom">
                                <div className="tools_item" onClick={this.show}>
                                    <Icon type="delete" />
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                : null
            }
            </div>
        )
    }
}

export default Image