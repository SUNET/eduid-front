import personalDataApi from "apis/eduidPersonalData";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import authnSlice from "slices/Authn";

export default function UseSecurityKeyToggle(): React.JSX.Element | null {
  const dispatch = useAppDispatch();
  const always_use_security_key = useAppSelector(
    (state: any) => state.personal_data?.response?.preferences?.always_use_security_key
  );
  const [switchChecked, setSwitchChecked] = useState(always_use_security_key);
  const frontend_action = useAppSelector((state: any) => state.authn.response?.frontend_action);
  const [postSecurityKeyPreference, preference] = personalDataApi.usePostSecurityKeyPreferenceMutation();

  useEffect(() => {
    setSwitchChecked(always_use_security_key);
  }, [always_use_security_key]);

  useEffect(() => {
    if (!preference.isLoading) {
      setSwitchChecked(always_use_security_key);
    }
  }, [preference.isLoading]);

  useEffect(() => {
    // without checking for re_authenticate it will loop because makeGenericRequest() sets frontend_action
    if (frontend_action === "changeSecurityPreferencesAuthn") {
      handleSwitchChange();
    }
  }, [frontend_action]);

  async function handleSwitchChange() {
    dispatch(authnSlice.actions.setAuthnFrontendReset());
    setSwitchChecked(!switchChecked);
    if (switchChecked !== undefined) {
      postSecurityKeyPreference({ always_use_security_key: !switchChecked });
    }
  }

  return (
    <form>
      {/* always_use_security_key toggle button */}
      <fieldset className="border-toggle-area">
        <label className="toggle" htmlFor="security-key-mfa">
          <legend>
            <FormattedMessage
              defaultMessage={`Always use a security key to log in`}
              description="Security key toggle"
            />
            <p className="help-text">
              <FormattedMessage
                description="help text toggle 2FA"
                defaultMessage="If turned off you only need to use your security key for services that require extra login verification."
              />
            </p>
          </legend>
          <input
            onChange={handleSwitchChange}
            className="toggle-checkbox"
            type="checkbox"
            checked={switchChecked}
            id="security-key-mfa"
          />
          <div className="toggle-switch"></div>
        </label>
      </fieldset>
    </form>
  );
}
