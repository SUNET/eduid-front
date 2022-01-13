import React, { Component } from "react";
import PropTypes from "prop-types";
import { Alert } from "reactstrap";

class Notifications extends Component {
  render() {
    // console.log("these are the props in Notifications", this.props);
    // console.log("this is props.errors in Notifications", this.props.errors);
    // console.log("this is props.errors in Notifications", this.props.errors);

    let toShow = this.props.errors.map((err, index) => {
      let err_msg = this.props.translate(err.msg);
      if (err.vals !== null) {
        err_msg = err_msg(err.vals);
      }
      if (!this.props.debug && err_msg.indexOf !== undefined && err_msg.indexOf("UNKNOWN MESSAGE ID (") !== -1) {
        err_msg = this.props.translate("unexpected-problem");
      }
      return (
        <Alert
          key={index}
          // color="danger"
          data-level="errors"
          data-index={index}
          isOpen={true}
          toggle={this.props.handleRMNotification}
        >
          <span>{err_msg}</span>
        </Alert>
      );
    });

    if (toShow.length === 0) {
      toShow = this.props.messages.map((msg, index) => {
        let success_msg = this.props.translate(msg.msg);
        if (msg.vals !== null) {
          success_msg = success_msg(msg.vals);
        }
        if (
          !this.props.debug &&
          success_msg.indexOf !== undefined &&
          success_msg.indexOf("UNKNOWN MESSAGE ID (") !== -1
        ) {
          success_msg = this.props.translate("unexpected-success");
        }
        return (
          <Alert
            key={index}
            color="success"
            data-level="messages"
            data-index={index}
            isOpen={true}
            toggle={this.props.handleRMNotification}
          >
            <span>{success_msg}</span>
          </Alert>
        );
      });
    }
    return <div className="notifications-area">{toShow}</div>;
  }
}

Notifications.propTypes = {
  messages: PropTypes.array,
  errors: PropTypes.array,
  debug: PropTypes.bool,
  handleRMNotification: PropTypes.func,
  translate: PropTypes.func,
};

export default Notifications;
