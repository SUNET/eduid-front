import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
// import { Link } from "react-router-dom";
import { ButtonGroup, Form } from "reactstrap";

import TextInput from "components/EduIDTextInput";
// import EduIDButton from "components/EduIDButton";
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

class NinForm extends Component {
  // addNin(e) {
  //   console.log("you've clicked the button");
  //   console.log("this is ninInput", e.target);
  //   const ninInput = e.target.previousSibling.firstChild.children[0];
  //   // console.log("this is ninInput", ninInput)
  //   const ninValue = ninInput.value;
  //   console.log("this is ninInput", ninValue);
  // }
  render() {
    // const url = window.location.href;
    // let ninStatus = "nonin",
    //   ninHeading = "",
    //   vettingButtons = "",
    //   ninInput = "",
    //   ninButtons = "",
    //   verifiedNin = "",
    let validNin = "",
      formButton = "";

    console.log("these are props (AddNin.js)", this.props);
    console.log("this is nins array (AddNin.js)", this.props.nins);
    console.log("this is nin (AddNin.js)", this.props.nin);

    if (this.props.valid_nin) {
      console.log("is the nin valid? (AddNin.js)", this.props.valid_nin);
      // validNin = this.props.nin;
      formButton = [
        <button onClick={this.props.addNin} key="1">
          ADD
        </button>
      ];
    }

    return (
      <div key="2" id="nin-form-container">
        <Form id="nin-form" role="form">
          <Field
            component={TextInput}
            componentClass="input"
            type="text"
            name="nin"
            className="nin-input"
            placeholder={this.props.l10n("nins.input_placeholder")}
            helpBlock={this.props.l10n("nins.input_help_text")}
          />
        </Form>
        {formButton}
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

// NinForm = connect(state => ({
//   initialValues: { nin: state.nins.nin }
// }))(NinForm);

NinForm.propTypes = {
  nin: PropTypes.string,
  nins: PropTypes.array,
  validateNin: PropTypes.func,
  handleDelete: PropTypes.func,
  proofing_methods: PropTypes.array
};

export default NinForm;
