import { Field } from "react-final-form";
import { FormattedMessage } from "react-intl";

export function ChangePasswordRadioOption(props: {
  readonly handleSwitchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly renderSuggested: boolean;
}) {
  return (
    <fieldset className="toggle-change-password-options">
      <legend className="require">
        <FormattedMessage defaultMessage="Choose an option" description="Change password radio group legend" />
      </legend>
      <div className="radio-input-container">
        <label htmlFor="suggested password">
          <Field
            name="change password"
            component="input"
            type="radio"
            id="suggested-pw"
            checked={props.renderSuggested}
            onChange={props.handleSwitchChange}
          />
          <span>
            <FormattedMessage defaultMessage="Suggested password" description="suggested password radio button" />
          </span>
        </label>
        <label htmlFor="custom password">
          <Field
            name="change password"
            component="input"
            type="radio"
            id="custom-pw"
            checked={!props.renderSuggested}
            onChange={props.handleSwitchChange}
          />
          <span>
            <FormattedMessage defaultMessage="Set your own password" description="Set your own password radio button" />
          </span>
        </label>
      </div>
    </fieldset>
  );
}
