import ButtonPrimary from "login/components/Buttons/ButtonPrimary";
import ButtonSecondary from "login/components/Buttons/ButtonSecondary";
import React from "react";
import { Field as FinalField, Form as FinalForm, FormRenderProps } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { FormattedMessage } from "react-intl";
import { TimeRemainingWrapper } from "components/TimeRemaining";
import { ExpiresMeter } from "./ExpiresMeter";

interface ResponseCodeFormProps {
  extra_className: string;
  submitDisabled: boolean;
  inputsDisabled: boolean;
  code?: string;
  handleSubmitCode: (values: ResponseCodeValues) => undefined;
  handleAbort?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleLogin?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  data?: any;
  setIsExpired?: any;
}

export interface ResponseCodeValues {
  v: string[];
}

export function ResponseCodeForm(props: ResponseCodeFormProps): JSX.Element {
  const valueChars = (props.code || "").split("");
  const initialValues: ResponseCodeValues = {
    v: ["S", "K", valueChars[0], valueChars[1], valueChars[2], "-", valueChars[3], valueChars[4], valueChars[5]],
  };

  return (
    <React.Fragment>
      <div className={`response-code-input-wrapper ${props.extra_className}`}>
        <FinalForm<ResponseCodeValues>
          onSubmit={props.handleSubmitCode}
          initialValues={initialValues}
          render={(formProps) => {
            return (
              <ShortCodeForm
                {...formProps}
                {...props}
                handleAbort={props.handleAbort}
                handleLogin={props.handleLogin}
              />
            );
          }}
          validate={validate_code}
        />
      </div>
    </React.Fragment>
  );
}

function validate_code(values: ResponseCodeValues) {
  const err: { [key: string]: string } = {};

  // the code is formatted as SK123-456, ignore positions S, K and -
  const positions = [2, 3, 4, 6, 7, 8];
  positions.forEach((pos) => {
    if (!values.v[pos] || !isDigit(values.v[pos])) {
      // Record an (invisible) failure as long as one of the inputs doesn't contain a valid digit, to keep
      // the submit button disabled until all fields hold a valid digit.
      const name = `v[${pos}]`;
      err[name] = "Not a digit";
    }
    if (values.v[pos] && values.v[pos].length && !isDigit(values.v[pos])) {
      // Set the form-wide error too. This is what is currently displayed, so only show error when there actually is
      // a non-digit there, not for empty values.
      err[FORM_ERROR] = "Not a digit";
    }
  });
  return err;
}

//type FixedFormRenderProps = Omit<FormRenderProps<ResponseCodeValues>, "handleSubmit">;

function ShortCodeForm(props: FormRenderProps<ResponseCodeValues> & ResponseCodeFormProps) {
  function handleTimerReachZero() {
    props.setIsExpired(true);
  }
  return (
    <form onSubmit={props.handleSubmit} className="response-code-form">
      <div className="flex-between">
        <div className="response-code-inputs">
          {/* <CodeField num={0} value="S" disabled={true} fixed={true} />
        <CodeField num={1} value="K" disabled={true} fixed={true} /> */}
          <span className="nowrap-group">
            <CodeField num={2} disabled={props.inputsDisabled} autoFocus={!props.inputsDisabled} />
            <CodeField num={3} disabled={props.inputsDisabled} />
            <CodeField num={4} disabled={props.inputsDisabled} />
            {/* </span>
          <CodeField num={5} value="-" disabled={true} fixed={true} />
          <span className="nowrap-group"> */}
            <CodeField num={6} disabled={props.inputsDisabled} />
            <CodeField num={7} disabled={props.inputsDisabled} />
            <CodeField num={8} disabled={props.inputsDisabled} />
          </span>
        </div>
        <div className="expiration-info device1">
          <TimeRemainingWrapper
            name="other-device-expires"
            unique_id={props.data.display_id}
            value={props.data.expires_in}
            onReachZero={handleTimerReachZero}
          >
            <ExpiresMeter showMeter={false} expires_max={props.data.expires_max} />
          </TimeRemainingWrapper>
        </div>
      </div>
      {props.error && (
        <div role="alert" aria-invalid="true" tabIndex={0} className="input-validate-error">
          {props.error}
        </div>
      )}

      {props.handleAbort || props.handleLogin ? (
        <div className={`buttons ${props.extra_className}`}>
          {props.handleAbort && (
            <ButtonSecondary
              type="submit"
              onClick={props.handleAbort}
              id="response-code-abort-button"
              className={"settings-button"}
              disabled={props.submitting}
            >
              <FormattedMessage defaultMessage="Cancel" description="Login OtherDevice" />
            </ButtonSecondary>
          )}
          {props.handleLogin && (
            <ButtonPrimary
              type="submit"
              onClick={props.handleLogin}
              id="response-code-submit-button"
              className={"settings-button"}
              disabled={props.submitDisabled || props.submitting || props.invalid || props.pristine}
            >
              <FormattedMessage defaultMessage="Log in" description="Login OtherDevice" />
            </ButtonPrimary>
          )}
        </div>
      ) : null}
    </form>
  );
}

interface CodeFieldProps {
  num: number;
  value?: string;
  disabled?: boolean;
  fixed?: boolean;
  autoFocus?: boolean;
}

// helper-function to make for tidy code with one line per input field below
function CodeField({ num, value, disabled = false, fixed = false, autoFocus = undefined }: CodeFieldProps) {
  // TODO: Handle backspace, moving to the preceding field *after* clearing the contents of this one
  // TODO: Add final-form validation to the form
  function handleKeyUp(event: React.KeyboardEvent<HTMLFormElement>) {
    const active = document.activeElement;
    if (
      (event.key.toLowerCase() === "enter" && active?.nextSibling) ||
      (event.key.toLowerCase() === "arrowright" && active?.nextSibling)
    ) {
      (active.nextSibling as HTMLElement).focus();
      //dispatch(submit("usernamePwForm"));
    } else if (
      (event.key.toLowerCase() === "arrowleft" && active?.previousSibling) ||
      (event.key.toLowerCase() === "backspace" && active?.previousSibling)
    ) {
      (active.previousSibling as HTMLElement).focus();
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

  return (
    <FinalField<number>
      name={`v[${num}]`}
      component="input"
      type="text"
      maxLength="1"
      pattern="[0-9]"
      placeholder={value}
      disabled={disabled === true ? "disabled" : null}
      className={fixed === true ? "fixed" : null}
      autoFocus={autoFocus}
      onKeyUp={handleKeyUp}
    />
  );
}

function isDigit(c: string) {
  return c >= "0" && c <= "9";
}
