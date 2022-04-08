import React, { useEffect, useState } from "react";
import { fetchNewDevice } from "apis/eduidLogin";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import loginSlice from "login/redux/slices/loginSlice";
import { FormattedMessage } from "react-intl";
import { LoginAppDispatch } from "login/app_init/initStore";

/* Not exported - keep all use through functions in this module */
const THIS_DEVICE_KEY = "login.device";
const REMEMBER_ME_KEY = "login.remember_me";

/**
 * Fetch the "new device" endpoint from the backend, and store it in local storage.
 */
export function NewDevice(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const ref = useAppSelector((state) => state.login.ref);

  useEffect(() => {
    async function getKnownDevice(): Promise<void> {
      if (ref) {
        const response = await dispatch(fetchNewDevice({ ref }));
        if (fetchNewDevice.fulfilled.match(response)) {
          const thisDevice = response.payload.new_device;
          if (window.localStorage) {
            window.localStorage.setItem(THIS_DEVICE_KEY, thisDevice);
          }
          // trigger another request to /next
          dispatch(loginSlice.actions.callLoginNext());
        }
      }
    }

    getKnownDevice();
  }, []);

  /* For now, we don't render anything here but just prime local storage with a known_device.
   * In a later version, we will likely ask for a username here, and solve a captcha...
   */
  return null;
}

/**
 * Component rendering a checkbox allowing the user to decide if they want to be remembered on this device or not.
 */
export function RememberMeCheckbox(): JSX.Element | null {
  const remember_me = useAppSelector((state) => state.login.remember_me);
  const previous_this_device = useAppSelector((state) => state.login.previous_this_device);
  const next_page = useAppSelector((state) => state.login.next_page);
  const [switchChecked, setSwitchChecked] = useState(remember_me);
  const dispatch = useAppDispatch();

  function handleSwitchChange(): void {
    const newValue = !switchChecked;
    setSwitchChecked(newValue);
    if (window.localStorage) {
      window.localStorage.setItem(REMEMBER_ME_KEY, JSON.stringify(newValue));
    }
    dispatch(loginSlice.actions.setRememberMe(newValue));
    if (newValue === true && previous_this_device) {
      // if the user toggled 'remember me' to off, and then back to on again, we restore the
      // state.login.this_device from state.login.previous_this_device
      dispatch(loginSlice.actions.addThisDevice(previous_this_device));
    }
    if (newValue === false) {
      forgetThisDevice(dispatch);
    }
    // re-fetch '/next' now that the conditions for logging in has changed
    dispatch(loginSlice.actions.callLoginNext());
  }

  // Update the switch to reflect changes in remember_me
  useEffect(() => {
    if (remember_me !== undefined) {
      setSwitchChecked(remember_me);
    }
  }, [remember_me]);

  if (!window.localStorage || remember_me === undefined) {
    // Might as well not even show the 'remember me' checkbox if there is no local storage.
    // If remember_me is undefined it means the login app hasn't been initialised yet.
    return null;
  }

  if (!next_page || next_page === "TOU" || next_page == "OTHER_DEVICE") {
    // Don't show this component on some screens, or before next_page is initialised
    return null;
  }

  return (
    <React.Fragment>
      <fieldset>
        <label className="toggle flex-between" htmlFor="remember-me">
          <span>
            <FormattedMessage defaultMessage="Remember me on this device" description="Login remember user device" />
          </span>
          <input
            onChange={handleSwitchChange}
            className="toggle-checkbox"
            type="checkbox"
            checked={switchChecked}
            id="remember-me"
          />
          <div className="toggle-switch"></div>
        </label>
      </fieldset>
      {!switchChecked && (
        <p className="help-text">
          <FormattedMessage
            defaultMessage="Allowing eduID to remember you on this device makes logging in easier and more secure"
            description="Login remember user device"
          />
        </p>
      )}
    </React.Fragment>
  );
}

interface KnownDeviceParams {
  this_device?: string;
  remember_me: boolean;
}

/**
 * If this_device and remember_me haven't been set in redux state yet, initialise them from local storage.
 */
export function initKnownDevice(
  this_device: string | undefined,
  remember_me: boolean | undefined,
  dispatch: LoginAppDispatch
): KnownDeviceParams {
  if (!window.localStorage) {
    // Can't remember devices if there is no local storage
    dispatch(loginSlice.actions.setRememberMe(false));
    return { this_device: undefined, remember_me: false };
  }

  if (!this_device) {
    // try to initialise this_device from local storage
    this_device = window.localStorage.getItem(THIS_DEVICE_KEY) || undefined;
    if (this_device) {
      dispatch(loginSlice.actions.addThisDevice(this_device));
    }
  }

  if (remember_me === undefined) {
    // try to initialise remember_me from local storage
    const _remember_me = window.localStorage.getItem(REMEMBER_ME_KEY) || "true";
    remember_me = !!JSON.parse(_remember_me);
    dispatch(loginSlice.actions.setRememberMe(remember_me));
  }

  return { this_device, remember_me };
}

/**
 * Forget the device identifier in local storage, and retire it in redux state.
 * Retire means that it is retained in memory to allow the user to revert the decision to forget it.
 *
 */
export function forgetThisDevice(dispatch: LoginAppDispatch) {
  if (window.localStorage) {
    window.localStorage.removeItem(THIS_DEVICE_KEY);
  }
  dispatch(loginSlice.actions.clearThisDevice());
}
