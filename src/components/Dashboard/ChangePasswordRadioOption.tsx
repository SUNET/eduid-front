import { Field } from "react-final-form";
import { FormattedMessage } from "react-intl";

interface ChangePasswordRadioOptionProps {
  readonly handleSwitchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly renderSuggested: boolean;
}

export function ChangePasswordRadioOption(props: ChangePasswordRadioOptionProps) {
  return (
    <fieldset className="toggle-change-password-options">
      <legend className="require">
        <strong>
          <FormattedMessage defaultMessage="Choose an option" description="Change password radio group legend" />
        </strong>
      </legend>
      <div className="radio-input-container">
        <label htmlFor="suggested-pw">
          <Field
            name="suggested-password"
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
        <label htmlFor="custom-pw">
          <Field
            name="custom-password"
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
