import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { ButtonGroup, Form } from "reactstrap";

import AddNin from "./AddNin";
import TextInput from "components/EduIDTextInput";
import EduIDButton from "components/EduIDButton";
import vettingRegistry from "vetting-registry";

import "style/Nins.scss";

// const validate = values => {
//   let value = values.nin;
//   // accept only digits
//   if (/[^0-9]+/.test(value)) return { nin: "nins.illegal_chars" };
//   if (value.length !== 12) return { nin: "nins.wrong_length" };

// The Luhn Algorithm. It's so pretty.
// taken from https://gist.github.com/DiegoSalazar/4075533/
//   let nCheck = 0,
//     bEven = false;
//   value = value.slice(2); // To pass the Luhn check only use the 10 last digits
//   for (let n = value.length - 1; n >= 0; n--) {
//     let cDigit = value.charAt(n),
//       nDigit = parseInt(cDigit, 10);
//     if (bEven) {
//       if ((nDigit *= 2) > 9) nDigit -= 9;
//     }
//     nCheck += nDigit;
//     bEven = !bEven;
//   }
//   if (nCheck % 10 !== 0) {
//     return { nin: "nins.invalid_nin" };
//   }
//   return {};
// };

// let NinForm = props => {
//   return (
//     <Form id="nin-form" role="form">
//       <Field
//         component={TextInput}
//         componentClass="input"
//         type="text"
//         name="nin"
//         className="nin-input"
//         placeholder={props.l10n("nins.input_placeholder")}
//         helpBlock={props.l10n("nins.input_help_text")}
//       />
//     </Form>
//   );
// };

// let NinButtons = props => {
//   return (
//     <ButtonGroup vertical={true} id="nins-btn-group">
//       {props.buttons}
//     </ButtonGroup>
//   );
// };

// let NinNumber = props => {
//   // look at a way to see verified status here? <span>{verifiedNin}</span>
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

class Nins extends Component {
  render() {
    const url = window.location.href;
    // let ninStatus = "nonin",
    // ninHeading = "",
    let vettingButtons = "",
      connectNin = "";
    // ninInput = "",
    // ninButtons = "",
    // verifiedNin = "";

    // if (this.props.is_configured) {
    //   const vettingBtns = vettingRegistry(!this.props.valid_nin);
    //   const verifyOptions = this.props.proofing_methods.filter(
    //     option => option !== "oidc"
    //   );
    //   vettingButtons = verifyOptions.map((key, index) => {
    //     return (
    //       <div className="vetting-button" key={index}>
    //         {vettingBtns[key]}
    //       </div>
    //     );
    //   });
    // }

    // if (this.props.nins.length) {
    //   ninStatus = "unverified";
    //   const nins = this.props.nins.filter(nin => nin.verified);
    //   if (nins.length === 1) {
    //     ninStatus = "verified";
    //     verifiedNin = nins[0].number;
    //   }
    // }

    // let noNin = [
    //   <div key="1" id="add-nin-number">
    //     <div key="1">{this.props.l10n("nins.help_text")}</div>
    //     <div key="2" id="nin-form-container">
    //       <NinForm {...this.props} />
    //     </div>
    //     <div key="3">
    //       <button key="1">ADD FUNCTIONALITY HERE</button>
    //     </div>
    //   </div>
    // ];

    // let ninUnverified = [
    //   <div key="1" id="add-nin-number">
    //     <div>
    //       <NinNumber {...this.props} />
    //     </div>
    //     <div id="nin-buttons">
    //       <div>
    //         <VerifyButton {...this.props} />
    //       </div>
    //       <div>
    //         <RemoveButton {...this.props} />
    //       </div>
    //     </div>
    //   </div>
    // ];

    // let ninVerified = [
    //   <div key="1" id="add-nin-number">
    //     <div>
    //       <NinNumber {...this.props} />
    //     </div>
    //     <div id="nin-buttons">
    //       <div>
    //         <RemoveButton {...this.props} />
    //       </div>
    //     </div>
    //   </div>
    // ];

    // let verifyIdentityStyle = [
    //   <div key="1" className="intro">
    //     <h3> Step 1. Add your national identity number</h3>
    //     <p>Your number can be used to connect eduID to your person.</p>
    //   </div>
    // ];

    // console.log("will we get vetting buttons:", this.props.is_configured);
    // console.log("is there a valid nin?:", this.props.valid_nin);
    // console.log("is there a nin?:", this.props.nin);
    // if (this.props.is_configured) {
    //   const vettingBtns = vettingRegistry(!this.props.valid_nin);
    //   console.log("vettingBtns:", vettingBtns)
    //   const verifyOptions = this.props.proofing_methods.filter(
    //     option => option !== "oidc"
    //   );
    //   vettingButtons = verifyOptions.map((key, index) => {
    //     return (
    //       <div className="vetting-button" key={index}>
    //         {vettingBtns[key]}
    //       </div>
    //     );
    //   });
    // }
    if (this.props.is_configured) {
      const vettingBtns = vettingRegistry(!this.props.valid_nin);
      const verifyOptions = this.props.proofing_methods.filter(
        option => option !== "oidc"
      );
      vettingButtons = verifyOptions.map((key, index) => {
        return (
          <div className="vetting-button" key={index}>
            {vettingBtns[key]}
          </div>
        );
      });
    }

    // console.log("is state nin null:", this.state.nin === null);
    // console.log("is state nin something else:", this.state.nin !== null);
    // !this.props.nin === ""
    if (this.props.nins.length) {
      connectNin = [
        <div key="1" id="connect-nin-number">
          <h3> Step 2. Connect your national identity number to eduID</h3>
          <p>
            Choose a way below to verify that the given identity number belongs
            to you.
          </p>
          <div>
            <ButtonGroup vertical={true} id="nins-btn-group">
              {vettingButtons}
            </ButtonGroup>
          </div>
        </div>
      ];
    }
    // let settingsStyle = [
    //   <div className="intro">
    //     <h4>{this.props.l10n("nins.main_title")}</h4>
    //     <p>{this.props.l10n("nins.justification")}</p>
    //   </div>
    // ];

    // if (ninStatus === "nonin") {
    //   ninInput = noNin;
    // } else if (ninStatus === "unverified") {
    //   ninInput = ninUnverified;
    //   if (this.props.nins.length > 1) {
    //     ninInput = this.props.l10n("nins.only_one_to_verify");
    //   }
    // } else if (ninStatus === "verified") {
    //   ninInput = ninVerified;
    // }

    // if (url.includes("settings")) {
    //   // ninHeading = settingsStyle;
    // } else if (url.includes("step2")) {
    //   ninButtons = vettingButtons;
    //   // ninHeading = verifyIdentityStyle;
    // } else {
    //   // ninHeading = verifyIdentityStyle;
    // }
    return (
      <div id="nin-process">
        <div id="add-nin-number-container">
          {/* {ninHeading} */}
          <AddNin {...this.props} />
          {/* {ninInput} */}
        </div>
        <div id="connect-nin-number-container">{connectNin}</div>
      </div>
    );
  }
}

// NinForm = reduxForm({
//   form: "nins",
//   destroyOnUnmount: false,
//   enableReinitialize: true,
//   keepDirtyOnReinitialize: true,
//   keepValuesOnReinitialize: true,
//   updateUnregisteredFields: true,
//   validate: validate
// })(NinForm);

// NinForm = connect(state => ({
//   initialValues: { nin: state.nins.nin }
// }))(NinForm);

Nins.propTypes = {
  nin: PropTypes.string,
  nins: PropTypes.array,
  validateNin: PropTypes.func,
  handleDelete: PropTypes.func,
  proofing_methods: PropTypes.array
};

export default Nins;
