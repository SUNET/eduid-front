import { fetchNext, fetchUseOtherDevice1, LoginUseOtherDevice1Response } from "apis/eduidLogin";
import { TimeRemainingWrapper } from "components/TimeRemaining";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import ButtonPrimary from "login/components/Buttons/ButtonPrimary";
import loginSlice from "login/redux/slices/loginSlice";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router";
import { ExpiresMeter } from "./ExpiresMeter";
import { ResponseCodeForm } from "./ResponseCodeForm";

/*
 * Start the "Login using another device" login flow.
 *
 * This component runs on device #1 and shows the QR code to the user. It then waits
 * for the user to submit a "response code" in a form, to complete the login on this device.
 */
function UseOtherDevice1() {
  const other_device = useAppSelector((state) => state.login.other_device1);
  const loginRef = useAppSelector((state) => state.login.ref);
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    if (loginRef && !other_device) {
      // refresh state on page reload
      dispatch(fetchUseOtherDevice1({ ref: loginRef }));
    }
  }, []);

  function handleCancelButtonOnClick() {
    // Exit from "use another device"
    dispatch(loginSlice.actions.stopLoginWithAnotherDevice());
    // Send the user off to the regular login flow when they click the button
    history.push(`/login/${loginRef}`);
  }

  let error = undefined;
  if (other_device) {
    if (other_device.state != "NEW" && other_device.state != "IN_PROGRESS") {
      if (other_device.state == "ABORTED") {
        error = <FormattedMessage defaultMessage="The request has been aborted" description="Use other device" />;
      } else {
        error = <FormattedMessage defaultMessage="The request is not valid anymore" description="Use other device" />;
      }
    }
  }

  return (
    <div className="use-another-device device1">
      <h2 className="heading">
        <FormattedMessage defaultMessage="Log in using another device" />
      </h2>

      {!error && other_device && <RenderOtherDevice1 data={other_device} />}
      {error && (
        <React.Fragment>
          <div role="alert" aria-invalid="true" tabIndex={0} className="input-validate-error">
            {error}
          </div>
          <div>
            <ButtonPrimary
              type="submit"
              onClick={handleCancelButtonOnClick}
              id="response-code-cancel-button"
              className={"settings-button"}
            >
              <FormattedMessage defaultMessage="Cancel" description="Login OtherDevice" />
            </ButtonPrimary>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

function RenderOtherDevice1(props: { data: LoginUseOtherDevice1Response }): JSX.Element {
  const { data } = props;
  const login_ref = useAppSelector((state) => state.login.ref);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const dispatch = useAppDispatch();
  const history = useHistory();

  function handleTimerReachZero() {
    setSubmitDisabled(true);
  }

  function handleLoginButtonOnClick() {
    if (login_ref) {
      dispatch(fetchNext({ ref: login_ref }));
      // Send the user off to the regular login flow when they click the button
      history.push(`/login/${login_ref}`);
    }
  }

  function handleAbortButtonOnClick() {
    if (login_ref) {
      // Tell backend we're abandoning the request to login using another device
      dispatch(fetchUseOtherDevice1({ ref: login_ref, action: "ABORT" }));
    }
  }

  useEffect(() => {
    console.log("PROPS DATA STATE CHANGED TO ", props.data.state);
    if (props.data.state != "NEW" && props.data.state != "IN_PROGRESS") {
      setSubmitDisabled(true);
    }
  }, [props.data.state]);

  return (
    <React.Fragment>
      <div className="step">
        <span className="num">1.</span>
        <span className="text">
          <FormattedMessage defaultMessage="Scan this QR-code with your other device" />
        </span>
      </div>
      <img className="qr-code" src={data.qr_img} />
      <p>
        <span className="short_code">ID# {data.short_code}</span>
      </p>

      <div className="step">
        <span className="num">2.</span>
        <span className="text">
          <FormattedMessage defaultMessage="Log in on the other device" />
        </span>
      </div>

      <div className="step">
        <span className="num">3.</span>
        <span className="text">
          <FormattedMessage defaultMessage="Enter the response code shown on the other device here" />
        </span>
      </div>

      <div className="expiration-info device1">
        <TimeRemainingWrapper name="other-device-expires" value={data.expires_in} onReachZero={handleTimerReachZero}>
          <ExpiresMeter expires_max={data.expires_max} />
        </TimeRemainingWrapper>
      </div>

      <ResponseCodeForm
        extra_className="device1"
        submitDisabled={submitDisabled}
        inputsDisabled={false}
        handleLogin={handleLoginButtonOnClick}
        handleAbort={handleAbortButtonOnClick}
      />

      <DeveloperInfo {...data} />
    </React.Fragment>
  );
}

function DeveloperInfo(props: { qr_url?: string }) {
  const env = useAppSelector((state) => state.config.environment);
  if (!props.qr_url || (env != "dev" && env != "staging")) {
    return null;
  }
  return (
    <div className="developer">
      <span>
        <FormattedMessage defaultMessage="Developer info, not shown in production:" />
      </span>
      <span>
        <a href={props.qr_url}>{props.qr_url}</a>
      </span>
    </div>
  );
}
export default UseOtherDevice1;
