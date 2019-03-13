/**
 * Created by YuQian on 3/13/2019.
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class PackItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            types: ['App', '微信', '企业微信', '钉钉版', '内嵌版', 'PC版']
        }
    }

    render() {

        let {data} = this.props;
        const {types} = this.state;
        return <div className="PackItemComponent">
            <h2>[{types[data.type - 1]}]&nbsp;&nbsp;{data.title}</h2>
            <div>
                {
                    data.tenants.map(
                        tenant => <div className="app" key={tenant._id}>
                            <img src={tenant.icon?tenant.icon:'http://exe.moyufed.com/1545874424004.png' + '?imageView2/5/w/40/h/40'} alt={tenant.appName}/>
                            <p className="app-name">{tenant.appName}</p>
                        </div>
                    )
                }
            </div>

        </div>
    }
};

// 定义PropTypes
PackItemComponent.propTypes = {
    data: PropTypes.object.isRequired
};