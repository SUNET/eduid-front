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
        color="primary"
      >
        {this.props.children}
      </Button>
    );
  }
}

ButtonModal.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,

  
};

export default ButtonModal;
