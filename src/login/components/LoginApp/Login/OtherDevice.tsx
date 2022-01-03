import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchNext, fetchUseOtherDevice, LoginUseOtherResponse } from "apis/eduidLogin";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import ButtonPrimary from "login/components/Buttons/ButtonPrimary";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory, useParams } from "react-router-dom";
import { TimeRemaining, TimeRemainingWrapper } from "components/TimeRemaining";

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
  const [timerIsZero, setTimerIsZero] = useState(false);

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

  function handleTimerReachZero() {
    setTimerIsZero(true);
  }

  return (
    <div className="use-another-device">
      <h2 className="heading">
        <FormattedMessage defaultMessage="Log in on another device" />
      </h2>
      {other === undefined ? (
        <p>
          <FormattedMessage defaultMessage="The request was not found, or has expired" />
        </p>
      ) : (
        <>
          <p>
            <FormattedMessage defaultMessage="You are using this device to log in on another device:" />
          </p>
          <InfoAboutOtherDevice data={other.data} />
          <p>
            <span className="short_code device2">ID# {other.data.short_code}</span>
          </p>
          <TimeRemainingWrapper
            name="other-device-expires"
            value={other.data.expires_in}
            onReachZero={handleTimerReachZero}
          >
            <ExpiresMeter expires_max={other.data.expires_max} />
          </TimeRemainingWrapper>

          {other.data.state === "PENDING" ? (
            <ProceedLoginButton disabled={timerIsZero} />
          ) : other.data.state === "FINISHED" ? null : null}
        </>
      )}
    </div>
  );
}

function InfoAboutOtherDevice(props: { data: LoginUseOtherResponse }): JSX.Element | null {
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
    <div className="table-responsive">
      <table className="table table-striped">
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
    </div>
  );
}

interface ExpiresMeterProps {
  expires_max: number;
  time_remaining?: TimeRemaining;
}

export function ExpiresMeter(props: ExpiresMeterProps): JSX.Element | null {
  // convince TypeScript that TimeRemainingWrapper has added the time_remaining prop
  if (props.time_remaining === undefined) {
    return null;
  }
  return (
    <div className="expires-meter">
      <span className="clock">
        <FontAwesomeIcon icon={faClock} />
      </span>
      <meter
        low={props.expires_max * 0.2}
        max={props.expires_max}
        value={props.time_remaining.total_seconds}
        id="expires-meter"
        key="0"
      />
      <span className="timer">
        {props.time_remaining.minutes}:{props.time_remaining.seconds}
      </span>
    </div>
  );
}

function ProceedLoginButton(props: { disabled: boolean }): JSX.Element {
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
    <div className="buttons device2">
      <ButtonPrimary
        type="submit"
        onClick={handleOnClick}
        id="proceed-other-device-button"
        className={"settings-button"}
        disabled={!other || props.disabled}
      >
        <FormattedMessage defaultMessage="Log in the other device" description="Login OtherDevice" />
      </ButtonPrimary>
    </div>
  );
}

export default LoginOtherDevice;
