import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "reactstrap/lib/Button";

// import "style/EduIDButton.scss";

class ButtonSecondary extends Component {
  render() {
    // why is the className added dynamically? maybe for styling following validation?
    // let classes = " eduid-button settings-button";
    // if (this.props.className !== undefined) {
    //   classes = this.props.className + classes;
    // }
    return (
      <Button
        // className={"eduid-button settings-button"}
        id={this.props.id}
        onClick={this.props.onClick}
        color="secondary"
        translate={this.props.translate}
      >
        {this.props.children}
      </Button>
    );
  }
}

ButtonSecondary.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string
};

export default ButtonSecondary;
