
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sign } from 'u2f-api';

import i18n from 'i18n-messages';
import { appFetching, postAction } from "actions/ActionWrapper";
import ActionWrapperContainer from "containers/ActionWrapper";

import './style.scss';

const img = require('../../img/computer_animation.gif');

class Main extends Component {

    componentDidUpdate () {
        this.props.signU2FData.bind(this)();
    }

    render () {
        let button = '';
        if (this.props.testing) {
            button = (<div id="tou-form-buttons" className="form-group">
                         <div className="input-group">
                             <div className="col-xs-12 col-sm-6">
                                 <input className="btn btn-success" type="submit" name="accept" id="accept"
                                        value={this.props.l10n('mfa.fake-authn')} />
                             </div>
                         </div>
                     </div>);
        }

        return (
            <ActionWrapperContainer>
              <div className="col-xs-12 text-center">
                <div className="u2f-title">
                  <h2>{this.props.l10n('mfa.two-factor-authn')} </h2>
                </div>
                <div className="u2f-subtitle">
                  <h3>{this.props.l10n('mfa.extra-security-enabled')}</h3>
                </div>
                <div className="key-animation">
                </div>
                <div>
                  <p className="lead u2f-text"><strong>{this.props.l10n('mfa.login-tapit')}</strong></p>
                </div>
                <div>
                  <form method="POST" action="#" id="form" className="form-inline">
                     {button}
                     <input type="hidden" name="tokenResponse" id="tokenResponse"/>
                  </form>
                </div>
              </div>
              <span className="dataholder" id="u2f-data" data-u2fdata={this.props.u2fdata}></span>
            </ActionWrapperContainer>
        );
    }
}

Main.propTypes = {
    testing: PropTypes.bool,
    u2fdata: PropTypes.string,
    l10n: PropTypes.func,
    signU2FData: PropTypes.func
}

const mapStateToProps = (state, props) => {
    return {
        testing: state.main.testing,
        u2fdata: state.main.u2fdata
    }
};

export const U2FDATA_SIGNED = "U2FDATA_SIGNED";

const u2fSigned = (data) => ({
    type: U2FDATA_SIGNED,
    payload: {
        data: data
    }
});

const mapDispatchToProps = (dispatch, props) => {
    return {
        signU2FData: function () {
            let u2fdata = this.props.u2fdata;
            if (u2fdata) {
                u2fdata = JSON.parse(u2fdata);
                console.log("sign: ", u2fdata);
                sign(u2fdata, 5000)
                .then( (data) => {
                    dispatch(u2fSigned(data));
                });
            } else {
                console.log("U2F data not available yet");
            }
        }
    }
};

const MainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

export default i18n(MainContainer);

