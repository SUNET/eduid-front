import React, { Component, Fragment } from "react";
import InjectIntl from "../translation/InjectIntl_HOC_factory";

export const GenericError = ({ translate, handleReset, handleError }) => {
  return (
    <Fragment>
      <div className="username-pw">
        <h2 className="heading">{translate("runtime_error.generic.title")}</h2>
        <p>{translate("runtime_error.generic.description")}</p>
      </div>
      <button
        onClick={() => {
          handleReset();
          handleError();
        }}
      >
        Click here to reset!
      </button>
    </Fragment>
  );
};

// has to be a class component
class ErrorBoundary extends Component {
  state = {
    error: null,
    errorInfo: null,
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  handleReset = () => {
    this.setState({ error: null, errorInfo: null, hasError: false });
  };

  render() {
    const { hasError, errorInfo, error, handleError } = this.state;
    return (
      <Fragment>
        {hasError && errorInfo !== null && error !== null ? (
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

export default InjectIntl(ErrorBoundary);
