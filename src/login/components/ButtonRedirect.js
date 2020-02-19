import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "reactstrap/lib/Button";

// import "style/EduIDButton.scss";

class ButtonRedirect extends Component {
  render() {
    // why is the className added dynamically? maybe for styling following validation?
    // let classes = " eduid-button settings-button";
    // if (this.props.className !== undefined) {
    //   classes = this.props.className + classes;
    // }
    return (
      <div>
        <Button
          className={this.props.className}
          id={this.props.id}
          disabled={this.props.disabled}
          onClick={this.props.onClick}
          color="primary"
        >
          {this.props.children}
        </Button>
      </div>
    );
  }
}

ButtonRedirect.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default ButtonRedirect;
