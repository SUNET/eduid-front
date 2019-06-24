import React, { Component } from "react";
import PropTypes from "prop-types";
import NinForm from "./NinForm";
import NinDisplay from "./NinDisplay";

import "style/Nins.scss";

class AddNin extends Component {
  render() {
    if (this.props.nins.length) {
      return <NinDisplay removeNin={this.removeNin} {...this.props} />;
    } else {
      return (
        <div key="1" className="intro">
          <h3>Step 1. Add your national id number</h3>
          <p>Your number can be used to connect eduID to your person.</p>
          <div key="1" id="add-nin-number">
            {/* <div key="1">{this.props.l10n("nins.help_text")}</div> */}
            {/* <div key="2" id="nin-form-container"> */}
            <NinForm addNin={this.addNin} {...this.props} />
          </div>
        </div>
        // </div>
      );
    }
  }
}

// AddNin.propTypes = {
//   nin: PropTypes.string,
//   nins: PropTypes.array,
//   validateNin: PropTypes.func,
//   handleDelete: PropTypes.func,
//   proofing_methods: PropTypes.array
// };

export default AddNin;
