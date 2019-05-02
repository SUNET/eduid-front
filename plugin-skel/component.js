import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import i18n from "i18n-messages";
import { appFetching, postAction } from "actions/ActionWrapper";
import ActionWrapperContainer from "containers/ActionWrapper";

import "./style.scss";

class Main extends Component {
  render() {
    return (
      <ActionWrapperContainer>// UI for the action</ActionWrapperContainer>
    );
  }
}

Main.propTypes = {};

const mapStateToProps = (state, props) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default i18n(MainContainer);
