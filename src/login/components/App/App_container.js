import { connect } from "react-redux";

import i18n from "../../../i18n-messages";
import App from "./App";


const mapStateToProps = (state, props) => {
  return {
    //is_fetching: state.config.is_fetching,
  };
};

const AppContainer = connect(
  mapStateToProps,
)(App);

export default i18n(AppContainer);
