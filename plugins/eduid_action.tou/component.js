import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import i18n from "../../src/login/translation/InjectIntl_HOC_factory";
//import { appFetching, postAction } from "actions/ActionWrapper";
import { postAction } from "actions/ActionMain";
import ActionMainContainer from "containers/ActionMain";
import HeaderContainer from "containers/HeaderAnon";
import FooterContainer from "containers/Footer";

import EduIDButton from "components/EduIDButton";
import { eduidNotify } from "actions/Notifications";

import "./style.scss";

class Main extends Component {
  render() {
    return (
      <ActionMainContainer>
        <p key="0" className="heading">
          {this.props.translate("tou.header")}
        </p>
        <div
          // className="card-body"
          id="eduid-tou"
          dangerouslySetInnerHTML={{
            __html: this.props.tous[this.props.lang],
          }}
        />
        <div id="tou-buttons">
          <EduIDButton
            className="settings-button tou-button"
            onClick={this.props.acceptTOU}
            id="accept-tou-button"
          >
            {this.props.translate("tou.accept")}
          </EduIDButton>
          {/* <EduIDButton
            className="modal-button cancel-button"
            onClick={this.props.rejectTOU}
            id="reject-tou-button"
          >
            {this.props.translate("tou.cancel")}
          </EduIDButton> */}
        </div>
      </ActionMainContainer>
    );
  }
}

Main.propTypes = {
  tous: PropTypes.object,
  lang: PropTypes.string,
  acceptTOU: PropTypes.func,
};

const mapStateToProps = (state, props) => {
  return {
    tous: state.plugin.tous,
    lang: state.intl.locale,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    acceptTOU: function (e) {
      e.preventDefault();
      //dispatch(appFetching());
      dispatch(postAction());
    },
    rejectTOU: function (e) {
      e.preventDefault();
      dispatch(eduidNotify("tou.must-accept", "errors"));
    },
  };
};

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);

export default i18n(MainContainer);
