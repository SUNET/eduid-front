import React, { HTMLInputTypeAttribute } from "react";
import { FieldRenderProps } from "react-final-form";
import { useIntl } from "react-intl";
import { dynamicMessage } from "translation";

interface TextInputProps extends FieldRenderProps<string> {
  label?: string;
  helpBlock?: React.ReactNode;
  disabled?: boolean;
  autoComplete?: string;
  type?: HTMLInputTypeAttribute;
  onFocus?: () => void;
}

export function TextInput({ label, helpBlock, meta, disabled, input, autoComplete, type }: Readonly<TextInputProps>) {
  const intl = useIntl();
  let className = "is-valid";
  if (meta.touched || meta.submitFailed) {
    if (meta.invalid) {
      className = "is-invalid";
    }
  }
  if (disabled) {
    className = "disabled";
  }

  const errorMsg = (Boolean(meta.invalid) && dynamicMessage(intl, meta.error)) || "";
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
    <div id={`${input.name}-wrapper`} className="form-group form-wrapper">
      {label && (
        <label htmlFor={input.name} aria-label={input.name}>
          {label}
        </label>
      )}
      <input
        id={input.name}
        className={`${className}`}
        type={type}
        {...input}
        disabled={disabled}
        autoComplete={autoComplete}
      />
      {help}
    </div>
  );
}
