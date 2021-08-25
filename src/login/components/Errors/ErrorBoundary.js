import React, { Component, Fragment } from "react";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";
import * as Sentry from "@sentry/react";
import { connect } from "react-redux";

// has to be a class component
class ErrorBoundary extends Component {
  state = {
    error: null,
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // initialise sentry
    Sentry.init({
      dsn: this.props.dsn,
    });
    // send error info to sentry
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);
      Sentry.captureException(error);
    });
  }

  handleReset = () => {
    this.setState({ error: null, hasError: false });
  };

  render() {
    const { hasError, handleError, error } = this.state;
    return (
      <Fragment>
        {hasError && error !== null ? (
          <div id="content" className="horizontal-content-margin">
            <this.props.fallback
              handleError={handleError}
              handleReset={this.handleReset}
              {...this.state}
              {...this.props}
            />
          </div>
        ) : (
          this.props.children
        )}
      </Fragment>
    );
  }
}

// connect class compnonet to redux store
const mapStateToProps = (state) => {
  return {
    // hardcoded mock for etsting in dev
    dsn: "https://c027625f3c9448fdb6c55c55dda3b475@monitor.dev.eduid.se/21",
    // dsn in redux store
    // dsn: state.config.sentry_dsn,
  };
};
const ErrorBoundaryContainer = connect(mapStateToProps)(ErrorBoundary);
export default InjectIntl(ErrorBoundaryContainer);
