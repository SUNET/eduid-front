import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import i18n from "../login/translation/InjectIntl_HOC_factory";
import { appFetching, postAction } from "actions/ActionMain";
import ActionMainContainer from "containers/ActionMain";

import "./style.scss";

class Main extends Component {
  render() {
    return (
      <ActionMainContainer>// UI for the action</ActionMainContainer>
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

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);

export default i18n(MainContainer);
