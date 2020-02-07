import React, { Component } from "react";
import PropTypes from "prop-types";

class Input extends Component {
  render() {
    return (
      <div className="input-container">
        <label>{this.props.label}</label>
        <input
          type="text"
          id={this.props.inputId}
          className={this.props.inputClass}
          name={this.props.name}
          placehoder={this.props.placeholder}
          onChange={this.props.onChange}
          required
        />
      </div>
    );
  }
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  inputClass: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string
};

export default Input;
