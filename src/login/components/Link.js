import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class Link extends Component {
  render() {
    return (
      <a
        id={this.props.id}
        className={this.props.className}
        href={this.props.href}
      >
        {this.props.text}
      </a>
    );
  }
}

Link.propTypes = {
  //is_fetching: PropTypes.bool,
};

export default withRouter(Link);
