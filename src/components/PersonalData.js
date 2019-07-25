import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import Form from "reactstrap/lib/Form";
import TextInput from "components/EduIDTextInput";
import EduIDButton from "components/EduIDButton";
import { GET_USERDATA_SUCCESS } from "actions/PersonalData";

import "style/Emails.scss";
import "style/PersonalData.scss";
import "style/DashboardMain.scss";

/* FORM */

const validate = values => {
  const errors = {};
  ["given_name", "surname", "display_name", "language"].forEach(pdata => {
    if (!values[pdata]) {
      errors[pdata] = "required";
    }
  });
  return errors;
};

let PdataForm = props => {
  return (
    <Form
      id="personaldataview-form"
      // inline={true}
      role="form"
    >
      <fieldset id="personal-data-form" className="tabpane">
        <Field
          component={TextInput}
          componentClass="input"
          type="text"
          name="given_name"
          label={props.l10n("pd.given_name")}
        />
        <Field
          component={TextInput}
          componentClass="input"
          type="text"
          name="surname"
          label={props.l10n("pd.surname")}
        />
        <Field
          component={TextInput}
          componentClass="input"
          type="text"
          name="display_name"
          label={props.l10n("pd.display_name")}
          placeholder={props.l10n("pd.display_name_input_placeholder")}
          helpBlock={props.l10n("pd.display_name_input_help_text")}
        />
        <Field
          component={TextInput}
          componentClass="input"
          type="select"
          name="language"
          selectOptions={props.langs}
          label={props.l10n("pd.language")}
        />
      </fieldset>
      <EduIDButton
        id="personal-data-button"
        className="settings-button"
        disabled={props.pristine || props.submitting || props.invalid}
        onClick={props.handleSave}
      >
        {props.l10n("button_add")}
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
  validate: validate
})(PdataForm);

PdataForm = connect(state => ({
  initialValues: state.personal_data.data
}))(PdataForm);

/* COMPONENT */

class PersonalData extends Component {
  render() {
    return (
      <div className="namesview-form-container">
        <div className="intro">
          <h4>{this.props.l10n("pd.main_title")}</h4>
          <p>{this.props.l10n("pd.long_description")}</p>
        </div>
        <PdataForm {...this.props} />
      </div>
    );
  }
}

PersonalData.propTypes = {
  data: PropTypes.object,
  langs: PropTypes.array
};

export default PersonalData;
