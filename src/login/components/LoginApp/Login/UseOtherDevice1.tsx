import { fetchUseOtherDevice1, UseOtherDevice1ResponseWithQR } from "apis/eduidLogin";
import { TimeRemainingWrapper } from "components/TimeRemaining";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import ButtonPrimary from "login/components/Buttons/ButtonPrimary";
import ButtonSecondary from "login/components/Buttons/ButtonSecondary";
import loginSlice from "login/redux/slices/loginSlice";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { ExpiresMeter } from "./ExpiresMeter";
import { ResponseCodeForm, ResponseCodeValues } from "./ResponseCodeForm";

/*
 * Start the "Login using another device" login flow.
 *
 * This component runs on device #1 and shows the QR code to the user. It then waits
 * for the user to submit a "response code" in a form, to complete the login on this device.
 */
function UseOtherDevice1() {
  const other_device = useAppSelector((state) => state.login.other_device1);
  const username = useAppSelector((state) => state.login.authn_options.forced_username);
  const loginRef = useAppSelector((state) => state.login.ref);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loginRef && !other_device) {
      // refresh state on page reload
      const _name = username ? username : undefined; // backend is picky and won't allow null
      dispatch(fetchUseOtherDevice1({ ref: loginRef, action: "FETCH", username: _name }));
    }
  }, []);

  const hasQrCode =
    other_device &&
    (other_device.state === "NEW" || other_device.state === "IN_PROGRESS" || other_device.state == "AUTHENTICATED");
  let error = undefined;
  if (!hasQrCode && other_device) {
    if (other_device.state === "ABORTED") {
      error = <FormattedMessage defaultMessage="The request has been aborted" description="Use other device" />;
    } else {
      error = <FormattedMessage defaultMessage="The request is not valid anymore" description="Use other device" />;
    }
  }

  return (
    <div className="use-another-device device1">
      <h3 className="heading heading-4">
        <FormattedMessage defaultMessage="Log in using another device" />
      </h3>

      {!error && hasQrCode && <RenderOtherDevice1 data={other_device} />}
      {error && <RenderFatalError error={error} />}
    </div>
  );
}

// Render a fatal error message with a CANCEL button that will reset the use-other-device
function RenderFatalError(props: { error: JSX.Element; handleNewQRCodeOnClick?: () => void }) {
  const dispatch = useAppDispatch();

  function handleCancelButtonOnClick() {
    // Exit from "use another device"
    dispatch(loginSlice.actions.stopLoginWithAnotherDevice());
  }

  return (
    <React.Fragment>
      <div role="alert" aria-invalid="true" tabIndex={0} className="input-validate-error">
        {props.error}
      </div>
      <div className="buttons">
        <ButtonSecondary
          type="submit"
          onClick={handleCancelButtonOnClick}
          id="response-code-cancel-button"
          className={"settings-button"}
        >
          <FormattedMessage defaultMessage="Cancel" description="Login OtherDevice" />
        </ButtonSecondary>
        <ButtonPrimary
          type="submit"
          id="refresh-get-new-code"
          className={"settings-button"}
          onClick={props.handleNewQRCodeOnClick}
        >
          <FormattedMessage defaultMessage="Retry with QR code" description="Login OtherDevice" />
        </ButtonPrimary>
      </div>
    </React.Fragment>
  );
}

function RenderOtherDevice1(props: { data: UseOtherDevice1ResponseWithQR }): JSX.Element {
  const { data } = props;
  const login_ref = useAppSelector((state) => state.login.ref);
  const username = useAppSelector((state) => state.login.authn_options.forced_username);
  const [isExpired, setIsExpired] = useState(false);
  const dispatch = useAppDispatch();

  function handleTimerReachZero() {
    setIsExpired(true);
  }

  // have to pass a function to ResponseCodeForm in order for it to show the button
  function handleLoginButtonOnClick() {
    return undefined;
  }

  function handleAbortButtonOnClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (login_ref) {
      // Tell backend we're abandoning the request to login using another device
      dispatch(fetchUseOtherDevice1({ ref: login_ref, action: "ABORT" }));
    }
  }

  function handleNewQRCodeOnClick() {
    // Get new code
    if (login_ref) {
      const _name = username ? username : undefined; // backend is picky and won't allow null
      dispatch(fetchUseOtherDevice1({ ref: login_ref, action: "FETCH", username: _name }));
      setIsExpired(false);
    }
  }

  function handleSubmitCode(values: ResponseCodeValues) {
    const code = values.v.join("");
    const match = code.match(/^SK(\d\d\d)-(\d\d\d)$/);
    if (match?.length == 3) {
      // match[0] is whole matched string, [1] and [2] are the groups of digits
      const digits = match[1] + match[2];
      if (login_ref) {
        dispatch(fetchUseOtherDevice1({ ref: login_ref, action: "SUBMIT_CODE", response_code: digits }));
      }
    }

    return undefined;
  }

  const expiredMessage = (
    <>
      <FormattedMessage
        defaultMessage="The login attempt was aborted or exceeded the time limit. Please try again."
        description="Use another device #1"
      />
    </>
  );

  return (
    <React.Fragment>
      {!isExpired ? (
        <ol className="listed-steps">
          <li>
            <FormattedMessage defaultMessage="Scan this QR-code with your other device" />

            <figure className="x-adjust">
              <img className="qr-code" src={data.qr_img} />
              <figcaption className="short-code">ID# {data.short_code}</figcaption>
            </figure>
          </li>

          <li>
            <FormattedMessage defaultMessage="Log in on the other device" />
          </li>

          <li>
            <FormattedMessage defaultMessage="Enter the six digit response code shown on the other device in the form below" />
            <div className="expiration-info x-adjust">
              <ResponseCodeForm
                extra_className="device1"
                submitDisabled={false}
                inputsDisabled={false}
                handleLogin={handleLoginButtonOnClick}
                handleAbort={handleAbortButtonOnClick}
                handleSubmitCode={handleSubmitCode}
              />

              <TimeRemainingWrapper
                name="other-device-expires"
                unique_id={data.display_id}
                value={data.expires_in}
                onReachZero={handleTimerReachZero}
              >
                <ExpiresMeter expires_max={data.expires_max} />
              </TimeRemainingWrapper>
            </div>
          </li>
        </ol>
      ) : (
        <RenderFatalError error={expiredMessage} handleNewQRCodeOnClick={handleNewQRCodeOnClick} />
      )}
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
