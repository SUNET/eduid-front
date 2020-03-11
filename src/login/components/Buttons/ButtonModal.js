import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "reactstrap/lib/Button";

class ButtonModal extends Component {
  render() {
    return (
      <Button
        className={this.props.className}
        translate={this.props.translate}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </Button>
    );
  }
}

ButtonModal.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  id: PropTypes.string
};

export default ButtonModal;
