import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Form } from "reactstrap";
import { Link } from "react-router-dom";
import * as letterActions from "actions/LetterProofing";
import TextInput from "components/EduIDTextInput";

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
  render() {
    let validNin = "",
      formButton = "";

    if (this.props.valid_nin) {
      validNin = this.props.nin;
      formButton = [
          <button id="verify-button" 
            onClick={e => {
              this.props.addNin(validNin);
              this.props.confirmLetterProofing(e);
            }}
            key="1"
          >
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

NinForm = connect(state => ({
  initialValues: { nin: state.nins.nin }
}))(NinForm);

// NinForm.propTypes = {
//   nin: PropTypes.string,
//   nins: PropTypes.array,
//   validateNin: PropTypes.func,
//   handleDelete: PropTypes.func,
//   proofing_methods: PropTypes.array
// };

const mapStateToProps = (state, props) => {
  return {
    initialValues: { nin: state.nins.nin },
    // nins: state.nins.nins,
    // // // is_configured: state.config.is_configured,
    // // // proofing_methods: state.config.PROOFING_METHODS,
    // // // valid_nin: isValid("nins")(state),
    // nin: state.nins.nin,
    // message: state.nins.message
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    confirmLetterProofing: function (e) {
      console.log("you're in confirmLetterProofing!");
      dispatch(letterActions.postLetterProofingSendLetter());
      dispatch(letterActions.stopLetterConfirmation());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NinForm);

// export default NinForm;
