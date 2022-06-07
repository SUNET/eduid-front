import React, { Fragment } from "react";
import { FieldRenderProps } from "react-final-form";
import { InputWrapper } from "./InputWrapper";

export default function CustomInput(props: FieldRenderProps<string>): JSX.Element {
  // the InputWrapper renders it's children plus a label, helpBlock and any error message from the field validation
  return (
    <InputWrapper {...props}>
      <RadioInputElement {...props} />
    </InputWrapper>
  );
}

const RadioInputElement = (props: FieldRenderProps<string>): JSX.Element => {
  const { input, selectOptions } = props;
  let renderSelect = null;
  if (selectOptions) {
    renderSelect = selectOptions.map((option: string[], index: number) => {
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
  }
  return <div className="radio-input-container">{renderSelect}</div>;
};
