import React, { Fragment } from "react";
import PropTypes from "prop-types";
import FormGroup from "reactstrap/lib/FormGroup";
import FormText from "reactstrap/lib/FormText";
import Input from "reactstrap/lib/Input";
import Label from "reactstrap/lib/Label";
import i18n from "../../translation/InjectIntl_HOC_factory";
import InputToggleShowHide from "./InputToggleShowHide";
import { PasswordInputElement } from "./PasswordInput";
import { RadioInputElement } from "./LanguageRadioInputs";

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
  // console.log("RenderErrorMessage props", props);
  // console.log("meta.error", meta.error);
  // console.log("translate(meta.error)", translate(meta.error));
  // console.log("translate(required)", translate("value not changed"));
  const errmsg = (invalid && translate(meta.error)) || "";
  // return null;
  return (
    errmsg && (
      <FormText>
        <span
          role="alert"
          aria-invalid="true"
          tabIndex="0"
          className="input-validate-error"
        >
          {errmsg}
        </span>
      </FormText>
    )
  );
};

const RenderInput = (props) => {
  const {
    input,
    // name,
    // selectOptions,
    // type,
    // disabled,
    // placeholder,
    // valid,
    // invalid,
    // autoComplete,
    // autoFocus,
    // ariaLabel,
    // required,
  } = props;
  // if (selectOptions) {
  //   const renderSelectLanguage = selectOptions.map((option, index) => {
  //     return (
  //       <Fragment key={index}>
  //         <label key={option[0]} htmlFor={option[1]}>
  //           <input
  //             className={
  //               props.meta.error && props.meta.visited
  //                 ? "radio-input error"
  //                 : "radio-input"
  //             }
  //             key={option[0]}
  //             id={option[1]}
  //             type="radio"
  //             {...input}
  //             value={option[0]}
  //             checked={option[0] === input.value}
  //           />
  //           <span key={index}>{option[1]}</span>
  //         </label>
  //       </Fragment>
  //     );
  //   });

  //   return <div className="radio-input-container">{renderSelectLanguage}</div>;
  // } else {
  return (
    <Input
      type={props.type}
      disabled={props.disabled}
      id={props.name}
      placeholder={props.placeholder}
      name={props.name}
      valid={props.input.value !== "" && props.valid}
      invalid={props.invalid}
      autoComplete={props.autoComplete}
      autoFocus={props.autoFocus}
      aria-label={props.ariaLabel}
      aria-required={props.required}
      required={props.required}
      {...input}
    />
  );
  //  }
};

const customInput = (props) => {
  const { meta, input, type } = props;

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
        <PasswordInputElement
          {...props}
          name={input.name}
          valid={valid}
          invalid={invalid}
        />
      ) : input.name.includes("password") ? (
        <InputToggleShowHide
          {...props}
          name={input.name}
          valid={valid}
          invalid={invalid}
        />
      ) : type === "radio" ? (
        <RadioInputElement
          {...props}
          name={input.name}
          valid={valid}
          invalid={invalid}
        />
      ) : (
        <RenderInput
          {...props}
          name={input.name}
          valid={valid}
          invalid={invalid}
        />
      )}
      <RenderErrorMessage
        {...props}
        name={input.name}
        valid={valid}
        invalid={invalid}
      />
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
