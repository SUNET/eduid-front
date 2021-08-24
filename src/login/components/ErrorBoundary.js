import React, { Component, Fragment } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faHome } from "@fortawesome/free-solid-svg-icons";
import InjectIntl from "../translation/InjectIntl_HOC_factory";

let RetryButton = ({ handleError, handleReset }) => {
  return (
    <button
      className="icon"
      onClick={() => {
        handleError(), handleReset();
      }}
    >
      <FontAwesomeIcon icon={faRedo} />
    </button>
  );
};

let HomeButton = () => {
  const toHome = useSelector((state) => state.config.eduid_site_url);
  return (
    <button
      className="icon"
      onClick={() => {
        window.location = toHome;
      }}
    >
      <FontAwesomeIcon icon={faHome} />
    </button>
  );
};

export const GenericError = (props) => {
  return (
    <Fragment>
      <div className="error-boundary">
        <h2 className="heading">
          {props.translate("runtime_error.generic.title")}
        </h2>
        <p>{props.translate("runtime_error.generic.description")}</p>
        <div className="options">
          <div className="option">
            <label>
              {props.translate("runtime_error.generic.label.reload")}
            </label>
            <div className="icon-text">
              <RetryButton {...props} />
              <p>{props.translate("runtime_error.generic.p.reload")}</p>
            </div>
          </div>
          <div className="option">
            <label>
              {props.translate("runtime_error.generic.label.toHome")}
            </label>
            <div className="icon-text">
              <HomeButton {...props} />
              <p>{props.translate("runtime_error.generic.p.toHome")}</p>
            </div>
          </div>
        </div>
      </div>
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
