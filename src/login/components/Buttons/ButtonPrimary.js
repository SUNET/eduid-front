import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "reactstrap/lib/Button";

// import "style/EduIDButton.scss";

class ButtonPrimary extends Component {
  render() {
    // why is the className added dynamically? maybe for styling following validation?
    // let classes = " eduid-button settings-button";
    // if (this.props.className !== undefined) {
    //   classes = this.props.className + classes;
    // }

    // console.log("these are props in the button rimary:", this.props);
    return (
      <Button
        // className={classes}
        id={this.props.id}
        translate={this.props.translate}
        disabled={this.props.disabled}
        onClick={this.props.onClick}
        color="primary"
      >
        {this.props.children}
      </Button>
    );
  }
}

ButtonPrimary.propTypes = {
  // onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default ButtonPrimary;
