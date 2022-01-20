import { translate } from "login/translation";
import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormGroup, FormText, Input, Label } from "reactstrap";

// TODO: This is the interface for additional parameters we pass here from the forms, through
//       react-final-form's Field. The FieldRenderProps allows them through as '[key: string]: any;'
//       but I can't get it to work if I try to add this interface to the type of the props argument.
interface TextInputProps {
  label?: string;
  helpBlock: React.ReactNode;
  disabled?: boolean;
  autocomplete?: string;
}

export default function TextInput(props: FieldRenderProps<string>) {
  const { label, helpBlock } = props;
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
      {label && <Label for={props.name}>{label}</Label>}
      <Input
        id={props.name}
        valid={valid}
        invalid={invalid}
        type={props.type}
        {...props.input}
        disabled={props.disabled}
        autoComplete={props.autocomplete}
      />
      {help}
    </FormGroup>
  );
}
