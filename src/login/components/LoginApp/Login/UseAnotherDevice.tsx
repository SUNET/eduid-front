import { fetchNext, LoginRequestOtherResponse } from "apis/eduidLogin";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import ButtonPrimary from "login/components/Buttons/ButtonPrimary";
import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import { ExpiresMeter } from "./OtherDevice";
import { TimeRemainingWrapper } from "components/TimeRemaining";

/*
 * Start the "Login using another device" login flow.
 *
 * This component runs on device #1 and shows the QR code to the user. It then waits
 * for the user to submit a "response code" in a form, to complete the login on this device.
 */
function UseAnotherDevice() {
  const other_device = useAppSelector((state) => state.login.other_device1);

  return (
    <div className="use-another-device device1">
      <h2 className="heading">
        <FormattedMessage defaultMessage="Log in using another device" />
      </h2>

      {other_device ? <RenderOtherDevice data={other_device} /> : null}
    </div>
  );
}

function RenderOtherDevice(props: { data: LoginRequestOtherResponse }): JSX.Element {
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

      <ResponseCodeForm submitDisabled={submitDisabled} />

      <DeveloperInfo {...data} />
    </React.Fragment>
  );
}

function ResponseCodeForm(props: { submitDisabled: boolean }): JSX.Element {
  const login_ref = useAppSelector((state) => state.login.ref);
  const dispatch = useAppDispatch();
  const history = useHistory();

  // TODO: Handle backspace, moving to the preceding field *after* clearing the contents of this one
  // TODO: Add final-form validation to the form

  function handleKeyUp(event: React.KeyboardEvent<HTMLFormElement>) {
    console.log("Key up: ", event.key.toLowerCase());
    if (event.key.toLowerCase() === "enter") {
      event.preventDefault();
      //dispatch(submit("usernamePwForm"));
    } else if (isDigit(event.key.toLowerCase())) {
      // focus the next input field
      const form = event.currentTarget.form;
      // disabled inputs are placeholders, filter them out
      const inputs = [...form].filter((input: { disabled?: boolean }) => !input.disabled);
      const index = inputs.indexOf(event.currentTarget);
      if (index < 0) {
        // bail of the current input could not be found
        return undefined;
      }
      const lastIndex = inputs.length - 1;
      console.log(`Current index ${index} of ${lastIndex}`);
      if (index > -1 && index < inputs.length - 1) {
        console.log(`Advancing focus to index ${index + 1} of ${lastIndex}`);
        inputs[index + 1].focus();
      }
    }
  }

  function isDigit(c: string) {
    return c >= "0" && c <= "9";
  }

  function onSubmit() {}

  interface CodeFieldProps {
    num: number;
    value: string;
    disabled?: boolean;
    autoFocus?: boolean;
  }

  // helper-function to make for tidy code with one line per input field below
  function CodeField({ num, value, disabled = false, autoFocus = undefined }: CodeFieldProps) {
    return (
      <Field
        name={`code${num}`}
        component="input"
        type="text"
        maxLength="1"
        pattern="[0-9]"
        placeholder={value}
        disabled={disabled === true ? "disabled" : undefined}
        className={disabled === true ? "fixed" : undefined}
        autoFocus={autoFocus}
        onKeyUp={handleKeyUp}
      />
    );
  }

  function handleLoginButtonOnClick() {
    if (login_ref) {
      dispatch(fetchNext({ ref: login_ref }));
      // Send the user off to the regular login flow when they click the button
      history.push(`/login/${login_ref}`);
    }
  }

  return (
    <React.Fragment>
      <div className="short-code-input device1">
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} className="response-code-form">
              <div>
                <CodeField num={0} value="S" disabled={true} />
                <CodeField num={1} value="K" disabled={true} />
                <CodeField num={2} value="" autoFocus={true} />
                <CodeField num={3} value="" />
                <CodeField num={4} value="" />
                <CodeField num={7} value="-" disabled={true} />
                <CodeField num={5} value="" />
                <CodeField num={6} value="" />
                <CodeField num={9} value="" />
              </div>
            </form>
          )}
        />
      </div>

      <div className="buttons device1">
        <ButtonPrimary
          type="submit"
          onClick={handleLoginButtonOnClick}
          id="proceed-other-device-button"
          className={"settings-button"}
          disabled={props.submitDisabled}
        >
          <FormattedMessage defaultMessage="Log in" description="Login OtherDevice" />
        </ButtonPrimary>
      </div>
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
      <span>Developer: </span>
      <span>
        <a href={props.qr_url}>{props.qr_url}</a>
      </span>
    </div>
  );
}
export default UseAnotherDevice;
