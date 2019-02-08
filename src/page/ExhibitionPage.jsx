/**
 * Created by YuQian on 12/1/2018.
 */
import React from 'react';
import PageContainer from '../container/PageContainer.jsx'; // 引入页面的容器

import UserService from '../service/UserService.jsx'; // 引入service

export default class ExhibitionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            seasons: ['春', '秋'],
            page: 1,
            rows: 2,
            hasMore: false
        };
        this.getData = this.getData.bind(this);
        this.getMore = this.getMore.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    // 组件将要加载
    componentWillMount() {
        this.getData();
    }

    getData() {
        let { page, rows, list, hasMore} = this.state;
        //let a = {
        //    "ada":12313
        //};
        //let b = {
        //    page, rows
        //}
        //let c = {
        //    ...a, ...b
        //}
        //console.log(c)
        UserService.findExhibitionList({
            page,
            rows
        }).then(res => {
            if(res && res.success) {
                console.log(res.entity);
                if(res.entity && res.entity.items) {
                    hasMore = res.entity.hasNextPage;
                    if(page > 1) {
                        list = list.concat(res.entity.items) ;
                    } else {
                        list = res.entity.items;
                    }
                    this.setState({
                        list, hasMore
                    })
                }
            } else {
                alert(res.message);
            }
        }).catch(error => {
            alert('请求失败')
        })
    }
    getMore() {
        let { page } = this.state;
        page ++;
        this.setState({
            page
        }, () => {
            this.getData();
        })
    }

    refresh() {
        let { page } = this.state;
        page = 1;
        this.setState({
            page
        }, () => {
            this.getData();
        })
    }

    // 组件挂载完毕
    componentDidMount() {

    }

    render() {
        let { list, seasons, hasMore } = this.state;
        const page = <div className="ExhibitionPage">
            <div onClick={this.refresh} >刷新</div>
            {
                list.map((item, i) => <div key={item.id}>
                    <div>{item.name}</div>
                    <div>{seasons[item.season - 1]}</div>
                </div>)
            }
            {hasMore?<div onClick={this.getMore} >加载更多</div>:<div>没有更多了</div>}
        </div>;
        return <PageContainer page={page}  noBack={true} />
    }
}