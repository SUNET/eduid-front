import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchUseOtherDevice2, LoginUseOtherDevice2Response, UseOtherDevice2ResponseLoggedIn } from "apis/eduidLogin";
import EduIDButton from "components/Common/EduIDButton";
import { TimeRemainingWrapper } from "components/Common/TimeRemaining";
import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate, useParams } from "react-router";
import loginSlice from "slices/Login";
import { ExpiresMeter } from "./ExpiresMeter";
//import { LoginAtServiceInfo } from "./LoginAtServiceInfo";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { ResponseCodeForm } from "./ResponseCodeForm";

// optional URL parameters passed to this component
interface UseOtherParams {
  state_id?: string;
}

// This is the page rendered by the link in the QR code, so this is on device #2
function UseOtherDevice2() {
  const data = useAppSelector((state) => state.login.other_device2);
  const loginRef = useAppSelector((state) => state.login.ref);
  const base_url = useAppSelector((state) => state.config.login_service_url);
  const params = useParams() as UseOtherParams;
  const dispatch = useAppDispatch();
  const [fetching, setFetching] = useState(false);
  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Log in using another device",
      defaultMessage: "Log in using another device | eduID",
    });
  }, []);

  useEffect(() => {
    async function initialFetch() {
      if (params?.state_id) {
        setFetching(true);
        await dispatch(fetchUseOtherDevice2({ state_id: params.state_id }));
        setFetching(false);
      }
    }
    if (!loginRef) {
      // Fetching data from backend depends on state.config being loaded first (base_url being set)
      if (base_url && !loginRef && params?.state_id) {
        // When the user first follows the QR code, there is no loginRef but there is a state_id
        if (!fetching) {
          // the initial fetch will atomically grab the state in the database, *must* avoid two fetches at once
          initialFetch();
        }
      }
    } else {
      // after login, this page is rendered with a loginRef present in the state
      dispatch(fetchUseOtherDevice2({ ref: loginRef }));
    }
  }, [base_url]);

  return (
    <div className="use-another-device device2">
      <h1>
        <FormattedMessage defaultMessage="Log in on another device" />
      </h1>

      {data ? <RenderOtherDevice2 data={data} params={params} /> : null}
    </div>
  );
}

function RenderOtherDevice2(props: { data: LoginUseOtherDevice2Response; params: UseOtherParams }): JSX.Element | null {
  const { data } = props;
  const [timerIsZero, setTimerIsZero] = useState(false);

  function handleTimerReachZero() {
    setTimerIsZero(true);
  }

  if (!data) {
    // show nothing before data is initialised
    return null;
  }

  if (timerIsZero) {
    return (
      <p>
        <FormattedMessage
          defaultMessage="The code has expired, please close this browser window."
          description="Use another device, finished"
        />
      </p>
    );
  }

  if (data.state === "DENIED" || data.state == "ABORTED" || data.state == "FINISHED") {
    // These three states are final, there is no further state transition possible and there is
    // no need to show either timeout information or a Cancel button.
    return (
      <p>
        {data.state === "DENIED" && (
          <FormattedMessage defaultMessage="Request denied." description="Use other device 2" />
        )}
        {data.state === "ABORTED" && (
          <FormattedMessage defaultMessage="Request cancelled." description="Use other device 2" />
        )}
        {data.state === "FINISHED" && (
          <FormattedMessage defaultMessage="Request completed." description="Use other device 2" />
        )}
        &nbsp;
        <FormattedMessage defaultMessage="You should close this browser window." description="Use other device 2" />
      </p>
    );
  }

  return (
    <React.Fragment>
      {data.state === "IN_PROGRESS" && (
        <ol className="listed-steps">
          {/* <LoginAtServiceInfo service_info={data.device1_info.service_info} />*/}

          {data.device1_info.is_known_device ? (
            <InfoAboutKnownDevice data={data} />
          ) : (
            <InfoAboutOtherDevice data={data} />
          )}

          <li>
            <FormattedMessage defaultMessage="Log in this device" description="Login OtherDevice" />
          </li>
        </ol>
      )}

      {data.state === "AUTHENTICATED" && <RenderAuthenticated data={data} />}

      {data.state !== "IN_PROGRESS" && data.state != "AUTHENTICATED" && (
        <p>
          <FormattedMessage
            defaultMessage="Request complete, you should close this browser window."
            description="Use another device, finished"
          />
        </p>
      )}

      <div className="expiration-info">
        {data.state === "IN_PROGRESS" ? (
          <Device2Buttons showLogin={true} />
        ) : data.state === "AUTHENTICATED" ? (
          <Device2Buttons showLogin={false} extra_className="x-adjust" />
        ) : (
          <Device2Buttons showLogin={false} />
        )}
        <TimeRemainingWrapper
          name="other-device-expires"
          unique_id={data.short_code}
          value={data.expires_in}
          onReachZero={handleTimerReachZero}
        >
          <ExpiresMeter showMeter={false} expires_max={data.expires_max} />
        </TimeRemainingWrapper>
      </div>

      {data.state === "AUTHENTICATED" && <DeveloperInfo data={data} />}
    </React.Fragment>
  );
}

function InfoAboutKnownDevice(props: { data: LoginUseOtherDevice2Response }): JSX.Element | null {
  return (
    <li>
      <FormattedMessage
        defaultMessage="You are logging in as {display_name} ({username}) on the other device"
        values={{
          display_name: <strong>{props.data.display_name}</strong>,
          username: <strong>{props.data.username}</strong>,
        }}
      />

      <figure className="table-responsive x-adjust">
        <figcaption className="short-code device2">ID# {props.data.short_code}</figcaption>
      </figure>
    </li>
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
            <tr className="border-row">
              <td>
                <strong>
                  <FormattedMessage defaultMessage="IP address" description="device info" />
                </strong>
              </td>

              <td>
                {props.data.device1_info.addr} {proximity}
              </td>
            </tr>
            <tr className="border-row">
              <td>
                <strong>
                  <FormattedMessage defaultMessage="Description" description="device info" />
                </strong>
              </td>

              <td>{props.data.device1_info.description}</td>
            </tr>
          </tbody>
        </table>

        <figcaption className="short-code device2">ID# {props.data.short_code}</figcaption>
      </figure>
    </li>
  );
}

interface Device2ButtonsProps {
  showLogin: boolean;
  extra_className?: string;
}

function Device2Buttons(props: Device2ButtonsProps): JSX.Element {
  const data = useAppSelector((state) => state.login.other_device2);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleLoginOnClick() {
    if (data && data.login_ref) {
      dispatch(loginSlice.actions.callLoginNext);
      // Send the user off to the regular login flow when they click the button
      navigate(`/login/${data.login_ref}`);
    }
  }

  function handleCancelOnClick() {
    if (data) {
      dispatch(fetchUseOtherDevice2({ ref: data.login_ref, action: "ABORT" }));
    }
  }

  return (
    <div className={`buttons device2 ${props.extra_className}`}>
      <EduIDButton
        buttonstyle="secondary"
        onClick={handleCancelOnClick}
        id="cancel-other-device-button"
        disabled={!data}
      >
        <FormattedMessage defaultMessage="Cancel" description="button cancel" />
      </EduIDButton>

      {props.showLogin && (
        <EduIDButton
          buttonstyle="primary"
          type="submit"
          onClick={handleLoginOnClick}
          id="proceed-other-device-button"
          disabled={!data}
        >
          <FormattedMessage defaultMessage="Log in" description="Login OtherDevice" />
        </EduIDButton>
      )}
    </div>
  );
}

function RenderAuthenticated(props: { data: UseOtherDevice2ResponseLoggedIn }): JSX.Element {
  function handleSubmit(): undefined {
    // No-op, have to provide it to the form but we don't expect submissions on device 2.
    return undefined;
  }

  if (props.data.response_code_required === false) {
    return (
      <p>
        <FormattedMessage
          defaultMessage="You can now close this window and continue on the other device."
          description="Use other device 2"
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
      <div className="x-adjust figure">
        <div className="device2">
          <ResponseCodeForm inputsDisabled={true} code={props.data.response_code} handleSubmitCode={handleSubmit} />

          <div className="warning-text">
            <span className="warning-symbol">
              <FontAwesomeIcon icon={faExclamationCircle as IconProp} />
            </span>
            <span>
              <FormattedMessage
                defaultMessage="Don't share this code with anyone, as it might compromise your credentials."
                description="Use another device, finished"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeveloperInfo(props: { data: UseOtherDevice2ResponseLoggedIn }) {
  const env = useAppSelector((state) => state.config.environment);
  if (env != "dev" && env != "staging") {
    return null;
  }
  return (
    <div className="developer">
      <p></p>
      <span>
        <FormattedMessage defaultMessage="Developer info, not shown in production:" />
      </span>
      <p>
        Response code:
        <span id="response_code">{props.data.response_code}</span>
      </p>
    </div>
  );
}
export default UseOtherDevice2;
