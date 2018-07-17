
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import i18n from 'i18n-messages';
import { appFetching, postAction } from "actions/ActionWrapper";
import ActionWrapperContainer from "containers/ActionWrapper";
import EduIDButton from "components/EduIDButton";
import { eduidNotify } from "actions/Notifications";

import './style.scss';


class Main extends Component {

    render () {

        return (
            <ActionWrapperContainer>
              <h2>{this.props.l10n('tou.header')}</h2>
              <div className="row">
                <div className="col-1 col-lg-3"></div>
                <div className="col-10 col-lg-6 card tou-card">
                  <div className="card-body"
                       id="eduid-tou"
                       dangerouslySetInnerHTML={{__html: this.props.tous[this.props.lang]}} />
                </div>
                <div className="col-1 col-lg-3"></div>
              </div>
              <div id="buttons">
                <EduIDButton className="tou-button"
                             onClick={this.props.acceptTOU}
                             id="accept-tou-button">
                  {this.props.l10n('tou.accept')}
                </EduIDButton>
                <EduIDButton className="tou-button btn-danger"
                             onClick={this.props.rejectTOU}
                             id="reject-tou-button">
                  {this.props.l10n('tou.reject')}
                </EduIDButton>
              </div>
            </ActionWrapperContainer>
        );
    }
}

Main.propTypes = {
    tous: PropTypes.object,
    lang: PropTypes.string,
    acceptTOU: PropTypes.func
}

const mapStateToProps = (state, props) => {
    return {
        tous: state.plugin.tous,
        lang: state.intl.locale
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        acceptTOU: function (e) {
            e.preventDefault();
            dispatch(appFetching());
            dispatch(postAction());
        },
        rejectTOU: function (e) {
            e.preventDefault();
            dispatch(eduidNotify('tou.must-accept', 'errors'));
        }
    }
};

const MainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

export default i18n(MainContainer);

