import { fetchUseOtherDevice1, UseOtherDevice1ResponseWithQR } from "apis/eduidLogin";
import EduIDButton from "components/Common/EduIDButton";
import { TimeRemainingWrapper } from "components/Common/TimeRemaining";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useEffect, useState } from "react";
import { FormRenderProps } from "react-final-form";
import { FormattedMessage } from "react-intl";
import loginSlice from "slices/Login";
import { ExpiresMeter } from "./ExpiresMeter";
import { LoginAtServiceInfo } from "./LoginAtServiceInfo";
import { ResponseCodeForm, ResponseCodeValues } from "./ResponseCodeForm";

/*
 * Start the "Login using another device" login flow.
 *
 * This component runs on device #1 and shows the QR code to the user. It then waits
 * for the user to submit a "response code" in a form, to complete the login on this device.
 */

function UseOtherDevice1() {
  const loginRef = useAppSelector((state) => state.login.ref);
  const other_device = useAppSelector((state) => state.login.other_device1);
  const remember_me = useAppSelector((state) => state.login.remember_me);
  const service_info = useAppSelector((state) => state.login.service_info);
  const this_device = useAppSelector((state) => state.login.this_device);
  const username = useAppSelector((state) => state.login.authn_options.forced_username);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loginRef && !other_device) {
      // refresh state on page reload
      const _name = username ? username : undefined; // backend is picky and won't allow null
      dispatch(fetchUseOtherDevice1({ ref: loginRef, action: "FETCH", username: _name, this_device, remember_me }));
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
      <h1>
        <FormattedMessage defaultMessage="Log in using another device" />
      </h1>
      <div className="lead">
        <LoginAtServiceInfo service_info={service_info} />
      </div>

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
      <p>{props.error}</p>
      <div className="buttons">
        <EduIDButton
          buttonstyle="secondary"
          type="submit"
          onClick={handleCancelButtonOnClick}
          id="response-code-cancel-button"
        >
          <FormattedMessage defaultMessage="Cancel" description="button cancel" />
        </EduIDButton>
        {props.handleNewQRCodeOnClick && (
          <EduIDButton
            buttonstyle="primary"
            type="submit"
            id="refresh-get-new-code"
            onClick={props.handleNewQRCodeOnClick}
          >
            <FormattedMessage defaultMessage="Retry" description="Login OtherDevice" />
          </EduIDButton>
        )}
      </div>
    </React.Fragment>
  );
}

function RenderOtherDevice1(props: { data: UseOtherDevice1ResponseWithQR }): JSX.Element {
  const { data } = props;
  const login_ref = useAppSelector((state) => state.login.ref);
  const username = useAppSelector((state) => state.login.authn_options.forced_username);
  const this_device = useAppSelector((state) => state.login.this_device);
  const remember_me = useAppSelector((state) => state.login.remember_me);
  const response_code_required = useAppSelector((state) => state.login.other_device1?.response_code_required);
  const bad_attempts = useAppSelector((state) => state.login.other_device1?.bad_attempts);
  const [isExpired, setIsExpired] = useState(false);
  const dispatch = useAppDispatch();

  function handleTimerReachZero() {
    setIsExpired(true);
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
      dispatch(fetchUseOtherDevice1({ ref: login_ref, action: "FETCH", username: _name, this_device, remember_me }));
      setIsExpired(false);
    }
  }

  function handleSubmitCode(values: ResponseCodeValues) {
    const code = values.v.join("");
    const match = code.match(/^\d\d\d\d\d\d$/);
    if (match?.length == 1) {
      // match[0] is whole matched string
      const digits = match[0];
      if (login_ref) {
        dispatch(
          fetchUseOtherDevice1({
            ref: login_ref,
            action: "SUBMIT_CODE",
            response_code: digits,
            this_device,
            remember_me,
          })
        );
      }
    }

    return undefined;
  }

  function handleContinueWithoutCode() {
    // If the user is known on device #1, the correct response code is not required by the backend
    if (login_ref) {
      dispatch(
        fetchUseOtherDevice1({
          ref: login_ref,
          action: "SUBMIT_CODE",
          response_code: "000000",
          this_device,
          remember_me,
        })
      );
    }

    return undefined;
  }

  interface ResponseCodeButtonsProps {
    formProps?: FormRenderProps<ResponseCodeValues>;
  }

  function ResponseCodeButtons(props: ResponseCodeButtonsProps) {
    if (!props.formProps) {
      return null;
    }

    return (
      <div className={`buttons device1`}>
        <EduIDButton
          type="submit"
          buttonstyle="secondary"
          onClick={handleAbortButtonOnClick}
          id="response-code-abort-button"
          disabled={props.formProps.submitting}
        >
          <FormattedMessage defaultMessage="Cancel" description="button cancel" />
        </EduIDButton>

        <EduIDButton
          type="submit"
          onClick={props.formProps.handleSubmit}
          id="response-code-submit-button"
          buttonstyle="primary"
          disabled={props.formProps.submitting || props.formProps.invalid || props.formProps.pristine}
        >
          <FormattedMessage defaultMessage="Continue" description="Short code form" />
        </EduIDButton>
      </div>
    );
  }

  const expiredMessage = (
    <FormattedMessage
      defaultMessage="The login attempt was aborted or exceeded the time limit. Please try again."
      description="Use another device #1"
    />
  );

  return (
    <React.Fragment>
      {!isExpired ? (
        <ol className="listed-steps">
          <li>
            <FormattedMessage defaultMessage="Scan this QR-code with your other device" />

            <figure className="x-adjust">
              <img alt="qr-code" className="qr-code" src={data.qr_img} />
              <figcaption className="short-code">ID# {data.short_code}</figcaption>
            </figure>
          </li>

          <li>
            <FormattedMessage defaultMessage="Log in on the other device" />
          </li>

          <li>
            {response_code_required === false ? (
              <React.Fragment>
                <FormattedMessage defaultMessage={`Click "continue" once you have logged in on the other device`} />
                <div className="buttons">
                  <EduIDButton
                    buttonstyle="secondary"
                    type="submit"
                    onClick={handleAbortButtonOnClick}
                    id="response-code-cancel-button"
                  >
                    <FormattedMessage defaultMessage="Cancel" description="button cancel" />
                  </EduIDButton>
                  <EduIDButton
                    type="submit"
                    buttonstyle="primary"
                    onClick={handleContinueWithoutCode}
                    id="response-code-continue-button"
                  >
                    <FormattedMessage defaultMessage="Continue" description="Login OtherDevice" />
                  </EduIDButton>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <FormattedMessage defaultMessage="Enter the six digit response code shown on the other device in the form below" />
                <div className="expiration-info">
                  <ResponseCodeForm
                    bad_attempts={bad_attempts}
                    inputsDisabled={false}
                    handleSubmitCode={handleSubmitCode}
                  >
                    <ResponseCodeButtons />
                  </ResponseCodeForm>

                  <TimeRemainingWrapper
                    name="other-device-expires"
                    unique_id={data.display_id}
                    value={data.expires_in}
                    onReachZero={handleTimerReachZero}
                  >
                    <ExpiresMeter showMeter={false} expires_max={data.expires_max} />
                  </TimeRemainingWrapper>
                </div>
              </React.Fragment>
            )}
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
      <p></p>
      <span>
        <FormattedMessage defaultMessage="Developer info, not shown in production:" />
      </span>
      <span id="qr_url">
        <a href={props.qr_url}>{props.qr_url}</a>
      </span>
    </div>
  );
}
export default UseOtherDevice1;
