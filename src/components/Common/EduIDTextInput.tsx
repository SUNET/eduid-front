import React from "react";
import { FieldRenderProps } from "react-final-form";
import { useIntl } from "react-intl";

interface TextInputProps extends FieldRenderProps<string> {
  label?: string;
  helpBlock?: React.ReactNode;
  disabled?: boolean;
  autoComplete?: string;
}

export default function TextInput(props: TextInputProps) {
  const intl = useIntl();
  const { label, helpBlock } = props;
  let className = "is-valid";
  if (props.meta.touched || props.meta.submitFailed) {
    if (props.meta.invalid) {
      className = "is-invalid";
    }
  }
  if (props.disabled) {
    className = "disabled";
  }

  const errorMsg = (Boolean(props.meta.invalid) && intl.formatMessage({ id: props.meta.error })) || "";
  let help = <div>{helpBlock}</div>;
  if (errorMsg !== "") {
    const feedback = <span className="eduid-field-error">{errorMsg}</span>;
    help = (
      <div>
        {feedback} {helpBlock && "|"} {helpBlock}
      </div>
    );
  }
  return (
    <div id={`${props.input.name}-wrapper`} className="form-group form-wrapper">
      {label && (
        <label htmlFor={props.input.name} aria-label={props.input.name}>
          {label}
        </label>
      )}
      <input
        id={props.input.name}
        className={`${className}  form-control`}
        // className={invalid || props.disabled ? "form-control" : "is-valid form-control"}
        type={props.type}
        {...props.input}
        disabled={props.disabled}
        autoComplete={props.autoComplete}
      />
      {help}
    </div>
  );
}
