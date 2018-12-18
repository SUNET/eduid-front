
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import i18n from 'i18n-messages';
import { appFetching, postAction, postActionFail } from "actions/ActionWrapper";
import ActionWrapperContainer from "containers/ActionWrapper";

import './style.scss';

const img = require('../../img/computer_animation.gif');

class Main extends Component {

    componentDidUpdate () {
        this.props.getCredentials.bind(this)();
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
                <div className="webauthn-title">
                  <h2>{this.props.l10n('mfa.two-factor-authn')}</h2>
                </div>
                <div className="webauthn-subtitle">
                  <h3>{this.props.l10n('mfa.extra-security-enabled')}</h3>
                </div>
                <div className="key-animation">
                </div>
                <div>
                  <p className="lead webauthn-text"><strong>{this.props.l10n('mfa.login-tapit')}</strong></p>
                </div>
                <div>
                  <form method="POST" action="#" id="form" className="form-inline">
                     {button}
                     <input type="hidden" name="tokenResponse" id="tokenResponse"/>
                  </form>
                </div>
              </div>
            </ActionWrapperContainer>
        );
    }
}

Main.propTypes = {
    webauthn_options: PropTypes.object,
    testing: PropTypes.bool,
    l10n: PropTypes.func,
    getCredentials: PropTypes.func
}

const mapStateToProps = (state, props) => {
    let options = {};
    if (state.main.webauthn_options !== undefined) {
        options = { ... state.main.webauthn_options};
        const challBin = atob(options.publicKey.challenge);
        const challArr = new Uint8Array(challBin.length);
        for (let i = 0; i < challBin.length; i += 1) {
            challArr[i] = challBin.charCodeAt(i);
        }
        options.publicKey = {
            ...options.publicKey,
            challenge: challArr
        };
        const allowCreds = options.publicKey.allowCredentials.map((v) => {
            const idBin = atob(v.id);
            const idArr = new Uint8Array(idBin.length);
            for (let i = 0; i < idBin.length; i += 1) {
                idArr[i] = idBin.charCodeAt(i);
            }
            return {
                ...v,
                id: idArr
            }
        });
        options.publicKey.allowCredentials = allowCreds;
    }
    return {
        webauthn_options: options,
        testing: state.main.testing,
    }
};

export const WEBAUTHN_CREDS_GOT = "WEBAUTHN_CREDS_GOT";

const credentialsGot = (assertion) => ({
    type: WEBAUTHN_CREDS_GOT,
    payload: assertion
});

const mapDispatchToProps = (dispatch, props) => {
    return {
        getCredentials: function () {
            let options = this.props.webauthn_options;
            if (options.publicKey !== undefined) {
                try {
                    navigator.credentials.get(options)
                    .then( (assertion) => {
                        if (assertion !== null && assertion !== undefined) {
                            dispatch(credentialsGot(assertion));
                        }
                    })
                    .catch( (error) => console.log(error) );
                } catch(error) {
                    dispatch(postActionFail(error.toString()));
                }
            } else {
                console.log("Webauthn data not available yet");
            }
        }
    }
};

const MainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

export default i18n(MainContainer);

