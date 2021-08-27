import React, { Component, Fragment } from "react";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";
import * as Sentry from "@sentry/react";
import { connect } from "react-redux";

// has to be a class component
class ErrorBoundary extends Component {
  state = {
    error: null,
    errorInfo: null,
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(errorInfo) {
    this.setState({ errorInfo });
  }

  // HACK: update props until state.config.sentry_dsn is updated
  componentDidUpdate(prevProps) {
    if (this.props.sentry_dsn !== prevProps.sentry_dsn) {
      if (this.props.sentry_dsn !== undefined) {
        // initialise sentry
        Sentry.init({
          dsn: this.props.sentry_dsn,
        });
        // send error info to sentry
        Sentry.withScope((scope) => {
          scope.setExtras(this.state.errorInfo);
          Sentry.captureException(this.state.error);
        });
      }
    }
  }

  handleReset = () => {
    this.setState({ error: null, errorInfo: null, hasError: false });
  };

  render() {
    const { hasError, error, errorInfo } = this.state;
    return (
      <Fragment>
        {hasError && error !== null && errorInfo !== null ? (
          <div id="content" className="horizontal-content-margin">
            <this.props.fallback
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
  let sentry_dsn
  if (state.config.sentry_dsn !== null) {
    sentry_dsn = state.config.sentry_dsn;
  }
  return {
    sentry_dsn: sentry_dsn,
  };
};
const ErrorBoundaryContainer = connect(mapStateToProps)(ErrorBoundary);
export default InjectIntl(ErrorBoundaryContainer);
