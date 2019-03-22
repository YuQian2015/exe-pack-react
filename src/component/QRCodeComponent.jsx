/**
 * Created by YuQian on 3/21/2019.
 */
import React from 'react';
import $ from 'jquery';



export default class QRCodeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: '',
            userImage: ''
        };
        this.startLoginTimer = this.startLoginTimer.bind(this);
    }

    // 组件将要加载
    componentWillMount() {
        this.getAppId();
    }


    getAppId() {
        $.ajax({
            timeout: 5000,
            // url: `https://sso.exexm.com/qrlogin.ashx?t=apply`,
            url: `https://t-sso.exexm.com/qrlogin.ashx?t=apply`,
            method: 'GET',
            data: JSON.stringify({}),
            contentType: "application/json",
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept-Language", 'zh-CN');
            },
            success:  (result, status, req) => {
                if (result && result.success) {
                    this.setState({
                        // src: `https://sso.exexm.com/qrlogin.ashx?t=img&qrApplyId=${res.qrApplyId}`
                        src: `https://t-sso.exexm.com/qrlogin.ashx?t=img&qrApplyId=${result.qrApplyId}`
                    });
                    this.startLoginTimer(result.qrApplyId);
                }
            },
            error: function (req, error) {
                alert(error.msg)
            }

        });
    }

    _longPolling(url, data, onsuccess, onerror) {
        const timeout = 5000; //毫秒
        let t_start = 0;

        const _schedule = () => {
            const t_now = (new Date()).getTime();
            const delta = t_now - t_start;
            if (delta > timeout) {
                _run();
            }
            else {
                window.timeoutHander = setTimeout(_run, delta);
            }
        };


        const _run = () => {
            t_start = (new Date()).getTime();
            $.ajax({
                timeout: timeout,
                url: url,
                method: 'POST',
                data: JSON.stringify(data),
                contentType: "multipart/form-data",
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Accept-Language", 'zh-CN');
                },
                success: function (result, status, req) {
                    if(result && result.code === 201) {
                        //重新连接
                        _schedule();
                    }
                    else {
                        if (onsuccess) {
                            onsuccess(result);
                        }
                    }

                },
                error: function (req, error) {
                    console.log('_longPolling error:' + JSON.stringify(error));
                    if (error === 'timeout') {
                        _schedule();
                    }
                    else {
                        if (onerror) {
                            onerror(req, error);
                        }
                    }
                }

            });
        };
        _schedule();
    };

    startLoginTimer(qrApplyId) {
        this._longPolling(
            // `https://sso.exexm.com/qrlogin.ashx?t=listen&v=2&qrApplyId=${qrApplyId}`,
            `https://t-sso.exexm.com/qrlogin.ashx?t=listen&v=2&qrApplyId=${qrApplyId}`,
            {qrApplyId: qrApplyId, version: 2},
             data => {
                if (data && data.success) {
                    if (data.code === 200) {
                        this.props.onLogin(data);
                    }
                    if (data.code === 202) {
                        // 已经扫描，等待App确认登录
                        this.setState({
                            userImage: data.photoUrl
                        });
                        if(!this.props.close) {
                            this.startLoginTimer(qrApplyId);
                        }
                    }
                }
            },
            function (e) {
                alert(e);
            });
    }

    render() {
        const { src, userImage } = this.state;
        return <div className="QRCodeComponent">
            <div className="img-container">
                <img src={src} alt="二维码"/>
                {
                    userImage?<img src={userImage} alt="用户头像" />:null
                }
            </div>
            <div className="text">
                扫描左侧二维码<br />完成用户验证
            </div>

        </div>
    }
}
