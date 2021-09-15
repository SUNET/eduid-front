import React, { Fragment } from "react";
import { Field } from "redux-form";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "./CustomInput";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";
import PropTypes from "prop-types";

export let RadioInputElement = (props) => {
  console.log("props RadioInputElement ", props);
  const { selectOptions, type, meta, input, initialValues } = props;
  const { error, visited } = meta;
  const { onChange, value, checked } = input;
  return (
    <div className="radio-input-container">
      {selectOptions.map((option, i) => {
        let langCode = option[0];
        let langLabel = option[1];
        return (
          <label key={i} htmlFor={langLabel}>
            <input
              type={type}
              {...input}
              id={langLabel}
              // onChange={onChange}
              value={langCode}
              checked={langCode === initialValues.language || langCode}
              // className={error && visited ? "radio-input error" : "radio-input"}
            />
            <span>{langLabel}</span>
          </label>
        );
      })}
    </div>
  );
};

let LanguageRadioInput = (props) => {
  return (
    <Field
      required={props.required}
      label={props.translate("pd.language")}
      componentClass="input"
      type="radio"
      name="language"
      component={CustomInput}
      selectOptions={props.selectOptions}
      {...props}
    />
  );
};

LanguageRadioInput.propTypes = {
  translate: PropTypes.func.isRequired,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

export default InjectIntl(LanguageRadioInput);
