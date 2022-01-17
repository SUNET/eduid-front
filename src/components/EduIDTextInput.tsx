import { translate } from "login/translation";
import React, { Fragment } from "react";
import { FormGroup, FormText, Input, Label } from "reactstrap";

interface TextInputProps {
  label: string;
}

const TextInput = (props: TextInputProps) => {
  const { input, label, name, meta, selectOptions, type, disabled, helpBlock, placeholder } = props;
  let valid = false,
    invalid = false;
  if (meta.touched || meta.submitFailed) {
    if (meta.error) {
      invalid = true;
    } else {
      valid = true;
    }
  }
  const errmsg = (invalid && translate(meta.error)) || "";
  let help = <FormText>{helpBlock}</FormText>;
  if (errmsg !== "") {
    const feedback = <span className="eduid-field-error">{errmsg}</span>;
    help = (
      <FormText>
        {feedback} | {helpBlock}
      </FormText>
    );
  }

  let field;
  if (selectOptions) {
    const renderSelectLanguage = selectOptions.map((option, index) => {
      return (
        <Fragment key={index}>
          <label key={option[0]} htmlFor={option[1]}>
            <input
              className={"radio-input"}
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
    field = <div className="radio-input-container">{renderSelectLanguage}</div>;
  } else {
    field = (
      <Input
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        id={name}
        name={name}
        valid={valid}
        invalid={invalid}
        {...input}
      />
    );
  }
  let labelElem = null;
  if (label) {
    labelElem = <Label for={name}>{label}</Label>;
  }

  return (
    <FormGroup id={input.name}>
      {labelElem}
      {field}
      {help}
    </FormGroup>
  );
};

export default TextInput;
