import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class LinkRedirect extends Component {
  render() {
    return (
      <Link
        id={this.props.id}
        className={this.props.className}
        to={this.props.to}
        onClick={this.props.onClick}
      >
        {this.props.text}
      </Link>
    );
  }
}

LinkRedirect.propTypes = { };

export default withRouter(LinkRedirect);
