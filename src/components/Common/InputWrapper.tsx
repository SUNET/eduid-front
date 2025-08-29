import { useIntl } from "react-intl";
import { CustomInputProps } from "./CustomInput";

/**
 * Render an input with an optional label and help text, and an error message when validation fails.
 */
export function InputWrapper(props: CustomInputProps<string>): React.JSX.Element {
  return (
    <div id={`${props.input.name}-wrapper`} className="form-group form-wrapper">
      <RenderLabelAndHelpText {...props} />
      {props.children}
      <RenderErrorMessage {...props} />
    </div>
  );
}

function RenderLabelAndHelpText(props: CustomInputProps<string>): React.JSX.Element {
  const { input, label, helpBlock, required } = props;
  return (
    <div className="input-label-help-text-container">
      {label && (
        <label htmlFor={input.name} className={required ? "required" : ""}>
          {label}
        </label>
      )}
      {helpBlock && <span className="help-block">{helpBlock}</span>}
    </div>
  );
}

function RenderErrorMessage(props: CustomInputProps<string>): React.JSX.Element | null {
  const intl = useIntl();
  const { meta } = props;
  if ((!meta.error && !meta.submitError && !props.passwordStrengthMeter) || (!meta.touched && !meta.dirty)) {
    // no error, no message only for !props.passwordStrengthMeter
    return null;
  }

  const errorMsg = meta.error ? intl.formatMessage({ id: meta.error }) : null;
  let submitErrorMsg = null;
  if (meta.submitError && !meta.dirtySinceLastSubmit) {
    submitErrorMsg = intl.formatMessage({ id: meta.submitError }) || null;
  }

  return (
    <div>
      <span role="alert" aria-invalid="true" tabIndex={-1} className="input-validate-error">
        {errorMsg || submitErrorMsg}
      </span>
      {props.passwordStrengthMeter ? props.passwordStrengthMeter : null}
    </div>
  );
}
