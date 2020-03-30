import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "reactstrap/lib/Button";

class ButtonTable extends Component {
  render() {
    return (
      <Button
        className={this.props.className}
        onClick={this.props.onClick}
        color="primary"
      >
        {this.props.buttonText}
      </Button>
    );
  }
}

ButtonTable.propTypes = {
  buttonText: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ButtonTable;
