/**
 * Created by YuQian on 2/8/2019.
 */
import React from 'react';
import {Avatar} from 'antd';

import LocalDB from 'local-db';
const userCollection = new LocalDB('user');

export default class UserAvatarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    // 组件将要加载
    componentWillMount() {
        const user = userCollection.query({});
        if (user.length) {
            this.setState({
                user: user[0].user
            })
        }
    }

    // 组件挂载完毕
    componentDidMount() {

    }

    render() {
        const { user } = this.state;
        return <div className="UserAvatarComponent">
            {
                user && user.userId? <Avatar size="large"> {user.name} </Avatar>
                    : <Avatar size="large" icon="user" />
            }
            </div>
    }
}
