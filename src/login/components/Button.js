import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faSpinner from "@fortawesome/free-solid-svg-icons/faSpinner";
import Button from "reactstrap/lib/Button";

//import FetchingContext from "components/FetchingContext";

import "style/EduIDButton.scss";

class EduIDButton extends Component {
  render() {
    // why is the className added dynamically?
    let classes = " eduid-button";
    if (this.props.className !== undefined) {
      classes = this.props.className + classes;
    }
    return (
      <Button
        className={classes}
        id={this.props.id}
        disabled={this.props.disabled}
        onClick={this.props.onClick}
        color="primary"
      >
        {this.props.children}
      </Button>
    );
  }
}

EduIDButton.propTypes = {};

export default EduIDButton;
