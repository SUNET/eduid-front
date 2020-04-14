import React, { Component } from "react";
import PropTypes from "prop-types";
import NinForm from "./NinForm";
import NinDisplay from "containers/NinDisplay";
import { withRouter } from "react-router-dom";

import "style/DashboardMain.scss";

class AddNin extends Component {
  render() {
    if (this.props.nins.length) {
      return <NinDisplay removeNin={this.removeNin} {...this.props} />;
    } else {
      return (
        <div key="1">
          <label key="0"> {this.props.translate("add_nin.main_title")}</label>
          <NinForm addNin={this.addNin} {...this.props} />
        </div>
      );
    }
  }
}

AddNin.propTypes = {
  nins: PropTypes.array,
  validateNin: PropTypes.func
};

export default withRouter(AddNin);
