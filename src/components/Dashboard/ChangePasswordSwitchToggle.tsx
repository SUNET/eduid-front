import { FormattedMessage } from "react-intl";

export function ChangePasswordSwitchToggle(props: {
  readonly handleSwitchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly renderSuggested: boolean;
}) {
  return (
    <fieldset className="toggle-change-password-options">
      <form>
        <label className="toggle flex-between" htmlFor="change-custom-password">
          <legend>
            <FormattedMessage defaultMessage="Set your own password?" description="change custom password" />
          </legend>
          <input
            onChange={props.handleSwitchChange}
            className="toggle-checkbox"
            type="checkbox"
            checked={!props.renderSuggested}
            id="change-custom-password"
          />
          <div className="toggle-switch"></div>
        </label>
      </form>
      <p className="help-text">
        <FormattedMessage
          defaultMessage="Toggle the switch button to set your own password."
          description="Change password toggle"
        />
      </p>
    </fieldset>
  );
}
