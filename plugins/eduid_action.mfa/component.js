
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import i18n from 'i18n-messages';
import { appFetching, postAction } from "actions/ActionWrapper";
import ActionWrapperContainer from "containers/ActionWrapper";

import './style.scss';


class Main extends Component {

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
              <div className="row col-xs-12 center-block">
                <div className="page-header col-xs-8 col-xs-offset-2">
                  <div className="u2f-title">
                    <h2>{this.props.l10n('mfa.two-factor-authn')} </h2>
                  </div>
                  <div className="u2f-subtitle">
                    <h3>{this.props.l10n('mfa.extra-security-enabled')}</h3>
                  </div>
                  <div>
                    <p className="lead u2f-text"><strong>{this.props.l10n('mfa.login-tapit')}</strong></p>
                  </div>
                </div>
                <form method="POST" action="#" id="form" className="form-inline">
                   {button}
                   <input type="hidden" name="tokenResponse" id="tokenResponse"/>
                </form>
              </div>
              <span className="dataholder" id="u2f-data" data-u2fdata={this.props.u2fdata}></span>
            </ActionWrapperContainer>
        );
    }
}

Main.propTypes = {
    testing: PropTypes.bool,
    u2fdata: PropTypes.string,
    l10n: PropTypes.func
}

const mapStateToProps = (state, props) => {
    return {
        testing: state.main.testing
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
    }
};

const MainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

export default i18n(MainContainer);

