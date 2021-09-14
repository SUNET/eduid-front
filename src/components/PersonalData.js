import React, { Component, useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Form from "reactstrap/lib/Form";
import EduIDButton from "components/EduIDButton";
import NameDisplay from "../login/components/DataDisplay/Name/NameDisplay";
import CustomInput from "../login/components/Inputs/CustomInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { updateNamesFromSkatteverket } from "../login/redux/actions/updateNamesFromSkatteverketActions";

// import "../login/styles/index.scss";
import { emptyStringPattern } from "../login/app_utils/validation/regexPatterns";
import InjectIntl from "../login/translation/InjectIntl_HOC_factory";

/* FORM */

const validatePersonalData = (values, props) => {
  const errors = {};
  ["given_name", "surname", "display_name", "language"].forEach((inputName) => {
    if (!values[inputName] || emptyStringPattern.test(values[inputName])) {
      errors[inputName] = "required";
    }
    //none of the fields value properties differ from their initial properties will get error message.
    else if (props.pristine) {
      errors[inputName] = "value not changed";
    } else if (values[inputName].trim() === props.initialValues[inputName]) {
      errors[inputName] = "value not changed";
    }
  });
  return errors;
};

const RenderLockedNames = ({ translate }) => {
  const dispatch = useDispatch();
  const firstName = useSelector((state) => state.personal_data.data.given_name);
  const lastName = useSelector((state) => state.personal_data.data.surname);
  return (
    <Fragment>
      <div className="external-names">
        <NameDisplay
          label={translate("pd.given_name")}
          // name={firstName}
          name={"Robert-Anders Christian Nicklas"}
        />
        <NameDisplay
          label={translate("pd.surname")}
          // name={lastName}
          name={"Van de Meulebrouck Brendgard"}
        />
      </div>
      <div className="icon-text">
        <button
          type="button"
          className="icon"
          onClick={() => {
            dispatch(updateNamesFromSkatteverket());
          }}
        >
          <FontAwesomeIcon icon={faRedo} />
        </button>
        <p className="hint">Hämta för- och efternamn från Skatteverket.</p>
      </div>
    </Fragment>
  );
};

const RenderEditableNames = (props) => {
  return (
    <Fragment>
      <div className="input-pair">
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
      </div>
      <p className="hint">
        För- och efternamn kommer att hämtas automatiskt från Skatteverket om du
        verifierar ditt eduID med ditt personummer.
      </p>
    </Fragment>
  );
};

let PersonalDataForm = (props) => {
  const personal_data = useSelector((state) => state.personal_data.data);
  // button status, defalut is false
  const [isDisable, setIsDisable] = useState(false);
  // personal data, default data is empty object
  const [pdata, setPdata] = useState({});
  // After rendering, useEffect will check [] parameter against the values from the last render, and will call effect function if any one of them has changed.
  useEffect(() => {
    setPdata(personal_data);
  }, [personal_data]);
  // if all the updateded values are matched with initial values, button will be disabled.
  useEffect(() => {
    if (
      !pdata.given_name ||
      !pdata.surname ||
      !pdata.display_name ||
      !pdata.language
    ) {
      setIsDisable(true);
    } else if (
      pdata.given_name === props.initialValues.given_name &&
      pdata.surname === props.initialValues.surname &&
      pdata.display_name === props.initialValues.display_name &&
      pdata.language === props.initialValues.language
    ) {
      setIsDisable(true);
    } else setIsDisable(false);
  }, [pdata, isDisable]);

  // setPdata key and value.
  const handleFormChange = (field) => {
    setPdata({ ...pdata, [field.name]: field.value.trim() });
  };

  return (
    <Form
      id="personaldataview-form"
      role="form"
      onChange={(e) => handleFormChange(e.target)}
    >
      <div className="name-inputs">
        {props.isVerifiedNin ? (
          <RenderLockedNames {...props} />
        ) : (
          <RenderEditableNames {...props} />
        )}
      </div>
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
      <EduIDButton
        id="personal-data-button"
        className="settings-button"
        disabled={props.pristine || props.submitting || isDisable}
        onClick={props.handleSave}
      >
        {props.translate("button_save")}
      </EduIDButton>
    </Form>
  );
};

PersonalDataForm = reduxForm({
  form: "personal_data",
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepValuesOnReinitialize: true,
  updateUnregisteredFields: true,
  validate: validatePersonalData,
  touchOnChange: true,
})(PersonalDataForm);

PersonalDataForm = connect((state) => ({
  initialValues: state.personal_data.data,
}))(PersonalDataForm);

export default InjectIntl(PersonalDataForm);
