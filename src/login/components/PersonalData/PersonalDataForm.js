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
  const loading = useSelector((state) => state.config.loading_data);
  const given_name = useSelector((state) => state.personal_data.data.given_name);
  const surname = useSelector((state) => state.personal_data.data.surname);
  return (
    <Fragment>
      <div className="external-names">
        <NameDisplay label={translate("pd.given_name")} name={given_name} />
        <NameDisplay label={translate("pd.surname")} name={surname} />
      </div>
      <div className="icon-text">
        <button
          type="button"
          className="icon"
          disabled={loading}
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
      <p className="hint">{props.translate("pd.hint.names_locked_when_verified")}</p>
    </Fragment>
  );
};

let RenderSavePersonalDataButton = ({ pdata, pristine, submitting, translate, initialValues, hasPersonalData }) => {
  const loading = useSelector((state) => state.config.loading_data);
  const [isDisable, setIsDisable] = useState(false);
  useEffect(() => {
    const disableSaveButton = () => {
      const userValues = Object.entries(pdata);
      const initValues = Object.entries(initialValues);
      return userValues.some((entry, i) => {
        const value = entry[1].trim();
        if (!value || value === "") {
          setIsDisable(true);
        } else {
          if (pristine) {
            return undefined;
          } else if (value === initValues[i][1]) {
            setIsDisable(true);
          }
          setIsDisable(false);
        }
      });
    };
    if (hasPersonalData) {
      disableSaveButton();
    } else {
      return undefined;
    }
  }, [pdata, isDisable]);
  return (
    <ButtonPrimary
      id="personal-data-button"
      className="settings-button"
      disabled={pristine || submitting || isDisable || loading}
    >
      {translate("button_save")}
    </ButtonPrimary>
  );
};

let PersonalDataForm = (props) => {
  const dispatch = useDispatch();
  const available_languages = useSelector((state) => state.config.available_languages);
  const personal_data = useSelector((state) => state.personal_data.data);
  const [pdata, setPdata] = useState(personal_data);
  // setPdata key and value.
  const handleFormChange = (field) => {
    setPdata({ ...pdata, [field.name]: field.value.trim() });
  };
  // submit data
  const submitForm = (e) => {
    e.preventDefault();
    dispatch(postUserdata(pdata));
    props.setEditMode(false);
  };
  return (
    <Form
      id="personaldataview-form"
      role="form"
      onChange={(e) => handleFormChange(e.target)}
      onSubmit={(e) => {
        submitForm(e);
      }}
    >
      <div className="name-inputs">
        {props.isVerifiedNin ? <RenderLockedNames {...props} /> : <RenderEditableNames {...props} />}
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
      <RenderSavePersonalDataButton hasPersonalData={props.hasPersonalData} pdata={pdata} {...props} />
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
