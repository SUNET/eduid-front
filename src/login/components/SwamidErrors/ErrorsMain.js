import React, { Component } from "react";
import { createBrowserHistory } from "history";
import Footer from "../Footer/Footer";
import Header from "../../../components/Header";
import NotificationsContainer from "containers/Notifications";
import { Router, Route } from "react-router-dom";
import "../../styles/index.scss";
import i18n from "../../translation/InjectIntl_HOC_factory";
import Errors from "./Errors";

export const history = createBrowserHistory();

class ErrorsMain extends Component {
  render() {
    return [
      <Router key="1" history={history}>
        <Header {...this.props} />
        <section id="panel" className="panel">
          <NotificationsContainer />
          <Route exact path={`/errors`} component={Errors} />
        </section>
        <Footer />
      </Router>,
    ];
  }
}

ErrorsMain.propTypes = {};
export default i18n(ErrorsMain);
