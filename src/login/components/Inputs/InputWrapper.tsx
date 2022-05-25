import { translate } from "login/translation";
import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormGroup, FormText, Label } from "reactstrap";

interface InputWrapperProps extends FieldRenderProps<string> {
  label?: string; // label shown above input
  helpBlock?: React.ReactNode; // help text show above input
  //   disabled?: boolean;
  //   autocomplete?: string;
  children?: React.ReactNode;
}

/**
 * Render an input with an optional label and help text, and an error message when validation fails.
 */
export default function InputWrapper(props: InputWrapperProps): JSX.Element {
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
        <Label aria-required="true" htmlFor={input.name}>
          {label}
          {required && <span className="label-required">*</span>}
        </Label>
      )}
      {helpBlock && <span className="help-block">{helpBlock}</span>}
    </div>
  );
}

function RenderErrorMessage(props: InputWrapperProps): JSX.Element | null {
  const { meta } = props;

  if (!meta.error) {
    // no error, no message
    return null;
  }

  if (meta.pristine) {
    // not changed from initial value, don't show an error
    return null;
  }

  const errorMsg = translate(meta.error) || "";
  return (
    <FormText>
      <span role="alert" aria-invalid="true" tabIndex={0} className="input-validate-error">
        {errorMsg}
      </span>
    </FormText>
  );
}
