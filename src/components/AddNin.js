import React, { Component } from "react";
import PropTypes from "prop-types";
import NinForm from "./NinForm";
import NinDisplay from "components/NinDisplay";
import { withRouter } from "react-router-dom";

class AddNin extends Component {
  render() {
    if (this.props.nins.length) {
      return <NinDisplay removeNin={this.removeNin} showDeleteButton {...this.props} />;
    } else {
      return <NinForm addNin={this.addNin} {...this.props} />;
    }
  }
}

AddNin.propTypes = {
  nins: PropTypes.array,
  validateNin: PropTypes.func,
};

export default withRouter(AddNin);
