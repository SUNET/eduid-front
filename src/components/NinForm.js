import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import i18n from "../login/translation/InjectIntl_HOC_factory";
import { ButtonGroup, Form } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import * as actions from "actions/Nins";

// import TextInput from "components/EduIDTextInput";
import NinInput from "../login/components/Inputs/CustomInput"
import PrimaryButton from "../login/components/Buttons/ButtonPrimary";

const validate = (values) => {
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
    return (
      // <div key="2" id="nin-form-container">
        <Form id="nins-form" role="form" onSubmit={this.props.addNin}>
          <fieldset id="nin-form" className="tabpane">
            <Field
              component={NinInput}
              componentClass="input"
              type="text"
              name="nin"
              label={this.props.translate("nin_display.profile.main_title")}
              placeholder={this.props.translate("nins.input_placeholder")}
              helpBlock={this.props.translate("nins.input_help_text")}
            />
          </fieldset>
          <PrimaryButton
            id={""}
            disabled={!this.props.valid}
            onClick={this.props.addNin}
            key="1"
          >
            {this.props.translate("emails.button_add")}
          </PrimaryButton>
        </Form>
      // </div>
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
  validate: validate,
})(NinForm);

const mapStateToProps = (state, props) => {
  return {
    initialValues: { nin: state.nins.nin },
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    addNin: function (e) {
      e.preventDefault();
      const nin = e.target.closest("#nin-form")
        .firstElementChild.children[0].value;
      dispatch(actions.postNin(nin));
    },
  };
};

const NinFormContainer = connect(mapStateToProps, mapDispatchToProps)(NinForm);

export default i18n(NinFormContainer);
