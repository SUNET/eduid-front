import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";

import NinForm from "./NinForm";
import NinDisplay from "./NinDisplay";
// import EduIDButton from "components/EduIDButton";

import "style/Nins.scss";

// let NinNumber = props => {
//   return (
//     <div data-ninnumber={props.nins[0].number} id="nin-number-container">
//       <p id="nin-number">{props.nins[0].number}</p>
//     </div>
//   );
// };

// let RemoveButton = props => {
//   return (
//     <EduIDButton
//       className="btn-danger"
//       className="btn-sm"
//       id={"button-rm-nin-" + props.nins[0].number}
//       onClick={props.handleDelete}
//     >
//       {props.l10n("nins.button_delete")}
//     </EduIDButton>
//   );
// };

// let VerifyButton = props => {
//   return (
//     <Link id="verify-button" to="/profile/verify-identity/step2">
//       <button>
//         <p>connect eduid to my person</p>
//       </button>
//     </Link>
//   );
// };

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
    }, console.log("this is state in addNin() in AddNin:", this.state.nin));
  }

  removeNin() {
    console.log("you  clicked removeNin")
    this.setState((state, props) => {
      return { nin: null };
    }, console.log("this is state in removeNin() in AddNin:", this.state.nin));
  }
  render() {
    // let ninStatus = "nonin";

    // if (this.props.nins.length) {
    //   ninStatus = "unverified";
    //   const nins = this.props.nins.filter(nin => nin.verified);
    //   if (nins.length === 1) {
    //     ninStatus = "verified";
    //     verifiedNin = nins[0].number;
    //   }
    // if (this.props.nins.length > 1) {
    //   ninInput = this.props.l10n("nins.only_one_to_verify");
    // }
    // }

    // let ninVerified = [
    //   <div key="1" id="add-nin-number">
    //     <NinNumber {...this.props} />
    //     <div id="nin-buttons">
    //       <RemoveButton {...this.props} />
    //     </div>
    //   </div>
    // ];
    if (this.props.nins.length) {
      console.log("show number beacsue nin arraaaaayyyyyy!")
      return <NinDisplay {...this.props} />
    }

    if (this.state.nin) {
      console.log("is state.nin?", this.state.nin);
      console.log("show number!");
      console.log("these are the props (AddNin):", this.props);
      return <NinDisplay removeNin={this.removeNin} {...this.props} />;
    } else {
      console.log("is state.nin?", this.state.nin);
      console.log("show form!");
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

// AddNin.propTypes = {
//   nin: PropTypes.string,
//   nins: PropTypes.array,
//   validateNin: PropTypes.func,
//   handleDelete: PropTypes.func,
//   proofing_methods: PropTypes.array
// };

export default AddNin;
