import React from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { hasError: false };
  // }
  state = {
    error: "",
    eventId: "",
    errorInfo: "",
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log({ error, errorInfo });
    logErrorToMyService(error, errorInfo);
  }

  render() {
    const { hasError, errorInfo } = this.state;
    if (hasError) {
      return (
        <div>
          <div>
            {/* <p>
              An error has occurred in this component.{" "}
              <span
                style={{ cursor: "pointer", color: "#0077FF" }}
                onClick={() => {
                  window.location.reload();
                }}
              >
                Reload this page
              </span>{" "}
            </p> */}
          </div>

          <div className="card-body">
            {/* <details className="error-details"> */}
              <summary>Click for error details</summary>
              {errorInfo && errorInfo.componentStack.toString()}
            {/* </details> */}
          </div>

          {/* <button
            className="bg-primary text-light"
            onClick={() =>
              Sentry.showReportDialog({ eventId: this.state.eventId })
            }
          >
            Report feedback
          </button> */}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
