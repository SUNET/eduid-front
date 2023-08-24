import React from "react";
import { FieldRenderProps } from "react-final-form";
import { useIntl } from "react-intl";
import { FormGroup, FormText, Input, Label } from "reactstrap";

interface TextInputProps extends FieldRenderProps<string> {
  label?: string;
  helpBlock?: React.ReactNode;
  disabled?: boolean;
  autoComplete?: string;
}

export default function TextInput(props: TextInputProps) {
  const intl = useIntl();
  const { label, helpBlock } = props;
  let valid = false,
    invalid = false;
  if (props.meta.touched || props.meta.submitFailed) {
    invalid = Boolean(props.meta.error);
    valid = !invalid;
  }

  const errorMsg = (invalid && intl.formatMessage({ id: props.meta.error })) || "";
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
    <FormGroup id={`${props.input.name}-wrapper`}>
      {label && (
        <Label for={props.input.name} aria-label={props.input.name}>
          {label}
        </Label>
      )}
      <Input
        id={props.input.name}
        valid={valid}
        invalid={invalid}
        type={props.type}
        {...props.input}
        disabled={props.disabled}
        autoComplete={props.autoComplete}
      />
      {help}
    </FormGroup>
  );
}
