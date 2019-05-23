import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { ButtonGroup, Form } from "reactstrap";

import NinForm from "./NinForm";
import TextInput from "components/EduIDTextInput";
import EduIDButton from "components/EduIDButton";
// import vettingRegistry from "vetting-registry";

import "style/Nins.scss";

const validate = values => {
  let value = values.nin;
  // accept only digits
  if (/[^0-9]+/.test(value)) return { nin: "nins.illegal_chars" };
  if (value.length !== 12) return { nin: "nins.wrong_length" };

  // The Luhn Algorithm. It's so pretty.
  // taken from https://gist.github.com/DiegoSalazar/4075533/
  let nCheck = 0,
    bEven = false;
  value = value.slice(2); // To pass the Luhn check only use the 10 last digits
  for (let n = value.length - 1; n >= 0; n--) {
    let cDigit = value.charAt(n),
      nDigit = parseInt(cDigit, 10);
    if (bEven) {
      if ((nDigit *= 2) > 9) nDigit -= 9;
    }
    nCheck += nDigit;
    bEven = !bEven;
  }
  if (nCheck % 10 !== 0) {
    return { nin: "nins.invalid_nin" };
  }
  return {};
};

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

let NinNumber = props => {
  // look at a way to see verified status here? <span>{verifiedNin}</span>
  return (
    <div data-ninnumber={props.nins[0].number} id="nin-number-container">
      <p id="nin-number">{props.nins[0].number}</p>
    </div>
  );
};

let RemoveButton = props => {
  return (
    <EduIDButton
      className="btn-danger"
      className="btn-sm"
      id={"button-rm-nin-" + props.nins[0].number}
      onClick={props.handleDelete}
    >
      {props.l10n("nins.button_delete")}
    </EduIDButton>
  );
};

let VerifyButton = props => {
  return (
    <Link id="verify-button" to="/profile/verify-identity/step2">
      <button>
        <p>connect eduid to my person</p>
      </button>
    </Link>
  );
};

class AddNin extends Component {
  constructor(props) {
    super(props);
    this.state = { nin: null };
    this.addNin = this.addNin.bind(this);
  }
  addNin(validNin) {
    this.setState((state, props) => {
      return { nin: validNin };
    }, console.log("this is state in AddNin:", this.state.nin));
  }
  render() {
    let ninStatus = "nonin";

    if (this.props.nins.length) {
      ninStatus = "unverified";
      const nins = this.props.nins.filter(nin => nin.verified);
      if (nins.length === 1) {
        ninStatus = "verified";
        verifiedNin = nins[0].number;
      }
    }

    let ninVerified = [
      <div key="1" id="add-nin-number">
        <NinNumber {...this.props} />
        <div id="nin-buttons">
          <RemoveButton {...this.props} />
        </div>
      </div>
    ];

    if (this.state.nin === null) {
      return (
        <div key="1" id="add-nin-number">
          <div key="1">{this.props.l10n("nins.help_text")}</div>
          <div key="2" id="nin-form-container">
            <NinForm addNin={this.addNin} {...this.props} />
          </div>
        </div>
      );
    } else if (this.state.nin !== null) {
      return (
        <div key="1" id="add-nin-number">
          <NinNumber {...this.props} />
          <div id="nin-buttons">
            <VerifyButton {...this.props} />
            <RemoveButton {...this.props} />
          </div>
        </div>
      );
      if (this.props.nins.length > 1) {
        ninInput = this.props.l10n("nins.only_one_to_verify");
      }
    } else if (ninStatus === "verified") {
      ninInput = ninVerified;
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
