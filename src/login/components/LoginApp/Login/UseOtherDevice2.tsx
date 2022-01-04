import { fetchNext, fetchUseOtherDevice2, LoginUseOtherDevice2Response } from "apis/eduidLogin";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import ButtonPrimary from "login/components/Buttons/ButtonPrimary";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory, useParams } from "react-router-dom";
import { TimeRemainingWrapper } from "components/TimeRemaining";
import { ExpiresMeter } from "./ExpiresMeter";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ResponseCodeForm } from "./ResponseCodeForm";

// URL parameters passed to this component
interface UseOtherParams {
  state_id?: string;
}

// This is the page rendered by the link in the QR code, so this is on device #2
function UseOtherDevice2() {
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
      dispatch(fetchUseOtherDevice2({ state_id: state_id }));
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
        <React.Fragment>
          <InfoAboutOtherDevice data={other.data} />

          <TimeRemainingWrapper
            name="other-device-expires"
            value={other.data.expires_in}
            onReachZero={handleTimerReachZero}
          >
            <ExpiresMeter expires_max={other.data.expires_max} />
          </TimeRemainingWrapper>

          {other.data.state === "IN_PROGRESS" ? (
            <ProceedLoginButton disabled={timerIsZero} />
          ) : other.data.state === "FINISHED" ? (
            <RenderFinished data={other.data} isExpired={timerIsZero} />
          ) : other.data !== undefined ? (
            <h2 className="heading">
              <FormattedMessage defaultMessage="Ooops, how did you get here? Unknown state, please try again." />
            </h2>
          ) : // show nothing before next_page is initialised
          null}
        </React.Fragment>
      )}
    </div>
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
    <div className="other-device-info device2">
      <p>
        <FormattedMessage defaultMessage="You are using this device to log in on another device:" />
      </p>

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

      <p>
        <span className="short_code device2">ID# {props.data.short_code}</span>
      </p>
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

function RenderFinished(props: { isExpired: boolean; data: LoginUseOtherDevice2Response }): JSX.Element {
  const dispatch = useAppDispatch();
  const history = useHistory();

  function handleOnClick() {
    if (props.data.login_ref) {
      dispatch(fetchNext({ ref: props.data.login_ref }));
      // Send the user off to the regular login flow when they click the button
      history.push(`/login/${props.data.login_ref}`);
    }
  }

  if (props.isExpired) {
    // TODO: show this as a modal window, greying out all the other content?

    return (
      <div className="finished device2">
        <FormattedMessage
          defaultMessage="The code has expired, you should close this browser window."
          description="Use another device, finished"
        />
      </div>
    );
  }

  return (
    <div className="finished device2">
      <div className="response-code">
        <FormattedMessage
          defaultMessage="Use this response code on the other device to transfer this login there."
          description="Use another device, finished"
        />
      </div>
      <div className="response-code">
        <FormattedMessage
          defaultMessage="After using the code on the other device, you should close this browser window."
          description="Use another device, finished"
        />

        <ResponseCodeForm
          submitDisabled={true}
          showButton={false}
          inputsDisabled={true}
          value={props.data.short_code}
        />
      </div>

      <div className="phishing-warning">
        <span className="triangle">
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </span>
        <span className="text">
          <FormattedMessage
            defaultMessage="Never give this code to someone else, as they might steal your login."
            description="Use another device, finished"
          />
        </span>
      </div>
      <div className="buttons device2">
        <ButtonPrimary
          type="submit"
          onClick={handleOnClick}
          id="proceed-other-device-button"
          className={"settings-button"}
        >
          <FormattedMessage defaultMessage="Abort" description="Use another device, finished" />
        </ButtonPrimary>
      </div>
    </div>
  );
}

export default UseOtherDevice2;
