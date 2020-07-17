import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "reactstrap/lib/Button";

class ButtonRemoveData extends Component {
  render() {
    return (
      <Button
        className={this.props.className}
        onClick={this.props.onClick}
        color="primary"
      >
        <svg
          className="remove"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 0h2v16H7z" />
          <path d="M0 9V7h16v2z" />
        </svg>
      </Button>
    );
  }
}

ButtonRemoveData.propTypes = {
  // id: PropTypes.string,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ButtonRemoveData;
