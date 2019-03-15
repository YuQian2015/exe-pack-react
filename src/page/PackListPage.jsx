/**
 * Created by YuQian on 2/16/2019.
 */
import React from 'react';
import PropTypes from 'prop-types';

import PageContainer from '../container/PageContainer.jsx'; // 引入页面的容器

import PackItemComponent from '../component/PackItemComponent.jsx';

import QueueAnim from 'rc-queue-anim';


// 引入connect来使被provider包裹的react组件连接到redux的store
import { connect } from 'react-redux';
// 引入请求数据的action
import { getPackList } from '../action/packAction';

class PackListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // 组件将要加载
    componentWillMount() {
        this.props.getPackList({
            complete: false
        })
    }

    // 组件挂载完毕
    componentDidMount() {

    }

    render() {
        const { packList } = this.props;

        let page = <div className="PackListPage">
            <QueueAnim type='bottom'>
                {
                    packList.map(pack => <PackItemComponent data={pack} key={pack._id} />)
                }
            </QueueAnim>
        </div>;

        return <PageContainer page={page} />
    }
}

// 定义PropTypes
PackListPage.propTypes = {
    getPackList: PropTypes.func.isRequired,
    packList: PropTypes.array.isRequired
};


// 创建一个方法将redux的state转换成props
const mapStateToProps = state => ({
    // 这里使用的state.pack 是在 reducer/index.js 文件中的 根reducer里面定义的
    packList: state.pack.packList
});

export default connect(mapStateToProps, { getPackList })(PackListPage);