import React, { Component } from "react";
import PropTypes from "prop-types";
import NinForm from "./NinForm";
import NinDisplay from "containers/NinDisplay";
import { withRouter } from "react-router-dom";

// import "style/DashboardMain.scss";

class AddNin extends Component {
  render() {
    if (this.props.nins.length) {
      return <NinDisplay removeNin={this.removeNin} {...this.props} />;
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
