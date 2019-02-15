import React from 'react';

import {HashRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

// 约定页面以**Page.jsx的方式命名，并且首字母大写，驼峰形式
import SignInPage from './page/SignInPage.jsx';
import AnimePage from './page/AnimePage.jsx';
import HomePage from './page/HomePage.jsx';
import AddTenantPage from './page/AddTenantPage.jsx';

import { Provider } from 'react-redux';
import store from './store/store';

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" render={() => (<Redirect to="/home"/>)}/>
                        <Route exact path="/sign-in" component={SignInPage}/>
                        <Route exact path="/add-tenant" component={AddTenantPage}/>
                        <Route exact path="/home" component={HomePage}/>
                        <Route exact path="/anime" component={AnimePage}/>
                    </Switch>
                </Router>
            </Provider>
        )
    }
}
