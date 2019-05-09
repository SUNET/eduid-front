import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { Form } from "reactstrap";
import { ButtonGroup } from "reactstrap";
import TextInput from "components/EduIDTextInput";
import EduIDButton from "components/EduIDButton";
import vettingRegistry from "vetting-registry";

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

let NinForm = props => {
  return [
    <Form id="nins-form" role="form" key="1">
      <Field
        component={TextInput}
        componentClass="input"
        type="text"
        name="nin"
        className="nin-proofing-input"
        placeholder={props.l10n("nins.input_placeholder")}
        helpBlock={props.l10n("nins.input_help_text")}
      />
    </Form>
  ];
};

let NinButtons = props => {
  // console.log(props);
  return (
    <ButtonGroup vertical={true} id="nins-btn-group">
      {props.buttons}
    </ButtonGroup>
  );
};

let NinNumber = props => {
  console.log("ninNum props:", props);
  // look at a way to see verified status <span>{verifiedNin}</span>
  return (
    <div data-ninnumber={props.nins[0].number} id="eduid-unconfirmed-nin">
      <p id="nin-number">{props.nins[0].number}</p>
    </div>
  );
};

let RemoveButton = props => {
  // console.log("removeButton props:", props);
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
  // console.log("ninNum props:", props);
  return (
    <Link to="/profile/verify-identity/step2">
      <button>
        <p>{props.l10n("nins.unconfirmed_nin")}</p>
      </button>
    </Link>
  );
};

class Nins extends Component {
  render() {
    let ninStatus = "nonin",
      credsTable = "",
      vettingButtons = "",
      ninInput = "",
      verifiedNin = "";

    if (this.props.is_configured) {
      const vettingBtns = vettingRegistry(!this.props.valid_nin);
      vettingButtons = this.props.proofing_methods.map((key, index) => {
        return <div key={index}>{vettingBtns[key]}</div>;
      });
    }

    if (this.props.nins.length) {
      ninStatus = "unverified";
      const nins = this.props.nins.filter(nin => nin.verified);
      if (nins.length === 1) {
        ninStatus = "verified";
        verifiedNin = nins[0].number;
      }
    }

    let noNin = [
      <div id="add-nin-number">
        <div key="1">{this.props.l10n("nins.help_text")}</div>,
        <div key="2" className="proofing-buttons">
          <NinForm {...this.props} />
        </div>
        ,
        <div key="3">
          <button>ADD FUNCTIONALITY HERE</button>
        </div>
      </div>
    ];

    let ninUnverified = [
      <div id="add-nin-number">
        <div key="1">
          <label>{this.props.l10n("nins.unconfirmed_nin")}</label>
          <NinNumber {...this.props} />
        </div>
        <div key="2">
          <VerifyButton {...this.props} />
        </div>
        <div key="3">
          <RemoveButton {...this.props} />
        </div>
      </div>
    ];

    let ninVerified = [
      <div id="add-nin-number-container">
        <div id="add-nin-number">
          <div key="1">
            <label>{this.props.l10n("nins.confirmed_nin")}</label>
            <NinNumber {...this.props} />
          </div>
          <div key="2">
            <RemoveButton {...this.props} />
          </div>
        </div>
      </div>
    ];

    if (ninStatus === "nonin") {
      ninInput = noNin;
    } else if (ninStatus === "unverified") {
      ninInput = ninUnverified;
      if (this.props.nins.length > 1) {
        ninInput = this.props.l10n("nins.only_one_to_verify");
      } 
    } else if (ninStatus === "verified") {
      ninInput = ninVerified
    }

    return (
      <div>
        <div className="intro">
          <h4>{this.props.l10n("nins.main_title")}</h4>
          <p>{this.props.l10n("nins.justification")}</p>
          {/* <p>
            {this.props.l10n("faq_link")}{" "}
            <a href="https://www.eduid.se/faq.html">FAQ</a>
          </p> */}
          {/* {credsTable} */}
        </div>
        {ninInput}
      </div>
    );
  }
}

NinForm = reduxForm({
  form: "nins",
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  keepValuesOnReinitialize: true,
  updateUnregisteredFields: true,
  validate: validate
})(NinForm);

NinForm = connect(state => ({
  initialValues: { nin: state.nins.nin }
}))(NinForm);

Nins.propTypes = {
  nin: PropTypes.string,
  nins: PropTypes.array,
  validateNin: PropTypes.func,
  handleDelete: PropTypes.func,
  proofing_methods: PropTypes.array
};

export default Nins;
