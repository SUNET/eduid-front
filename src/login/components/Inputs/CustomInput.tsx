import React, { Fragment } from "react";
import { FieldRenderProps } from "react-final-form";
import { Input } from "reactstrap";
import { InputWrapper } from "./InputWrapper";

export default function CustomInput(props: FieldRenderProps<string>): JSX.Element {
  // the InputWrapper renders it's children plus a label, helpBlock and any error message from the field validation
  return (
    <InputWrapper {...props}>
      <InputElement {...props} valid={props.meta.valid} invalid={props.meta.invalid} />
    </InputWrapper>
  );
}

const InputElement = (props: FieldRenderProps<string>): JSX.Element => {
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
      placeholder={props.placeholder}
      valid={input.value !== "" && valid}
      aria-required={input.required}
      invalid={props.invalid}
      {...input}
      autoFocus={props.autoFocus}
    />
  );
};
