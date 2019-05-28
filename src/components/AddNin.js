import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isValid } from "redux-form";
// import Nins from "components/Nins";
import * as actions from "actions/Nins";
import i18n from "i18n-messages";
// import { Link } from "react-router-dom";

import NinForm from "./NinForm";
import NinDisplay from "./NinDisplay";
// import EduIDButton from "components/EduIDButton";

import "style/Nins.scss";

class AddNin extends Component {
  constructor(props) {
    super(props);
    this.state = { nin: null };
    this.addNin = this.addNin.bind(this);
    this.removeNin = this.removeNin.bind(this);
  }

  addNin(validNin) {
    this.setState((state, props) => {
      return { nin: validNin };
      },
      () => {
        console.log("this is the updated state in addNin():", this.state.nin);
      }
    );
  }

  removeNin() {
    console.log("you  clicked removeNin")
    this.setState((state, props) => {
      return { nin: null };
      },
      () => {
        console.log("this is state in removeNin() in AddNin:", this.state.nin);
      }
    );
  }
  
  render() {
    if (this.props.nins.length) {
      console.log("show number! because nin arraaaaayyyy!");
      return <NinDisplay removeNin={this.removeNin} {...this.props} />;
    }
    if (this.state.nin === null) {
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
    } else {
      console.log("show number! because nin is not null!");
      return <NinDisplay removeNin={this.removeNin} {...this.props} />;
    }
  }
}

// export default i18n(NinsContainer);

// AddNin.propTypes = {
//   nin: PropTypes.string,
//   nins: PropTypes.array,
//   validateNin: PropTypes.func,
//   handleDelete: PropTypes.func,
//   proofing_methods: PropTypes.array
// };

export default AddNin;
