import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class LinkRedirect extends Component {
  render() {
    return (
      <Link
        // exact
        id={this.props.id}
        className={this.props.className}
        to={this.props.to}
      >
        {this.props.text}
      </Link>
    );
  }
}

LinkRedirect.propTypes = {
  //is_fetching: PropTypes.bool,
};

export default withRouter(LinkRedirect);
