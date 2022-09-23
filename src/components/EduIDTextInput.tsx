import { translate } from "login/translation";
import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormGroup, FormText, Input, Label } from "reactstrap";

interface TextInputProps extends FieldRenderProps<string> {
  label?: string;
  helpBlock?: React.ReactNode;
  disabled?: boolean;
  autocomplete?: string;
}

export default function TextInput(props: TextInputProps) {
  const { label, helpBlock } = props;
  console.log("label", label);
  console.log("props", props.name);
  console.log("props input name", props.input.name);
  let valid = false,
    invalid = false;
  if (props.meta.touched || props.meta.submitFailed) {
    invalid = Boolean(props.meta.error);
    valid = !invalid;
  }
  const errorMsg = (invalid && translate(props.meta.error)) || "";
  let help = <FormText>{helpBlock}</FormText>;
  if (errorMsg !== "") {
    const feedback = <span className="eduid-field-error">{errorMsg}</span>;
    help = (
      <FormText>
        {feedback} {helpBlock && "|"} {helpBlock}
      </FormText>
    );
  }

  return (
    <FormGroup id={props.input.name}>
      {label && <Label for={props.input.name}>{label}</Label>}
      <Input
        id={props.name}
        valid={valid}
        invalid={invalid}
        type={props.type}
        {...props.input}
        disabled={props.disabled}
        autoComplete={props.autocomplete}
        aria-labelledby={props.input.name}
      />
      {help}
    </FormGroup>
  );
}
