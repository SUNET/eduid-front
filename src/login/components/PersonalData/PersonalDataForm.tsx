import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import NameDisplay from "../DataDisplay/Name/NameDisplay";
import CustomInput from "../Inputs/CustomInput";
import validatePersonalData from "../../app_utils/validation/validatePersonalData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { postUserdata } from "../../../actions/PersonalData";
import { updateNamesFromSkatteverket } from "../../redux/actions/updateNamesFromSkatteverketActions";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import { translate } from "login/translation";
import { DashboardRootState } from "dashboard-init-app";
import { PersonalDataData } from "reducers/PersonalData";
import { Form } from "reactstrap";
import EduIDButton from "../../../components/EduIDButton";

interface NameStrings {
  first: string;
  last: string;
  display: string;
}

/*
 * If the user has a verified NIN, editing the first and last name is not permitted because we get
 * the legal names from Skatteverket. There is however a button to request renewal of the names
 * from Skatteverket, which the user can use to speed up syncing in case of name change.
 */
const RenderLockedNames = (props: { names: NameStrings }) => {
  const dispatch = useDashboardAppDispatch();
  const loading = useDashboardAppSelector((state) => state.config.loading_data);
  const given_name = useDashboardAppSelector((state) => state.personal_data.data.given_name);
  const surname = useDashboardAppSelector((state) => state.personal_data.data.surname);
  return (
    <Fragment>
      <div className="external-names">
        <NameDisplay label={props.names.first} name={given_name} />
        <NameDisplay label={props.names.last} name={surname} />
      </div>
      <div className="icon-text">
        <button
          type="button"
          className="icon-only"
          disabled={loading}
          aria-label="name-check"
          onClick={() => {
            dispatch(updateNamesFromSkatteverket());
          }}
        >
          <FontAwesomeIcon icon={faRedo} />
        </button>
        <label htmlFor="name-check" className="hint">
          {translate("pd.update_locked_names")}
        </label>
      </div>
    </Fragment>
  );
};

const RenderEditableNames = (props: { names: NameStrings }) => {
  return (
    <Fragment>
      <div className="input-pair">
        <Field
          component={CustomInput}
          required={true}
          componentClass="input"
          type="text"
          name="given_name"
          label={props.names.first}
          placeholder={props.names.first}
        />
        <Field
          component={CustomInput}
          required={true}
          componentClass="input"
          type="text"
          name="surname"
          label={props.names.last}
          placeholder={props.names.last}
        />
      </div>
      <p className="help-text">{translate("pd.hint.names_locked_when_verified")}</p>
    </Fragment>
  );
};

interface RenderSavePersonalDataButtonProps {
  invalid: boolean;
  pristine: boolean;
  submitting: boolean;
}

const RenderSavePersonalDataButton = ({ invalid, pristine, submitting }: RenderSavePersonalDataButtonProps) => {
  const loading = useDashboardAppSelector((state) => state.config.loading_data);
  return (
    <EduIDButton
      id="personal-data-button"
      buttonStyle="primary"
      disabled={loading || pristine || invalid || submitting}
    >
      {translate("button_save")}
    </EduIDButton>
  );
};

interface FormData {
  name: string;
  value: string;
}

interface PersonalDataFormProps {
  isVerifiedNin: boolean;
  setEditMode(value: boolean): void;
  hasPersonalData: boolean; // is eppn present in PersonalDataData or not?
  names: NameStrings;

  initialValues: PersonalDataData;

  invalid: boolean; // injected by redux-form
  pristine: boolean; // injected by redux-form
  submitting: boolean; // injected by redux-form

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSubmit: any; // injected by redux-form, haven't figured out how to type it yet
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: any; // injected by redux-form, haven't figured out how to type it yet
}

const PersonalDataForm = (props: PersonalDataFormProps) => {
  const { names } = props;
  const dispatch = useDashboardAppDispatch();
  const available_languages = useDashboardAppSelector((state) => state.config.available_languages);
  const personal_data = useDashboardAppSelector((state) => state.personal_data.data);
  const [pdata, setPdata] = useState(personal_data);
  // setPdata key and value.
  const formChange = (field: FormData) => {
    setPdata({ ...pdata, [field.name]: field.value.trim() });
  };
  // submit data
  const formSubmit = () => {
    dispatch(postUserdata(pdata));
    props.setEditMode(false); // tell parent component we're done editing
  };

  return (
    <Form
      id="personaldataview-form"
      role="form"
      onChange={(e) => {
        formChange(e.target as unknown as FormData);
      }}
      onSubmit={props.handleSubmit(formSubmit)}
    >
      <div className="name-inputs">
        {props.isVerifiedNin ? <RenderLockedNames names={names} /> : <RenderEditableNames names={names} />}
      </div>
      <Field
        component={CustomInput}
        required={true}
        componentClass="input"
        type="text"
        name="display_name"
        label={names.display}
        placeholder={names.display}
        helpBlock={translate("pd.display_name_input_help_text")}
      />
      <Field
        component={CustomInput}
        required={true}
        name="language"
        selectOptions={available_languages}
        label={translate("pd.language")}
      />
      <RenderSavePersonalDataButton {...props} />
    </Form>
  );
};

const DecoratedPersonalDataForm = reduxForm({
  form: "personal_data",
  destroyOnUnmount: false,
  enableReinitialize: true, // When set to true, the form will reinitialize every time the initialValues prop changes
  keepDirtyOnReinitialize: true, // keep user edits to the value even if initialValues prop changes
  updateUnregisteredFields: true,
  validate: validatePersonalData, // TODO: move the validator into this file?
  touchOnChange: true,
})(PersonalDataForm);

const FinalPersonalDataForm = connect((state: DashboardRootState) => ({
  initialValues: state.personal_data.data,
}))(DecoratedPersonalDataForm);

export default FinalPersonalDataForm;
