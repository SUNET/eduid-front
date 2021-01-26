import React, { Component, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Form from "reactstrap/lib/Form";
import EduIDButton from "components/EduIDButton";
import CustomInput from "../login/components/Inputs/CustomInput";
import "../login/styles/index.scss";
import { emptyStringPattern } from "../login/app_utils/validation/regexPatterns";

/* FORM */

const validatePersonalData = (values, props) => {
  const errors = {};
  ["given_name", "surname", "display_name", "language"].forEach((inputName) => {
    if (!values[inputName] || emptyStringPattern.test(values[inputName])) {
      errors[inputName] = "required";
    }
    //none of the fields value properties differ from their initial properties will get error message.
    else if(props.pristine){
      errors[inputName] = "value not changed";
    }
    else if(values[inputName].trim() === props.initialValues[inputName]){
      errors[inputName] = "value not changed";
    }
  });
  return errors;
};

let PdataForm = (props) => {
  // button status, defalut is false
  const [isDisable, setIsDisable] = useState(false);
  // personal data, default data is empty object
  const [pdata, setPdata] = useState({});
  // After rendering, useEffect will check [] parameter against the values from the last render, and will call effect function if any one of them has changed.
  // if all the updateded values are matched with initial values, button will be disabled.
  useEffect(()=>{
    setPdata(props.data)
  }, [props.data])
  
  useEffect(() => {
    if(pdata.given_name === props.initialValues.given_name && 
      pdata.surname === props.initialValues.surname && 
      pdata.display_name === props.initialValues.display_name &&
      pdata.language === props.initialValues.language){ 
        setIsDisable(true)
      } else setIsDisable(false)
  }, [pdata, isDisable]);
  
  // if field value is present, setPdata key and value.
  const handleFormChange = (field)=> {
    if(field.value){
      setPdata({...pdata,[field.name]: field.value.trim()})
    }else setPdata({pdata});
  };
  
  return (
    <Form id="personaldataview-form" role="form" onChange={(e)=>handleFormChange(e.target)}>
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
        disabled={props.pristine || props.submitting || isDisable}
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
