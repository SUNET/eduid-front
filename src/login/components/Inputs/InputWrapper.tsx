import React from "react";
import { FieldRenderProps } from "react-final-form";
import { useIntl } from "react-intl";
import { FormGroup, FormText, Label } from "reactstrap";

export interface InputWrapperProps extends FieldRenderProps<string> {
  label?: string; // label shown above input
  helpBlock?: React.ReactNode; // help text show above input
  autoComplete?: "current-password" | "new-password" | "username";
  children?: React.ReactNode;
}

/**
 * Render an input with an optional label and help text, and an error message when validation fails.
 */
export function InputWrapper(props: InputWrapperProps): JSX.Element {
  return (
    <FormGroup id={`${props.input.name}-wrapper`}>
      <RenderLabelAndHelpText {...props} />
      {props.children}
      <RenderErrorMessage {...props} />
    </FormGroup>
  );
}

function RenderLabelAndHelpText(props: InputWrapperProps): JSX.Element {
  const { input, label, helpBlock, required } = props;
  return (
    <div className="input-label-help-text-container">
      {label && (
        <Label htmlFor={input.name} className={required && "required"}>
          {label}
        </Label>
      )}
      {helpBlock && <span className="help-block">{helpBlock}</span>}
    </div>
  );
}

function RenderErrorMessage(props: InputWrapperProps): JSX.Element | null {
  const intl = useIntl();
  const { meta } = props;

  if (!meta.error && !meta.submitError) {
    // no error, no message
    return null;
  }

  const errorMsg = meta.error ? intl.formatMessage({ id: meta.error }) : null;
  let submitErrorMsg = null;
  if (meta.submitError && !meta.dirtySinceLastSubmit) {
    submitErrorMsg = intl.formatMessage({ id: meta.submitError }) || null;
  }

  return (
    <FormText>
      <span role="alert" aria-invalid="true" tabIndex={0} className="input-validate-error">
        {errorMsg || submitErrorMsg}
      </span>
    </FormText>
  );
}
