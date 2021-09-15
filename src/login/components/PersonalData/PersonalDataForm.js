import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Form from "reactstrap/lib/Form";
import ButtonPrimary from "../Buttons/ButtonPrimary";
import NameDisplay from "../DataDisplay/Name/NameDisplay";
import CustomInput from "../Inputs/CustomInput";
import validatePersonalData from "../../app_utils/validation/validatePersonalData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { postUserdata } from "../../../actions/PersonalData";
import { updateNamesFromSkatteverket } from "../../redux/actions/updateNamesFromSkatteverketActions";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";

const RenderLockedNames = ({ translate }) => {
  const dispatch = useDispatch();
  const firstName = useSelector((state) => state.personal_data.data.given_name);
  const lastName = useSelector((state) => state.personal_data.data.surname);
  return (
    <Fragment>
      <div className="external-names">
        <NameDisplay label={translate("pd.given_name")} name={firstName} />
        <NameDisplay label={translate("pd.surname")} name={lastName} />
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
        <p className="hint">{translate("pd.update_locked_names")}</p>
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
        {props.translate("pd.hint.names_locked_when_verified")}
      </p>
    </Fragment>
  );
};

let PersonalDataForm = (props) => {
  const available_languages = useSelector(
    (state) => state.config.available_languages
  );
  const dispatch = useDispatch();
  // console.log("props", props);
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
        placeholder={props.translate("pd.display_name_placeholder")}
        helpBlock={props.translate("pd.display_name_input_help_text")}
      />
      <Field
        component={CustomInput}
        required={true}
        name="language"
        selectOptions={available_languages}
        label={props.translate("pd.language")}
      />
      <ButtonPrimary
        id="personal-data-button"
        className="settings-button"
        disabled={props.pristine || props.submitting || isDisable}
        onClick={() => {
          dispatch(postUserdata());
          props.setEditMode(false);
        }}
      >
        {props.translate("button_save")}
      </ButtonPrimary>
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
