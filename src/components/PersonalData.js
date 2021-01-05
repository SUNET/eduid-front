import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Form from "reactstrap/lib/Form";
import EduIDButton from "components/EduIDButton";
import CustomInput from "../login/components/Inputs/CustomInput";
import "../login/styles/index.scss";

/* FORM */

const validatePersonalData = (values, props) => {
  const errors = {};
  const specialCharsAndNumbers  = /[`!€%&?~#@,.<>;':"\/\[\]\|{}(_+0-9]/;
  // Regex pattern to match all emojis, https://www.regextester.com/106421
  const emojiUnicodes = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;

  ["given_name", "surname", "display_name", "language"].forEach((inputValue) => {
    if (!values[inputValue] || !values[inputValue].trim()) {
      errors[inputValue] = "required";
    }
    //none of the fields value properties differ from their initial properties will get error message.
    else if(props.pristine){
      errors[inputValue] = "value not changed";
    }
    else if(inputValue==="given_name" || inputValue==="surname"){
      if(specialCharsAndNumbers.test(values[inputValue]) || emojiUnicodes.test(values[inputValue])){
        errors[inputValue] = "only allow letters";
      }
    }
  });
  return errors;
};

let PdataForm = (props) => {
  return (
    <Form id="personaldataview-form" role="form">
      <fieldset id="personal-data-form" className="tabpane">
        <Field
          component={CustomInput}
          required={true}
          componentClass="input"
          type="text"
          name="given_name"
          label={props.translate("pd.given_name")}
          placeholder={props.translate("pd.given_name")}
        />
        <Field
          component={CustomInput}
          required={true}
          componentClass="input"
          type="text"
          name="surname"
          label={props.translate("pd.surname")}
          placeholder={props.translate("pd.surname")}
        />
        <Field
          component={CustomInput}
          required={true}
          componentClass="input"
          type="text"
          name="display_name"
          label={props.translate("pd.display_name")}
          placeholder={props.translate("pd.display_name")}
          helpBlock={props.translate("pd.display_name_input_help_text")}
        />
         <Field
          component={CustomInput}
          required={true}
          name="language"
          selectOptions={props.langs}
          label={props.translate("pd.language")}
        />
      </fieldset>
      <EduIDButton
        id="personal-data-button"
        className="settings-button"
        disabled={props.pristine || props.submitting || props.invalid}
        onClick={props.handleSave}
      >
        {props.translate("button_save")}
      </EduIDButton>
    </Form>
  );
};

PdataForm = reduxForm({
  form: "personal_data",
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepValuesOnReinitialize: true,
  updateUnregisteredFields: true,
  validate: validatePersonalData,
  touchOnChange: true,
  touchOnBlur: true
})(PdataForm);

PdataForm = connect((state) => ({
  initialValues: state.personal_data.data,
}))(PdataForm);

/* COMPONENT */

class PersonalData extends Component {
  render() {
    return (
      <div className="namesview-form-container">
        <div className="intro">
          <h4>{this.props.translate("pd.main_title")}</h4>
          <p>{this.props.translate("pd.long_description")}</p>
        </div>
        <PdataForm {...this.props} />
      </div>
    );
  }
}

PersonalData.propTypes = {
  data: PropTypes.object,
  langs: PropTypes.array,
};

export default PersonalData;
