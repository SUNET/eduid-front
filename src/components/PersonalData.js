import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import Form from "reactstrap/lib/Form";
import TextInput from "components/EduIDTextInput";
import EduIDButton from "components/EduIDButton";

// import "style/Emails.scss";
// import "style/PersonalData.scss";
// import "style/DashboardMain.scss";

import "../login/styles/index.scss";

/* FORM */

const validatePersonalData = (values) => {
  const errors = {};
  const spacePattern = /^\s+$/;
  const withSpecialCharacters  = /[`!€%&?~#@,.<>;':"\/\[\]\|{}()-=_+]/;

  ["given_name", "surname", "display_name", "language"].forEach((pdata) => {
    if (!values[pdata]) {
      errors[pdata] = "required";
    }
    //add space pattern instead of trim because the input datas will be added without space.
    else if(spacePattern.test(values[pdata])){
      errors[pdata] = "required";
    }
    else if(pdata==="given_name" || pdata==="surname"){
      if(withSpecialCharacters.test(values[pdata])){
        errors[pdata] = "only allow letters";
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
          component={TextInput}
          componentClass="input"
          type="text"
          name="given_name"
          label={props.translate("pd.given_name")}
          placeholder={props.translate("pd.given_name")}
        />
        <Field
          component={TextInput}
          componentClass="input"
          type="text"
          name="surname"
          label={props.translate("pd.surname")}
          placeholder={props.translate("pd.surname")}
        />
        <Field
          component={TextInput}
          componentClass="input"
          type="text"
          name="display_name"
          label={props.translate("pd.display_name")}
          placeholder={props.translate("pd.display_name_input_placeholder")}
          helpBlock={props.translate("pd.display_name_input_help_text")}
        />
        <Field
          component={TextInput}
          componentClass="input"
          type="select"
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
        {props.translate("button_add")}
      </EduIDButton>
    </Form>
  );
};

PdataForm = reduxForm({
  form: "personal_data",
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  keepValuesOnReinitialize: true,
  updateUnregisteredFields: true,
  validate: validatePersonalData,
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
