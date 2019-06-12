import React, { Component } from "react";
import PropTypes from "prop-types";
import NinForm from "./NinForm";
import NinDisplay from "./NinDisplay";

import "style/Nins.scss";

class AddNin extends Component {
  render() {
    console.log("show form! because nin is null!");
    console.log("these are the props (AddNin):", this.props);

    if (this.props.nins.length) {
      console.log("show number! because nin arraaaaayyyy!");
      return <NinDisplay removeNin={this.removeNin} {...this.props} />;
    } else {
      console.log("show form! because nin is null!");
      console.log("these are the props (AddNin):", this.props);
      return (
        <div key="1" className="intro">
          <h3> Step 1. Add your national identity number</h3>
          <p>Your number can be used to connect eduID to your person.</p>
          <div key="1" id="add-nin-number">
            <div key="1">{this.props.l10n("nins.help_text")}</div>
            <div key="2" id="nin-form-container">
              <NinForm addNin={this.addNin} {...this.props} />
            </div>
          </div>
        </div>
      );
    }
  }
}

AddNin.propTypes = {
  nin: PropTypes.string,
  nins: PropTypes.array,
  validateNin: PropTypes.func,
  handleDelete: PropTypes.func,
  proofing_methods: PropTypes.array
};

export default AddNin;
