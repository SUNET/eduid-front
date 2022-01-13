import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { FormGroup, FormText, Input, Label } from "reactstrap";
import i18n from "../../translation/InjectIntl_HOC_factory";
import InputToggleShowHide from "./InputToggleShowHide";
import { PasswordInputElement } from "./PasswordInput";

const RenderLabelAndHelpText = (props) => {
  const { label, name, helpBlock, required } = props;
  return (
    <div className={"input-label-helptext-container"}>
      {label && (
        <Label aria-required="true" htmlFor={name}>
          {label}
          {required && <span className="label-required">*</span>}
        </Label>
      )}
      {helpBlock && <span className={"help-block"}>{helpBlock}</span>}
    </div>
  );
};

const RenderErrorMessage = (props) => {
  const { meta, translate, invalid } = props;
  const errmsg = (invalid && translate(meta.error)) || "";
  return (
    errmsg && (
      <FormText>
        <span role="alert" aria-invalid="true" tabIndex="0" className="input-validate-error">
          {errmsg}
        </span>
      </FormText>
    )
  );
};

const RenderInput = (props) => {
  const {
    input,
    name,
    selectOptions,
    type,
    disabled,
    placeholder,
    valid,
    invalid,
    autoComplete,
    autoFocus,
    ariaLabel,
    required,
  } = props;
  if (selectOptions) {
    const renderSelectLanguage = selectOptions.map((option, index) => {
      return (
        <Fragment key={index}>
          <label key={option[0]} htmlFor={option[1]}>
            <input
              className={props.meta.error && props.meta.visited ? "radio-input error" : "radio-input"}
              key={option[0]}
              id={option[1]}
              type="radio"
              {...input}
              value={option[0]}
              checked={option[0] === input.value}
            />
            <span key={index}>{option[1]}</span>
          </label>
        </Fragment>
      );
    });

    return <div className="radio-input-container">{renderSelectLanguage}</div>;
  } else {
    return (
      <Input
        type={type}
        disabled={disabled}
        id={name}
        placeholder={placeholder}
        name={name}
        valid={input.value !== "" && valid}
        invalid={invalid}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        aria-label={ariaLabel}
        aria-required={required}
        required={required}
        {...input}
      />
    );
  }
};

const customInput = (props) => {
  const { meta, input } = props;

  let valid = false,
    invalid = false;

  if (meta.touched || meta.submitFailed) {
    if (meta.error) {
      invalid = true;
    } else {
      valid = true;
    }
  }

  return (
    <FormGroup id={`${input.name}-wrapper`}>
      <RenderLabelAndHelpText {...props} name={input.name} />
      {input.name === "current-password" ? (
        <PasswordInputElement {...props} name={input.name} valid={valid} invalid={invalid} id={input.name} />
      ) : input.name === "current-password" ? (
        <InputToggleShowHide {...props} name={input.name} valid={valid} invalid={invalid} />
      ) : (
        <RenderInput {...props} name={input.name} valid={valid} invalid={invalid} />
      )}
      <RenderErrorMessage {...props} name={input.name} valid={valid} invalid={invalid} />
    </FormGroup>
  );
};

customInput.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  meta: PropTypes.object,
  input: PropTypes.object,
  name: PropTypes.string,
  selectOptions: PropTypes.array,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  valid: PropTypes.bool,
  invalid: PropTypes.bool,
  translate: PropTypes.func,
};

export default i18n(customInput);
