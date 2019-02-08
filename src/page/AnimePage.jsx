/**
 * Created by YuQian on 1/6/2019.
 */
import React from 'react';
import PropTypes from 'prop-types';

// 引入connect来使被provider包裹的react组件连接到redux的store
import { connect } from 'react-redux';
// 引入请求数据的action
import { fetchAnime } from '../action/animeAction';

class AnimePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // 组件将要加载
    componentWillMount() {
        this.props.fetchAnime();
    }

    // 组件挂载完毕
    componentDidMount() {

    }

    render() {
        return <div className="AnimePage">{
            this.props.anime.map(item => <div key={item.id}>
                <h3>
                    {item.title}
                </h3>
                <p>
                    {item.description}
                </p>
            </div>)
        }</div>
    }
}
// 定义PropTypes
AnimePage.propTypes = {
    fetchAnime: PropTypes.func.isRequired,
    anime: PropTypes.array.isRequired
};

// 创建一个方法将redux的state转换成props
const mapStateToProps = state => ({
    // 这里使用的state.anime 是在 reducer/index.js 文件中的 根reducer里面定义的
    anime: state.anime.items
});

export default connect(mapStateToProps, { fetchAnime })(AnimePage);
