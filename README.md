# React+Webpack+Onsen UI 搭建前端项目
[TOC]



### 1.环境准备

- 安装高版本的nodejs
- 良好的网络环境

### 2.搭建步骤

#### 2.1创建项目

创建一个文件夹，并且在命令行进入这个文件夹，执行以下命令创建项目，这个命令会生成一个 `package.json` 文件到项目根目录。

```shell
npm init -y
```

由于使用 `react` + `webpack` 开发，这里毫不犹豫的安装以下依赖：

```shell
npm install webpack@2.6.1 --save-dev
npm install webpack-dev-server@2.11.2 --save-dev
npm install react react-dom --save
```

#### 2.2配置入口文件

在项目根目录新建 `webpack.config.js` ，`app.js` 两个文件。

webpack.config.js 添加以下代码，目的是为了配置js入口，以及输出目录和输出文件名。

```js
const path = require('path');

module.exports = {
    entry: [// 'webpack/hot/dev-server',
        // 'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname, 'app.js')],
    output: {
        path: path.resolve(__dirname, 'build'),
        // publicPath: '/assets/', //表示资源的发布地址，当配置过该属性后，打包文件中所有通过相对路径引用的资源都会被配置的路径所替换。
        filename: 'bundle.js'
    },
};
```

为了验证上面的代码是否生效，我们在package.json文件里面添加两个脚本。

如下：

```json
{
  "name": "react",
  "version": "1.0.0",
  "description": "react 练习",
  "main": "index.js",
  "scripts": {
    "start": "webpack-dev-server --devtool eval --progress --colors --hot --content-base build --open",
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.26.1",
    "webpack-cli": "^3.1.2",
    "webpack-dev-server": "^3.1.10"
  },
  "dependencies": {
    "react": "^16.6.3"
  }
}
```

`npm start` 启动开发，`npm run build` 编译出需要部署的文件。

#### 2.3引入js文件

执行build之后会发现在build目录下生成一个了js，我们需要一个html来引入这个js。因此，执行下面的命令，安装插件：

`npm install html-webpack-plugin --save-dev`

安装完成之后，需要在项目根目录新建一个模板文件index.ejs，代码如下：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8"/>
    <!--width - 可视区域的宽度，值可为数字或关键词device-width -->
    <!--height - viewport的高度-->
    <!--initial-scale - 初始的缩放比例-->
    <!--minimum-scale - 允许用户缩放到的最小比例-->
    <!--maximum-scale - 允许用户缩放到的最大比例-->
    <!--user-scalable - 用户是否可以手动缩放-->
    <meta name = "viewport" content = "width = device-width, initial-scale = 1.0, maximum-scale = 1.0, user-scalable = 0" />
    <!--content="telephone=yes" 在iPhone 手机上默认值是（电话号码显示为拨号的超链接）：-->
    <!--可将telephone=no，则手机号码不被显示为拨号链接-->
    <!--使设备浏览网页时对数字不启用电话功能（不同设备解释不同，itouch点击数字为存入联系人，iphone为拨打电话），忽略将页面中的数字识别为电话号码。-->
    <meta name="format-detection" content="telephone=no" />
    <!--忽略识别邮箱-->
    <meta name="format-detection" content="email=no" />
    <!--网站开启对 web app 程序的支持-->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <!--在 web app 应用下状态条（屏幕顶部条）的颜色；(改变顶部状态条的颜色)-->
    <!--默认值为 default（白色），可以定为 black（黑色）和 black-translucent（灰色半透明）；-->
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <!--http-equiv="Content-Type" 表示描述文档类型-->
    <!--HTTP-EQUIV类似于HTTP的头部协议，它回应给浏览器一些有用的信息，以帮助正确和精确地显示网页内容-->
    <meta http-equiv="Content-Type" content="text/html">
    <!-- UC默认竖屏 ，UC强制全屏 -->
    <meta name="full-screen" content="yes">
    <!--使用了application这种应用模式后，页面讲默认全屏，禁止长按菜单，禁止收拾，标准排版，以及强制图片显示。-->
    <!--应用模式-->
    <meta name="browsermode" content="application">
    <!-- QQ强制竖屏 QQ强制全屏 -->
    <!--设置屏幕方向-->
    <meta name="x5-orientation" content="portrait">
    <!--设置全屏-->
    <meta name="x5-fullscreen" content="true">
    <!--设置屏幕模式-->
    <meta name="x5-page-mode" content="app">
    <!-- windows phone 点击无高光 -->
    <meta name="msapplication-tap-highlight" content="no">
  </head>
  <body>
    <div id="app"></div>
    <title><%= htmlWebpackPlugin.options.title %></title>
    <!-- <script src="http://localhost:8080/webpack-dev-server.js"></script> -->
    <!-- <script src="bundle.js"></script> -->
  </body>
</html>

```

接下来，继续配置webpack，让这个模板生效。代码如下：

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [// 'webpack/hot/dev-server',
        // 'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname, 'app.js')],
    output: {
        path: path.resolve(__dirname, 'build'),
        // publicPath: '/assets/', //表示资源的发布地址，当配置过该属性后，打包文件中所有通过相对路径引用的资源都会被配置的路径所替换。
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin(
        {
            title: '测试',
            template: 'index.ejs',
            // favicon:'./src/img/favicon.ico',
            minify: {
                // removeAttributeQuotes: true,
                // collapseWhitespace: true,
                removeComments:true,
                preserveLineBreaks: false
            }
        })
    ]
};

```

现在可以再次执行 `npm start` ，执行完毕之后即可看到html页面了。这个html页面会引入webpack打包生成的js文件，执行 `npm run build` , 可以在项目的build目录下面看到所有编译出来的文件了。



#### 2.4安装babel支持ES6

首先安装babel

```shell
npm install babel-core babel-loader babel-plugin-transform-decorators-legacy babel-polyfill babel-preset-es2015 babel-preset-react babel-preset-stage-3 --save-dev
```

以本机为例，安装下来之后的版本在package.json中查看：

```js

    "babel-core": "^6.26.3",
    "babel-loader": "^7.0.0",
    "babel-plugin-transform-decorators-legacy": "^1.3.5",
    "babel-polyfill": "^6.26.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-3": "^6.24.1",
```

配置方法：

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const node_modules = path.resolve(__dirname, 'node_modules');
const pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');


module.exports = {
    entry: [// 'webpack/hot/dev-server',
        // 'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname, 'app.js')],
    output: {
        path: path.resolve(__dirname, 'build'),
        // publicPath: '/assets/', //表示资源的发布地址，当配置过该属性后，打包文件中所有通过相对路径引用的资源都会被配置的路径所替换。
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/, // 匹配'js' or 'jsx' 后缀的文件类型
                exclude: /(node_modules|bower_components)/, // 排除某些文件
                loader: 'babel-loader', // 使用'babel-loader'
                query: { // 参数
                    "presets": ["es2015", "react", "stage-3"]
                }
            }
        ],
        noParse: [pathToReact]
    },
    plugins: [
        new HtmlWebpackPlugin(
        {
            title: '测试',
            template: 'index.ejs',
            // favicon:'./src/img/favicon.ico',
            minify: {
                // removeAttributeQuotes: true,
                // collapseWhitespace: true,
                removeComments:true,
                preserveLineBreaks: false
            }
        })
    ]
};

```

接下来需要写一个页面来测试。

在src目录下新建一个App.jsx，写一个测试的页面：

```jsx
import React from 'react';

export default class App extends React.Component {
    render() {
        return (<div>
            hello world！
        </div>)
    }
}
```

在根目录的app.js里面引入：

```js
import React from 'react';
import ReactDOM from 'react-dom';

import App from './src/App.jsx';
ReactDOM.render(<App />, document.getElementById('app'));
```

执行`npm start` 可以预览。



#### 2.5完成所有loader安装

首先先介绍以下常用loader：

- css-loader style-loader安装之后可以使用css文件
- file-loader安装之后可以使用字体、多媒体等等文件
- url-loader安装之后可以使用图片文件
- less-loader安装之后可以使用less文件

```shell
npm install css-loader style-loader file-loader less-loader url-loader less --save-dev
```

**由于使用了less, css等，希望在编译时抽离出单独的css文件，也需要压缩css文件。需要安装 `extract-text-webpack-plugin` 插件**

```shell
npm install extract-text-webpack-plugin@2.1.2 --save-dev
```

在webpack的配置文件：

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const node_modules = path.resolve(__dirname, 'node_modules');
const pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');


module.exports = {
    entry: [// 'webpack/hot/dev-server',
        // 'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname, 'app.js')],
    output: {
        path: path.resolve(__dirname, 'build'),
        // publicPath: '/assets/', //表示资源的发布地址，当配置过该属性后，打包文件中所有通过相对路径引用的资源都会被配置的路径所替换。
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/, // 匹配'js' or 'jsx' 后缀的文件类型
                exclude: /(node_modules|bower_components)/, // 排除某些文件
                loader: 'babel-loader', // 使用'babel-loader'
                query: { // 参数
                    "presets": ["es2015", "react", "stage-3"]
                }
            }, {
                test: /\.css$/, // Only .css files
                use: ['style-loader', 'css-loader'] // Run both loaders 后者是为了遍历你的css。前者是为了进行style标记生成。
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    // use:指需要什么样的loader去编译文件,这里由于源文件是.css所以选择css-loader
                    // fallback:编译后用什么loader来提取css文件
                    // publicfile:用来覆盖项目publicPath,生成该css文件的文件路径
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
                //[
                // {
                //   loader: "style-loader" // creates style nodes from JS strings
                // }, {
                //   loader: "css-loader" // translates CSS into CommonJS
                // }, {
                //   loader: "less-loader" // compiles Less to CSS
                // }

                // "style-loader","css-loader","less-loader"
                //]
            }, {
                test: /\.(png|jpg)$/,
                // loader: 'url-loader?limit=1000&name=images/[path][name].[ext]'
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]',
                            // publicPath: '',
                            outputPath: 'images/',
                            limit: 1000,
                        },
                    }
                ]
            }, {
                test: /\.(mp3|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            // publicPath: '',
                            outputPath: 'assest/',
                        },
                    }
                ]
                // loader: 'file-loader'
            }
        ],
        noParse: [pathToReact]
    },
    plugins: [
        new HtmlWebpackPlugin(
        {
            title: '测试',
            template: 'index.ejs',
            // favicon:'./src/img/favicon.ico',
            minify: {
                // removeAttributeQuotes: true,
                // collapseWhitespace: true,
                removeComments:true,
                preserveLineBreaks: false
            }
        }),
        new ExtractTextPlugin("styles.css")
    ]
};

```



#### 2.6加入Onsen UI

首先还是安装命令

```shell
npm install onsenui react-onsenui --save
```

在根目录的app.js引入这个UI库的样式，并且新建自己的样式表文件src/style/main.less：

```js
import React from 'react';
import ReactDOM from 'react-dom';

import './src/style/main.less'; // 自己写的样式的文件入口，在对应页面位置新建
// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import App from './src/App.jsx';
ReactDOM.render(<App />, document.getElementById('app'));
```

修改App.jsx查看UI库是否能够使用：

```jsx
import React from 'react';
import { Page, Button } from 'react-onsenui'; // 只引入需要的onsenui组件
export default class App extends React.Component {
    render() {
        return (
            <Page><Button>Tap me!</Button>
            </Page>
        )
    }
}
```

`npm start` 查看效果。



### 3.开发阶段

#### 3.1安装react-router和local-db

- react-router 使不同的访问地址映射到不同的页面逻辑
- local-db 基于浏览器的localstorage来实现相对永久的储存

首先还是执行命令安装react-router和local-db：

```shell
npm install react-router-dom local-db --save
```

#### 3.2新建一个页面容器

下面将要演示一个页面容器的编写，关键点都有注释，新建一个页面，路径是container/PageContainer.jsx，为了兼顾使用之前添加进来的UI库，代码如下：

```jsx
import React from 'react';
import {withRouter} from "react-router-dom"; // 用这个方法来包裹组件，可以控制路由的跳转

import LocalDB from 'local-db';
const userCollection = new LocalDB('user'); // 需要使用本地存储时，这里存储的是user

import { Page } from 'react-onsenui'; // 使用onsenui的Page组件来做个每个页面的容器

class PageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // 组件将要加载
    componentWillMount() {
        const user = userCollection.query({}); // 读取本地存储的内容
        if (user.length == 0) {
            this.props.history.replace("/sign-in"); // 如果没有用户信息就跳转到登录页
            console.log('登录失效，退回登录页面');
        }
    }

    // 组件挂载完毕
    componentDidMount() {
    }

    render() {
        let { page } = this.props; // 这里取到传递给这个容器的page属性
        return <Page className="PageContainer">{page?page:null}</Page>
    }
}


export default withRouter(PageContainer);
```

现在新增一个登录页面：page/SignInPage.jsx，这个页面会引入上面新建的容器，并且把编写的页面放入容器之中。代码如下：

```jsx
import React from 'react';

import PageContainer from '../container/PageContainer.jsx'; // 引入页面的容器

export default class SignInPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentWillMount() {}


    // 下面的代码将一个页面写出来，并且在return的时候，使用page属性传递给页面容器
    render() {
        const page = (<div className="SignInPage">
                        <div className="login-tab">导出容器包裹和包裹的页面</div>
                    </div>);
        return <PageContainer page={page} /> 
    }
};
```

改造App.jsx，使用react-router来实现页面路由，可以参考注释，代码如下：

```jsx
import React from 'react';

import {HashRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

// 约定页面以**Page.jsx的方式命名，并且首字母大写，驼峰形式
import SignInPage from './page/SignInPage.jsx';

// 使用path="/" 指定要匹配的路径 component指定路径对应的组件，下面就是指定了/sign-in为登录组件，为直接访问/路径会重定向到/sign-in

export default class App extends React.Component {
    render() {
        return (<Router>
            <Switch>
                <Route exact path="/" render={() => (<Redirect to="/sign-in"/>)}/>
                <Route exact path="/sign-in" component={SignInPage}/>
            </Switch>
        </Router>)
    }
}
```

#### 3.3现在来开始做一个登录页面

需要用的组件可以在链接里面找到：

- https://onsen.io/v2/api/react/Page.html
- https://onsen.io/theme-roller/

在根路径新建一个util目录，并且新建一个Config.jsx，在这个文件里面放的是调用的接口服务器配置：

```js
export const CONFIG = {
    //"apiUrl": "http://r1w9493829.51mypc.cn/rest-api"
    "apiUrl": "http://192.168.100.12:8080/rest-api"
};
```

然后创建发送HTTP请求的service，在src目录新建一个service目录，并在里面新建一个HttpService.jsx，代码如下：

```js

import LocalDB from 'local-db';
const userCollection = new LocalDB('user');

// 发送请求的service，主要创建了get和post两个请求的方法，分别创建XMLHttpRequest来发送请求，并且对请求的响应做处理。

class HttpService {
    Authorization: "";
    constructor() {
        this.getUserToekn();
    }

    getUserToekn() {
        const user = userCollection.query({});
        if (user.length) {
            this.Authorization = user[0].token;
        }
    }

    getQueryString(params) {
        let query = [];
        for (let key in params) {
            query.push(key + "=" + params[key]);
        }
        return query.join("&");
    }

    get(url, params) {
        this.getUserToekn();
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            const query = this.getQueryString(params);
            if (query) {
                url += "?" + query;
            }
            request.open("GET", url, true);
            request.withCredentials = true;
            if (this.Authorization) {
                request.setRequestHeader("Authorization", this.Authorization);
            }
            request.send();
            request.onreadystatechange = () => {
                if (request.readyState == 4) {
                    const status = request.status;
                    if (status >= 200 && status < 300) {
                        try {
                            const res = JSON.parse(request.responseText);
                            this.Authorization = request.getResponseHeader("Authorization");
                            if(this.Authorization) {
                                userCollection.drop();
                                userCollection.insert({
                                    time: new Date().getTime(),
                                    token: this.Authorization
                                });
                            }
                            resolve(res);
                        } catch (e) {
                            console.error(e);
                        }
                        return
                    }
                    if (status == 403) {
                        window.location.replace("#/sign-in");
                        userCollection.drop();
                        reject()
                        return
                    }
                    if (status == 400) {
                        console.log();
                        reject(error)
                    }
                }
            };
        });
    }

    post(url, params) {

        this.getUserToekn();
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.onreadystatechange = () => {
                if (request.readyState == 4) {
                    const status = request.status;
                    if (status >= 200 && status < 300) {
                        const res = JSON.parse(request.responseText);
                        this.Authorization = request.getResponseHeader("Authorization");
                        if(this.Authorization) {
                            userCollection.drop();
                            userCollection.insert({
                                time: new Date().getTime(),
                                token: this.Authorization
                            });
                        }
                        resolve(res);
                        return
                    }
                    if (status == 403) {
                        window.location.replace("#/sign-in");
                        userCollection.drop();
                        reject();
                        return
                    }
                    if (status == 400) {
                        reject();
                        console.log(error);
                    }
                }
            };
            request.open("POST", url, true);
            //request.withCredentials = true;
            request.setRequestHeader("Content-Type", "application/json");
            if (this.Authorization) {
                request.setRequestHeader("Authorization", this.Authorization);
            }

            request.send(JSON.stringify(params));
        });
    }
}

let HTTP = new HttpService();

export default HTTP
```

再新建一个UserService.jsx文件，里面的代码如下：

```js
import HttpService from './HttpService.jsx';
import {CONFIG} from '../util/Config.jsx';

class UserService {
    constructor() {}
    // 登录
    signIn(params) {
        return HttpService.post(`${CONFIG.apiUrl}/account/login.html`, params);
    }

    // 查询列表
    findExhibitionList(params) {
        return HttpService.post(`${CONFIG.apiUrl}/account/findExhibitionList.html`, params);
    }
}

const User = new UserService();
export default User;
```

接着来修改登录页面，实现登录功能，page/SignInPage.jsx代码如下

```jsx
import React from 'react';

import PageContainer from '../container/PageContainer.jsx'; // 引入页面的容器

import { Button, Segment } from 'react-onsenui'; // 引入UI库的Button组件


import UserService from '../service/UserService.jsx'; // 引入service

export default class SignInPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // 只要这个对象里面的属性变了，页面就会渲染更新 使用this.setState可以改变这里面的值
            tel: '',
            password: '',
            loginName: '',
            smsCode: '',
            loginType: 1 // 1手机号验证码 2账号密码
        };
        this.changeType = this.changeType.bind(this); // 绑定上下文，好让changeType里面可以使用this,比如使用this.setState
        this.doSignIn = this.doSignIn.bind(this);
    }
    componentWillMount() {}

    changeType(type) {
        this.setState({
            loginType: type
        })
    }
    doSignIn() {
        const { loginName, password } = this.state;
        UserService.signIn({ loginName, password }).then(res => {
            if(res && res.success) {
                alert('成功');
            } else {
                alert(res.message);
            }
        }).catch(error => {
            alert('请求失败')
        })
    }
    render() {
        const { loginType } = this.state;
        const page = (<div className="SignInPage">
            <Segment>
                <button onClick={() => {this.changeType(1)}}>手机登录</button>
                <button onClick={() => {this.changeType(2)}}>账号登录</button>
            </Segment>
            {
                loginType == 1 ?<div>
                    <input onChange={event => this.setState({tel: event.target.value})} placeholder="输入手机号" type="tel" />
                    <input onChange={event => this.setState({smsCode: event.target.value})} placeholder="输入验证码" type="password" />
                    <div>验证码</div>
                </div>:
                    <div>
                        <input onChange={event => this.setState({loginName: event.target.value})} placeholder="输入账号" type="text" />
                        <input onChange={event => this.setState({password: event.target.value})} placeholder="输入密码" type="password" />
                    </div>
            }
            <Button modifier="large--cta" onClick={this.doSignIn}>
                登录
            </Button>
        </div>);
        return <PageContainer page={page} />
    }
};
```

现在可以尝试登录了。

#### 3.4样式编写

在src/style/main.less文件中引入需要的样式：

```less

// util
@import "./util/Variable.less";

// pages
@import "./page/SignInPage.less";
```

建立对应的文件，如下;

src/style/util/Variable.less

```less

@color-common: #52a7f1; // 通常颜色
@color-secondary: #CCC;

// 主题颜色
// @color-title-bg:       #CDB284;
@color-title-bg:       #66B3FF;
@color-text-bg:        #EFF1E1;
@color-normal-bg:      #EDF5F2;
@color-line:           #DCE3EC;
@color-dark-line:      #947361;
@color-shadow:         #D3CEDD;
@color-element:        #CD939D;
@color-text-dark:      #7b2e55;

// icon颜色
@color-green:          #4fc195;
@color-green-dark:     #207245;
@color-red:            #ff2e2e;


@color-title-text:     #FFFFFF;






@color-white: #ffffff; // 按钮背景纯白色
@color-light: #f7f7f7; // 背景淡灰色
@color-gray: #dedede; // 边框浅灰色
@color-dark: #989898; // 文字浅灰色
@color-darker: #656565; // 文字深灰色
@color-darkest: #282828; // 文字黑色
@color-black: #000000;

@font-mini: 1rem;
@font-smaller: 1.2rem;
@font-small: 1.3rem;
@font-normal: 1.4rem;
@font-big: 1.5rem;
@font-bigger: 1.6rem;
@font-large: 1.7rem;

@images: "../../assest/images";

```

src/style/util/SignInPage.less

```less
.SignInPage {
  .input-filed {
    height: 2.4rem;
    border: none;
    padding: .2rem 1rem;
    display: block;
    width: 100%;
    border-bottom: solid 0.1rem @color-line;
  }
  .input-container {
    display: flex;
    display: -webkit-flex;
    .input-filed {
      flex: 1;
      -webkit-flex: 1;
    }
    .input-ft {
      line-height: 2.4rem;
      border: none;
      padding: .2rem 1rem;
      background: @color-red;
      color: @color-white;
    }
  }
  .sign-in-form {
    padding-top: 8rem;
    text-align: center;
    .input-box {
      margin-bottom: 1rem;
    }
    .segment {
      margin-bottom: 1rem;
    }
  }
}
```

我们可以启动页面查看对应的样式效果了。

#### 3.5MD5加密

使用crypto-js来对密码进行md5加密传输，首先安装crypto-js：

```shell
npm install crypto-js -save
```

 然后在登录页引用，修改登录页代码：

```jsx
import React from 'react';

import PageContainer from '../container/PageContainer.jsx'; // 引入页面的容器

import MD5 from "crypto-js/md5"; // 引入md5加密

import { Button, Segment } from 'react-onsenui'; // 引入UI库的Button组件


import UserService from '../service/UserService.jsx'; // 引入service

export default class SignInPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // 只要这个对象里面的属性变了，页面就会渲染更新 使用this.setState可以改变这里面的值
            tel: '',
            password: '',
            loginName: '',
            smsCode: '',
            loginType: 1 // 1手机号验证码 2账号密码
        };
        this.changeType = this.changeType.bind(this); // 绑定上下文，好让changeType里面可以使用this,比如使用this.setState
        this.doSignIn = this.doSignIn.bind(this);
    }
    componentWillMount() {}

    changeType(type) {
        this.setState({
            loginType: type
        })


    }
    doSignIn() {
        let { loginName, password } = this.state;
        password = MD5(password).toString(); // md5加密
        UserService.signIn({ loginName, password }).then(res => {
            if(res && res.success) {
                this.props.history.replace("/exhibition");
            } else {
                alert(res.message);
            }
        }).catch(error => {
            alert('请求失败')
        })
    }
    render() {
        const { loginType } = this.state;
        const page = (<div className="SignInPage">
            <div className="sign-in-form">
                <Segment>
                    <button onClick={() => {this.changeType(1)}}>手机登录</button>
                    <button onClick={() => {this.changeType(2)}}>账号登录</button>
                </Segment>
                {
                    loginType == 1
                        ?<div className="input-box">
                            <div className="input-container">
                                <input className="input-filed" onChange={event => this.setState({tel: event.target.value})} placeholder="输入手机号" type="tel" />
                                <div  className="input-ft">验证码</div>
                            </div>
                            <div className="input-container">
                                <input className="input-filed" onChange={event => this.setState({smsCode: event.target.value})} placeholder="输入验证码" type="password" />
                            </div>
                        </div>:
                        <div className="input-box">
                            <div className="input-container">
                                <input className="input-filed" onChange={event => this.setState({loginName: event.target.value})} placeholder="输入账号" type="text" />
                            </div>
                            <div className="input-container">
                                <input className="input-filed" onChange={event => this.setState({password: event.target.value})} placeholder="输入密码" type="password" />
                            </div>
                        </div>
                }
                <Button modifier="large--cta" onClick={this.doSignIn}>
                    登录
                </Button>
            </div>
        </div>);
        return <PageContainer page={page} noBack={true} noHeader={true} />
    }
};

```

#### 3.6页面跳转和页面逻辑处理实例

我们发现上面的登录页面使用了`this.props.history.replace("/exhibition");` 目的是为了在登录成功之后跳转到一个新的页面。

现在来看这个页面的实现，新建一个页面 page/ExhibitionPage.jsx 来实现一个列表的加载，代码如下：

```jsx
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
```

页面新建好了之后，需要在路由里面引入，所以修改App.jsx：

```jsx
import React from 'react';

import {HashRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

// 约定页面以**Page.jsx的方式命名，并且首字母大写，驼峰形式
import SignInPage from './page/SignInPage.jsx';
import ExhibitionPage from './page/ExhibitionPage.jsx';

export default class App extends React.Component {
    render() {
        return (<Router>
            <Switch>
                <Route exact path="/" render={() => (<Redirect to="/exhibition"/>)}/>
                <Route exact path="/sign-in" component={SignInPage}/>
                <Route exact path="/exhibition" component={ExhibitionPage}/>
            </Switch>
        </Router>)
    }
}
```

# 使用react-intl + React Context API 实现多语言切换

紧接着上一次的实战项目，这次要来完善多语言切换功能，使用 [react-intl](https://github.com/yahoo/react-intl) 来处理国际化，下面开始

### 1.安装 react-intl

```shell
npm install react-intl --save
```

> 先安装react-intl插件；这个库提供了 React 组件和Api两种方式来格式化日期，数字和字符串等。
为了兼容Safari各个版本，可能需要同时安装 intl，`npm install intl --save` ，intl在大部分的『现代』浏览器中是默认自带的，但是Safari和IE11以下的版本就没有了。

### 2.建立多语言文件
在src目录新增一个目录叫i18n，并建立两个文件en_US.js、zh_CN.js，代码如下：

en_US.js
```js
export const en_US = {
    'intl.signin.phone': "phone",
    'intl.signin.account': "account",
    'intl.signin.great': 'welcome to {city}'
};
```

zh_CN.js
```js
export const zh_CN = {
    'intl.signin.phone': "手机登录",
    'intl.signin.account': "账号登录",
    'intl.signin.great': '{city}欢迎你'
};
```

### 3.引入多语言文件
首先，紧接之前的项目，在PageContainer.jsx里面引入语言文件：

```js
// ...
import { Page, BackButton, ToolbarButton, Toolbar, Icon  } from 'react-onsenui';

//react 国际化
import {IntlProvider, addLocaleData} from 'react-intl';
import {zh_CN} from '../i18n/zh_CN'; // 中文
import {en_US} from '../i18n/en_US'; // 英文
import zh from 'react-intl/locale-data/zh';// react-intl语言包
import en from 'react-intl/locale-data/en';// react-intl语言包
addLocaleData([...en, ...zh]); // 需要放入本地数据库

class PageContainer extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {
            language: navigator.language
        };
    }
    // ...
    
    // 选择多语言
    chooseLocale(){
        const language = this.state.language;
        switch(language){
            case 'en-US':
                return en_US;
            case 'zh-CN':
                return zh_CN;
            default:
                return en_US;
        }
    }
    
    // ...
    render() {
        let { page, noBack, noHeader} = this.props;
        let { language } = this.state;
        // ...
        let tool = "";

        return <Page renderToolbar={() => tool} className="PageContainer">
            <IntlProvider locale={language} key={language} messages={this.chooseLocale()}>
                {page?page:null}
            </IntlProvider>
        </Page>
    }
    
}
```

上面的代码中

IntlProvider 有三个配置参数：

- locale, <string>, 语言标记，例如 'zh-CN' 'en-US'
- messages, <object>, 国际化所需的 key-value 对象
- formats, <object>, 自定义 format，比如日期格式、货币等

在定义好 IntlProvider 之后，我们就可以在页面使用它提供的 api 或者组件来进行国际化了。



#### 踩坑备注



**问题**

切换多语言时不能重新加载语言的问题，[FormattedMessage not updating live](https://github.com/yahoo/react-intl/issues/1103)

**解决方案**

 it looks like you need to add a `key` to `IntlProvider` to force an update when locale changes, e.g:

```jsx
<IntlProvider 
        locale={ lang } 
        messages={messages[lang]}
        key={ lang }
      >
```

As a warning, doing so means everything under `IntlProvider` is going to be re-rendered.

If you have time to dig in to solutions to everything getting re-rendered, read through:

[#1106](https://github.com/yahoo/react-intl/issues/1106) 

[#695](https://github.com/yahoo/react-intl/issues/695) 



### 4.使用多语言文件

以登录页举例，src/page/SignInPage.jsx：

```js
// ...

import {FormattedMessage} from 'react-intl'; // 引入FormattedMessage


export default class SignInPage extends React.Component {
    constructor(props) {
        // ...
    }
    componentWillMount() {}

    // ...
    
    render() {
        // ...
        const page = (<div className="SignInPage">
            <div className="sign-in-form">
                <FormattedMessage
                    tagName="p"
                    id='intl.signin.great'
                    description='欢迎'
                    defaultMessage='{city} 欢迎你'
                    values={{
                        city: '厦门'
                    }}
                />
                <Segment>
                    <button onClick={() => {this.changeType(1)}}><FormattedMessage id='intl.signin.phone' /></button>
                    <button onClick={() => {this.changeType(2)}}><FormattedMessage id='intl.signin.account' /></button>
                </Segment>
                
                // ...
            </div>
        </div>);
        return <PageContainer page={page} noBack={true} noHeader={true} />
    }
};
```
上面的代码中
 - id 指代的是这个字符串在配置文件中的属性名
 - description 指的是对于这个位置替代的字符串的描述，便于维护代码，不写的话也不会影响输出的结果
 - defaultMessage 当在locale配置文件中没有找到这个id的时候，输出的默认值
 - tagName 实际生成的标签，默认是 span
 - values 动态参数. 格式为对象

启动项目即可查看效果了。

### 5.Context API——切换语言

为了实现在子组件里面也能切换语言，这里使用了最新的React [Context API](https://reactjs.org/docs/context.html)  来实现。

####5.1创建context

新建一个src/context目录，并且在里面新建一个文件，LangContext.jsx：

```jsx
import React from 'react';
// 创建一个LangContext并且导出
export const LangContext = React.createContext({
    changeLanguage: () => {
    }
});
```

#### 5.2使用context

回过头来修改PageContainer.jsx：

```js
// ...

//react 国际化
import {IntlProvider, addLocaleData} from 'react-intl';
import {zh_CN} from '../i18n/zh_CN'; // 中文
import {en_US} from '../i18n/en_US'; // 英文
import zh from 'react-intl/locale-data/zh';// react-intl语言包
import en from 'react-intl/locale-data/en';// react-intl语言包
addLocaleData([...en, ...zh]); // 需要放入本地数据库

import {LangContext} from '../context/LangContext.jsx'; // 引入LangContext


class PageContainer extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {
            language: navigator.language
        };
    }
    // ...
    
    // 选择多语言
    chooseLocale(){
        const language = this.state.language;
        switch(language){
            case 'en-US':
                return en_US;
            case 'zh-CN':
                return zh_CN;
            default:
                return en_US;
        }
    }
    
    
    // 选择语言
    changeLanguage(language = 'zh-CN') {
        this.setState({
            language
        })
    }
    
    // ...
    render() {
        let { page, noBack, noHeader} = this.props;
        let { language } = this.state;
        // ...
        let tool = "";

        return <Page renderToolbar={() => tool} className="PageContainer">
            <IntlProvider locale={language} key={language} messages={this.chooseLocale()}>
                <LangContext.Provider value={{changeLanguage: this.changeLanguage.bind(this)}}>
                    {page?page:null}
                </LangContext.Provider>
            </IntlProvider>
        </Page>
    }
    
}
```

接着新建一个组件用来修改语言，创建组件的文件夹src/component，并且新建切换语言的组件 LanguageComponent.jsx ：

```jsx
import React from 'react';

import {LangContext} from '../context/LangContext.jsx' // 引入LangContext

export default class LanguageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSelector: false
        };
        this.showLangSelector = this.showLangSelector.bind(this);
    }
    componentWillMount() {}

    // 显示语言选择选项
    showLangSelector() {
        this.setState({
            showSelector: true
        })
    }

    render() {

        const { showSelector } = this.state;

        return <LangContext.Consumer>
            {context => (
                <div>
                    {
                        showSelector
                            ?<div>
                                <div onClick={() => {context.changeLanguage('en-US')}}>英文</div>
                                <div onClick={() => {context.changeLanguage('zh-CN')}}>中文</div>
                            </div>
                            : <div onClick={this.showLangSelector}>
                                切换语言
                            </div>
                    }
                </div>
            )}
        </LangContext.Consumer>

    }
};
```

最后就是在需要使用切换多语言的地方引入组件即可。以注册页面举例：

SignInPage.jsx

```jsx
import React from 'react';

import PageContainer from '../container/PageContainer.jsx'; // 引入页面的容器
// ...

import {FormattedMessage} from 'react-intl';

import LanguageComponent from '../component/LanguageComponent.jsx'; // 引入组件

export default class SignInPage extends React.Component {
    constructor(props) {
        // ...
    }
    // ...
    render() {
        const { loginType } = this.state;
        const page = (<div className="SignInPage">
            <div className="sign-in-form">
                <LanguageComponent />
                <FormattedMessage
                    tagName="p"
                    id='intl.signin.great'
                    description='欢迎'
                    defaultMessage='{city} 欢迎你'
                    values={{
                        city: '厦门'
                    }}
                />
                // ...
            </div>
        </div>);
        return <PageContainer page={page} noBack={true} noHeader={true} />
    }
};

```

OK，现在可以尝试切换多语言了。



### 6.了解更多

关于react-intl 和 Context API 可以参考以下详细资料：

- [react-intl 实现 React 国际化多语言](https://juejin.im/post/59f96d7ef265da430f316997)

- [react-intl-api](https://github.com/yahoo/react-intl/wiki/API#react-intl-api)

- [React Context](https://reactjs.org/docs/context.html)
- [聊一聊我对 React Context 的理解以及应用](https://www.jianshu.com/p/eba2b76b290b)
- [How to update React Context from inside a child component?](https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component)





# 使用redux

### 1.安装

紧接着上一次的实战项目，这次要来完状态管理，使用redux，首先需要安装一些包，执行以下命令安装：

` npm i redux react-redux redux-thunk --save`

redux 和 react并没有太大的关联， react-redux使得redux能和react更好地工作和。redux-thunk是redux的一个中间件，让我们能够直接访问dispatch方法，因此能够在action里面使用异步调用。


### 2.使用Provider

需要讲所有的组件使用react-redux的provider嵌套起来，在App.jsx中引入provider：

```js
import { Provider } from 'react-redux';
```

使用 Provider  封装整个导出的组件，Provider 使用store属性来存储状态，因此给provider传递store，如下：

```jsx
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" render={() => (<Redirect to="/exhibition"/>)}/>
                        <Route exact path="/sign-in" component={SignInPage}/>
                        <Route exact path="/exhibition" component={ExhibitionPage}/>
                    </Switch>
                </Router>
            </Provider>
        )
    }
```

### 3.导出store

接下来需要创建store，首先创建一个store文件夹，src/store，并且在这个目录创建一个store.js

文档 https://github.com/reduxjs/redux/tree/master/docs/api ，先看代码示例，store.js：

```js
// 从redux引入createStore，applyMiddleware，分别用来创建store和使用中间件
import { createStore, applyMiddleware } from 'redux';
// 引入thunk中间件
import thunk from 'redux-thunk';

// 引入根reducer
import rootReducer from '../reducer';

// 创建初始状态
const initialState = {};

// 创建一个中间件的数组
const middleware = [thunk];

// Arguments
// reducer (Function): A reducing function that returns the next state tree, given the current state tree and an action to handle.
//
//     [preloadedState] (any): The initial state. You may optionally specify it to hydrate the state from the server in universal apps, or to restore a previously serialized user session. If you produced reducer with combineReducers, this must be a plain object with the same shape as the keys passed to it. Otherwise, you are free to pass anything that your reducer can understand.
//
//     [enhancer] (Function): The store enhancer. You may optionally specify it to enhance the store with third-party capabilities such as middleware, time travel, persistence, etc. The only store enhancer that ships with Redux is applyMiddleware().
//
// Returns
// (Store): An object that holds the complete state of your app. The only way to change its state is by dispatching actions. You may also subscribe to the changes to its state to update the UI.
const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

// 导出store
export default store;
```

上面的示例已经导出了store，然后在App.jsx引入store：

```js
import { Provider } from 'react-redux';
import store from './store/store';
```

使用createStore(reducer, [preloadedState], [enhancer])创建store， createStore接收三个参数：

- reducer —— 根reducer，可以根据资源创建其他reducer如：postReducer、todoReducer等，然后把这些reducer合并到根reducer并传到store。
- preloadedState——就是初始的state。
- enhancer——扩展，比如使用中间件middleware。

### 3.创建reducer

#### 3.1.创建根reducer

创建一个目录reducer，并且在里面创建一个index.js，然后在上面写的store.js里面把这个reducer引入，

```js
// 导入combineReducers，用来合并reducer
import { combineReducers } from 'redux';

// 从各个reducer文件导入reducer
import animeReducer from './animeReducer';

// 导出reducer 并且为它们都设置一个命名，如：animeReducer命名为anime

export default combineReducers({
    anime: animeReducer
});
```

在rootReducer里面做的事情很简单，就是合并其它的reducer并且把合并的结果导出去。

#### 3.2.创建各个reducer

在创建reducer之前，先来创建type，type内部基本上就是常量，创建一个action目录，src/action，并在里面新建一个文件type.js，代码如下：

```js
// 我们创建的action实际上包含了type，type基本上都是常量。
// 导出定义的action
export const FETCH_ANIME = 'FETCH_ANIME';
```

在reducer目录新建 animeReducer.js

```js
// 从types.js 导入 type
import { FETCH_ANIME } from "../action/type";

// 定义初始state
const initialState = {
    items: [] // 这里的items就代表着从action传来的数据列表，而在cation里面会去获取数据。
};
// 导出一个方法，接收两个参数，第一个就是初始状态，第二个是action，action是一个对象，包含type属性
export default function (state = initialState, action) {
    // 判断action的type，导出state，默认导出初始state
    // 如果type是FETCH_ANIME，则将返回初始state与action返回的的payload的数据
    // payload用来表示返回数据，这些数据会在action里面通过调用dispatch方法返回，关于action会紧接着在后面介绍。
    switch (action.type) {
        case FETCH_ANIME:
            return {
                ... state,
                items: action.payload
            };
        default:
            return state;
    }
}
```

###4.创建action

在src/action目录里面，可以创建action文件，animeAction.js

```js
// 引入type
import { FETCH_ANIME} from "./type";

// 导出一个方法，获取影片
export  function fetchAnime() {
    // 里面再导出一个方法，接收dispatch, dispatch会将获取的数据传到reducer
    return function (dispatch) {
        fetch('https://ghibliapi.herokuapp.com/films')
            .then(res => res.json())
            .then(anime => dispatch({
                type: FETCH_ANIME,
                payload: anime
            }))
    }
}
```

```js
// 简写
export const fetchAnime = () => dispatch => {
    fetch('https://ghibliapi.herokuapp.com/films')
        .then(res => res.json())
        .then(anime => dispatch({
            type: FETCH_ANIME,
            payload: anime
        }))
}
```

每个action都是一个function，react-thunk中间件使得能够直接访问dispatch方法，因此在action里面可以使用异步请求，使用dispatch可以向reducer发送数据。

### 5.在组建中使用

```jsx

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
    // 这里使用的state.anime 是在 reducer/index.js 文件中的 根reducer里面定义的名称。
    anime: state.anime.items
});

export default connect(mapStateToProps, { fetchAnime })(AnimePage);
```





















