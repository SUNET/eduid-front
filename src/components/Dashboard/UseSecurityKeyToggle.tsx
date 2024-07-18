import { postSecurityKeyPreference, PreferencesData } from "apis/eduidPersonalData";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { AuthenticateModal } from "./Authenticate";

export default function UseSecurityKeyToggle(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const always_use_security_key = useAppSelector(
    (state: any) => state.personal_data?.response?.preferences?.always_use_security_key
  );
  const [showAuthnModal, setShowAuthnModal] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(always_use_security_key);

  useEffect(() => {
    setSwitchChecked(always_use_security_key);
  }, [always_use_security_key]);

  async function handleSwitchChange() {
    setSwitchChecked(!switchChecked);
    if (switchChecked !== undefined) {
      const response = await dispatch(postSecurityKeyPreference({ always_use_security_key: !switchChecked }));
      if (postSecurityKeyPreference.rejected.match(response)) {
        if ((response?.payload as { payload: PreferencesData }).payload.message === "authn_status.must-authenticate") {
          setSwitchChecked(always_use_security_key);
          setShowAuthnModal(true);
        }
      }
    }
  }

  return (
    <>
      {/* always_use_security_key toggle button */}
      <fieldset>
        <form>
          <label className="toggle flex-between" htmlFor="security-key-mfa">
            <legend>
              <FormattedMessage defaultMessage={`Activate 2FA`} description="Security key toggle" />
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
