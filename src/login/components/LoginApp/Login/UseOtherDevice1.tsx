import { fetchUseOtherDevice1, LoginUseOtherDevice1Response } from "apis/eduidLogin";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { ExpiresMeter } from "./ExpiresMeter";
import { TimeRemainingWrapper } from "components/TimeRemaining";
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

  useEffect(() => {
    if (loginRef && !other_device) {
      // refresh state on page reload
      dispatch(fetchUseOtherDevice1({ ref: loginRef }));
    }
  }, []);

  return (
    <div className="use-another-device device1">
      <h2 className="heading">
        <FormattedMessage defaultMessage="Log in using another device" />
      </h2>

      {other_device ? <RenderOtherDevice1 data={other_device} /> : null}
    </div>
  );
}

function RenderOtherDevice1(props: { data: LoginUseOtherDevice1Response }): JSX.Element {
  const { data } = props;
  const [submitDisabled, setSubmitDisabled] = useState(true);

  function handleTimerReachZero() {
    setSubmitDisabled(true);
  }

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
        showButton={true}
        inputsDisabled={false}
      />

      <DeveloperInfo {...data} />
    </React.Fragment>
  );
}

function DeveloperInfo(props: { qr_url: string }) {
  const env = useAppSelector((state) => state.config.environment);
  if (env != "dev" && env != "staging") {
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
