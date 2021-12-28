import { fetchUseOtherDevice } from "apis/eduidLogin";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";

// This is the page rendered at the end of the "login on another device" login flow, on device 2.
function LoginOtherDeviceFinish() {
  const other = useAppSelector((state) => state.login.other_device2);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // refresh other_device2 state on component load
    if (other && other.state_id) {
      dispatch(fetchUseOtherDevice({ state_id: other.state_id }));
    }
  }, []);

  return (
    <div className="use-other-device">
      <h2 className="heading">
        <FormattedMessage defaultMessage="Finished logging in" />
      </h2>

      <div className="use-other-device-finished">
        {other === undefined ? (
          <p>
            <FormattedMessage defaultMessage="The request was not found, or has expired" />
          </p>
        ) : (
          <>
            <p>
              <FormattedMessage defaultMessage="You are finished" />
            </p>
            <p>DEBUG: expires in {other.data.expires_in}</p>
            <p>DEBUG: ref {other.data.login_ref}</p>
            <p>JSON: {JSON.stringify(other)}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginOtherDeviceFinish;
