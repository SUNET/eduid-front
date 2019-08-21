import React, { Component } from "react";
import PropTypes from "prop-types";
import NinForm from "./NinForm";
import NinDisplay from "containers/NinDisplay";
import { withRouter } from "react-router-dom";
// import { connect } from "react-redux";
// import i18n from "i18n-messages";

import "style/DashboardMain.scss";
import "style/Nins.scss";

class AddNin extends Component {
  render() {
    if (this.props.nins.length) {
      return <NinDisplay removeNin={this.removeNin} {...this.props} />;
    } else {
      return (
        <div key="1">
          <h3 key="0" id="add-nin-header">
            {this.props.l10n("add_nin.main_title")}
          </h3>
          <div key="1" id="add-nin-number">
            <NinForm addNin={this.addNin} {...this.props} />
          </div>
        </div>
      );
    }
  }
}

AddNin.propTypes = {
  nins: PropTypes.array,
  validateNin: PropTypes.func
  // handleDelete: PropTypes.func
};

export default withRouter(AddNin);
