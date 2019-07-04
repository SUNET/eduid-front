import React, { Component } from "react";
import PropTypes from "prop-types";
import NinForm from "./NinForm";
import NinDisplay from "./NinDisplay";

import "style/DashboardMain.scss";
import "style/Nins.scss";

class AddNin extends Component {
  render() {
    if (this.props.nins.length) {
      return <NinDisplay removeNin={this.removeNin} {...this.props} />;
    } else {
      return (
        <div key="1">
          <label>1. Add your national id number</label>
          <div key="1" id="add-nin-number">
            <NinForm addNin={this.addNin} {...this.props} />
          </div>
        </div>
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
