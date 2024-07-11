import { postSecurityKeyPreference } from "apis/eduidPersonalData";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { AuthenticateModal } from "./Authenticate";

export default function UseSecurityKeyToggle(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const always_use_security_key = useAppSelector(
    (state) => state.personal_data?.response?.preferences?.always_use_security_key
  );
  const [switchChecked, setSwitchChecked] = useState(always_use_security_key);
  const [showAuthnModal, setShowAuthnModal] = useState(false);

  async function handleSwitchChange() {
    // Easiest way to understand the logic in this function is to store the old switch status here.
    const newChecked = !switchChecked;
    const response = await dispatch(postSecurityKeyPreference({ always_use_security_key: newChecked }));

    if (postSecurityKeyPreference.rejected.match(response)) {
      if ((response?.payload as any).payload.message === "authn_status.must-authenticate") {
        setShowAuthnModal(true);
      }
    } else {
      setSwitchChecked(newChecked);
    }
  }

  // this would not be necessary if the component reacts directly from the value always_use_security_key in store
  useEffect(() => {
    setSwitchChecked(always_use_security_key);
  }, [always_use_security_key]);

  return (
    <>
      {/* always_use_security_key toggle button */}
      {switchChecked !== undefined && (
        <fieldset>
          <form>
            <label className="toggle flex-between" htmlFor="security-key-mfa">
              <legend>
                <FormattedMessage
                  defaultMessage={`Always use a security key for MFA`}
                  description="Security key toggle"
                />
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
          </form>
        </fieldset>
      )}
      <AuthenticateModal
        action="changeSecurityPreferencesAuthn"
        dispatch={dispatch}
        showModal={showAuthnModal}
        setShowModal={setShowAuthnModal}
        mainText={
          <FormattedMessage
            description="change Security key setting preference"
            defaultMessage="To change your security key settings preference, you'll have to log in again,and then try to toggle the button again."
          />
        }
      />
    </>
  );
}
