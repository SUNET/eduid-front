import { fetchNext, fetchUseOtherDevice } from "apis/eduidLogin";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import ButtonPrimary from "login/components/Buttons/ButtonPrimary";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory, useParams } from "react-router-dom";

// URL parameters passed to this component
interface UseOtherParams {
  state_id?: string;
}

// This is the page rendered by the link in the QR code, so this is on device #2
function LoginOtherDevice() {
  const other = useAppSelector((state) => state.login.other_device2);
  const base_url = useAppSelector((state) => state.config.base_url);
  const params = useParams() as UseOtherParams;
  const dispatch = useAppDispatch();

  let state_id: string | undefined;

  if (!other || (other.data.login_ref == undefined && params.state_id !== undefined)) {
    state_id = params.state_id; // need ref below too
  }

  useEffect(() => {
    // Fetching authn_options depends on state.config being loaded first (base_url being set)
    if (base_url && state_id) {
      dispatch(fetchUseOtherDevice({ state_id: state_id }));
    }
  }, [base_url, state_id]);

  return (
    <div className="use-other-device">
      <h2 className="heading">
        <FormattedMessage defaultMessage="Log in on another device" />
      </h2>
      {other && <RenderOtherDeviceInfo />}
    </div>
  );
}

function RenderOtherDeviceInfo(): JSX.Element {
  const other = useAppSelector((state) => state.login.other_device2);

  return (
    <div className="use-other-device-info">
      {other === undefined ? (
        <p>
          <FormattedMessage defaultMessage="The request was not found, or has expired" />
        </p>
      ) : (
        <>
          <p>
            <FormattedMessage defaultMessage="You are using this device to log in on another device" />
          </p>
          <p>DEBUG: expires in {other.data.expires_in}</p>
          <p>DEBUG: ref {other.data.login_ref}</p>
          <ProceedLoginButton />
        </>
      )}
    </div>
  );
}

function ProceedLoginButton(): JSX.Element | null {
  const other = useAppSelector((state) => state.login.other_device2);
  const dispatch = useAppDispatch();
  const history = useHistory();

  function handleOnClick() {
    if (other && other.data && other.data.login_ref) {
      dispatch(fetchNext({ ref: other.data.login_ref }));
      // Send the user off to the regular login flow when they click the button
      history.push(`/login/${other.data.login_ref}`);
    }
  }

  return (
    <ButtonPrimary
      type="submit"
      onClick={handleOnClick}
      id="proceed-other-device-button"
      className={"settings-button"}
      disabled={!other}
    >
      <FormattedMessage defaultMessage="Log in the other device" description="Login OtherDevice" />
    </ButtonPrimary>
  );
}

export default LoginOtherDevice;
