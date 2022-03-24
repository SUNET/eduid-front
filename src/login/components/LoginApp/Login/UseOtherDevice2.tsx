import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fetchNext,
  fetchUseOtherDevice2,
  LoginUseOtherDevice2Response,
  UseOtherDevice2ResponseLoggedIn,
} from "apis/eduidLogin";
import { TimeRemainingWrapper } from "components/TimeRemaining";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import ButtonPrimary from "login/components/Buttons/ButtonPrimary";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory, useParams } from "react-router-dom";
import { ExpiresMeter } from "./ExpiresMeter";
import { ResponseCodeForm } from "./ResponseCodeForm";

// optional URL parameters passed to this component
interface UseOtherParams {
  state_id?: string;
}

// This is the page rendered by the link in the QR code, so this is on device #2
function UseOtherDevice2() {
  const data = useAppSelector((state) => state.login.other_device2);
  const loginRef = useAppSelector((state) => state.login.ref);
  const base_url = useAppSelector((state) => state.config.base_url);
  const params = useParams() as UseOtherParams;
  const dispatch = useAppDispatch();

  const state_id = params.state_id;

  useEffect(() => {
    // Fetching data from backend depends on state.config being loaded first (base_url being set)
    if (base_url && !loginRef && state_id) {
      // When the user follows the QR code, there is no loginRef but there is a state_id
      dispatch(fetchUseOtherDevice2({ state_id: state_id }));
    }
  }, [base_url, state_id, loginRef]);

  useEffect(() => {
    if (loginRef) {
      // refresh state on page reload
      dispatch(fetchUseOtherDevice2({ ref: loginRef }));
    }
  }, []);

  return (
    <div className="use-another-device device2">
      <h3 className="heading heading-4">
        <FormattedMessage defaultMessage="Log in on another device" />
      </h3>

      {data ? <RenderOtherDevice2 data={data} /> : null}
    </div>
  );
}

function RenderOtherDevice2(props: { data: LoginUseOtherDevice2Response }): JSX.Element {
  const { data } = props;
  const [timerIsZero, setTimerIsZero] = useState(false);

  function handleTimerReachZero() {
    setTimerIsZero(true);
  }

  if (timerIsZero) {
    // TODO: show this as a modal window, greying out all the other content?

    return (
      <p>
        <FormattedMessage
          defaultMessage="The code has expired, please close this browser window."
          description="Use another device, finished"
        />
      </p>
    );
  }

  return (
    <React.Fragment>
      <ol className="listed-steps">
        <InfoAboutOtherDevice data={data} />

        {data.state === "IN_PROGRESS" ? (
          <li>
            <FormattedMessage defaultMessage="Log in this device" description="Login OtherDevice" />
            <div className="expiration-info">
              <ProceedLoginButton disabled={timerIsZero} />

              <TimeRemainingWrapper
                name="other-device-expires"
                unique_id={data.short_code}
                value={data.expires_in}
                className="x-adjust"
                onReachZero={handleTimerReachZero}
              >
                <ExpiresMeter showMeter={false} expires_max={data.expires_max} />
              </TimeRemainingWrapper>
            </div>
          </li>
        ) : data.state === "AUTHENTICATED" ? (
          <li>
            <RenderLoggedIn data={data} isExpired={timerIsZero} />
            <div className="expiration-info">
              <TimeRemainingWrapper
                name="other-device-expires"
                unique_id={data.short_code}
                value={data.expires_in}
                onReachZero={handleTimerReachZero}
              >
                <ExpiresMeter showMeter={false} expires_max={data.expires_max} />
              </TimeRemainingWrapper>
            </div>
          </li>
        ) : data !== undefined ? (
          <li>
            <FormattedMessage
              defaultMessage="Request complete, you should close this browser window."
              description="Use another device, finished"
            />
          </li>
        ) : // show nothing before next_page is initialised
        null}
      </ol>
    </React.Fragment>
  );
}

function InfoAboutOtherDevice(props: { data: LoginUseOtherDevice2Response }): JSX.Element | null {
  const proximityMessages: { [key: string]: JSX.Element } = {
    SAME: (
      <FormattedMessage
        defaultMessage="(The same as now)"
        description="Use another device IP proximity"
      ></FormattedMessage>
    ),
    NEAR: (
      <FormattedMessage
        defaultMessage="(Close to your address now)"
        description="Use another device IP proximity"
      ></FormattedMessage>
    ),
    FAR: (
      <FormattedMessage
        defaultMessage="(Far from your address now)"
        description="Use another device IP proximity"
      ></FormattedMessage>
    ),
  };
  const proximity: JSX.Element = proximityMessages[props.data.device1_info.proximity];
  return (
    <li>
      <FormattedMessage defaultMessage="Note that you are using this device to log in on the device below" />

      <figure className="table-responsive x-adjust">
        <table className="table">
          <tbody>
            <tr className="device-info-row">
              <td>IP address</td>
              <td>
                {props.data.device1_info.addr} {proximity}
              </td>
            </tr>
            <tr className="device-info-row">
              <td>Description</td>
              <td>{props.data.device1_info.description}</td>
            </tr>
          </tbody>
        </table>

        <figcaption className="short-code device2">ID# {props.data.short_code}</figcaption>
      </figure>
    </li>
  );
}

function ProceedLoginButton(props: { disabled: boolean }): JSX.Element {
  const data = useAppSelector((state) => state.login.other_device2);
  const dispatch = useAppDispatch();
  const history = useHistory();

  function handleOnClick() {
    if (data && data.login_ref) {
      dispatch(fetchNext({ ref: data.login_ref }));
      // Send the user off to the regular login flow when they click the button
      history.push(`/login/${data.login_ref}`);
    }
  }

  return (
    <div className="buttons device2">
      <ButtonPrimary
        type="submit"
        onClick={handleOnClick}
        id="proceed-other-device-button"
        className={"settings-button"}
        disabled={!data || props.disabled}
      >
        <FormattedMessage defaultMessage="Log in" description="Login OtherDevice" />
      </ButtonPrimary>
    </div>
  );
}

function RenderLoggedIn(props: { isExpired: boolean; data: UseOtherDevice2ResponseLoggedIn }): JSX.Element {
  const dispatch = useAppDispatch();
  const history = useHistory();

  function handleOnClick() {
    if (props.data.login_ref) {
      dispatch(fetchNext({ ref: props.data.login_ref }));
      // Send the user off to the regular login flow when they click the button
      history.push(`/login/${props.data.login_ref}`);
    }
  }

  function handleSubmit(): undefined {
    // No-op, have to provide it to the form but we don't expect submissions on device 2.
    return undefined;
  }

  if (props.isExpired) {
    return (
      <p>
        <FormattedMessage
          defaultMessage="The code has expired, please close this browser window."
          description="Use another device, finished"
        />
      </p>
    );
  }

  return (
    <div className="finished device2">
      <FormattedMessage
        defaultMessage="Use the response code below in the first device to continue logging in"
        description="Use another device, finished"
      />

      <span className="text-small">
        <FormattedMessage
          defaultMessage="After using the code on the other device, please close this browser window."
          description="Use another device, finished"
        />
      </span>
      <div className="x-adjust">
        <ResponseCodeForm
          extra_className="device2"
          submitDisabled={true}
          inputsDisabled={true}
          code={props.data.response_code}
          handleSubmitCode={handleSubmit}
        />

        <div className="phishing-warning">
          <span className="warning-symbol">
            <FontAwesomeIcon icon={faExclamationCircle} />
          </span>
          <span className="text-small">
            <FormattedMessage
              defaultMessage="Don't share this code with anyone, as it might compromise your credentials."
              description="Use another device, finished"
            />
          </span>
        </div>
      </div>
      <div className="buttons device2 x-adjust">
        <ButtonPrimary
          type="submit"
          onClick={handleOnClick}
          id="proceed-other-device-button"
          className={"settings-button"}
        >
          <FormattedMessage defaultMessage="Cancel" description="Use another device, finished" />
        </ButtonPrimary>
      </div>
    </div>
  );
}

export default UseOtherDevice2;
