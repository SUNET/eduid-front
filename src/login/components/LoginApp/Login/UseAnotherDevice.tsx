import { LoginRequestOtherResponse } from "apis/eduidLogin";
import { useAppSelector } from "login/app_init/hooks";
import React from "react";
import { Field, Form } from "react-final-form";
import { FormattedMessage } from "react-intl";

function UseAnotherDevice() {
  const other_device = useAppSelector((state) => state.login.other_device);

  return (
    <div className="use-another-device">
      <h2 className="heading">
        <FormattedMessage defaultMessage="Log in using another device" />
      </h2>

      {other_device ? <RenderOtherDevice data={other_device} /> : null}
    </div>
  );
}

function RenderOtherDevice(props: { data: LoginRequestOtherResponse }): JSX.Element {
  const { data } = props;

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

  return (
    <React.Fragment>
      <div className="step">
        <span className="num">1.</span>
        <span className="text">
          <FormattedMessage defaultMessage="Scan this QR-code with your other device" />
        </span>
      </div>
      <img className="qr-code" src={data.qr_img} />

      <div>
        <p>
          <span>Debug: </span>
          <a href={data.other_url}>{data.other_url}</a>
        </p>
      </div>

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
    </React.Fragment>
  );
}

export default UseAnotherDevice;
