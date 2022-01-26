import { translate } from "login/translation";
import React, { Fragment } from "react";
import { FieldRenderProps } from "react-final-form";
import { FormGroup, FormText, Input, Label } from "reactstrap";
import { PasswordInputElement } from "./PasswordInput";

interface CustomInputProps extends FieldRenderProps<string> {
  label?: string;
  helpBlock?: React.ReactNode;
  disabled?: boolean;
  autocomplete?: string;
}

export default function CustomInput(props: FieldRenderProps<string>): JSX.Element {
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
        <PasswordInputElement {...props} name={input.name} id={input.name} valid={valid} invalid={invalid} />
      ) : (
        <InputElement {...props} valid={valid} invalid={invalid} />
      )}
      <RenderErrorMessage {...props} name={input.name} valid={valid} invalid={invalid} />
    </FormGroup>
  );
}

const RenderLabelAndHelpText = (props: CustomInputProps): JSX.Element => {
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

const RenderErrorMessage = (props: CustomInputProps): JSX.Element => {
  const { meta, invalid } = props;
  const errmsg = (invalid && translate(meta.error)) || "";
  return (
    errmsg && (
      <FormText>
        <span role="alert" aria-invalid="true" tabIndex={0} className="input-validate-error">
          {errmsg}
        </span>
      </FormText>
    )
  );
};

const InputElement = (props: CustomInputProps): JSX.Element => {
  const { input, selectOptions, valid } = props;
  if (selectOptions) {
    const renderSelect = selectOptions.map((option: string[], index: number) => {
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

    return <div className="radio-input-container">{renderSelect}</div>;
  }
  return (
    <Input
      id={input.name}
      type={props.type}
      valid={input.value !== "" && valid}
      aria-required={input.required}
      {...input}
    />
  );
};
