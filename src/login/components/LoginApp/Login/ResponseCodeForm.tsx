import ButtonPrimary from "login/components/Buttons/ButtonPrimary";
import React from "react";
import { Field as FinalField, Form as FinalForm, FormRenderProps } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { FormattedMessage } from "react-intl";

interface ResponseCodeFormProps {
  extra_className: string;
  submitDisabled: boolean;
  inputsDisabled: boolean;
  code?: string;
  handleAbort?: () => void;
  handleLogin?: () => void;
}

interface ResponseCodeValues {
  v: string[];
}

export function ResponseCodeForm(props: ResponseCodeFormProps): JSX.Element {
  const valueChars = (props.code || "").split("");
  const initialValues: ResponseCodeValues = {
    v: ["S", "K", valueChars[0], valueChars[1], valueChars[2], "-", valueChars[3], valueChars[4], valueChars[5]],
  };

  function handleSubmit() {}

  return (
    <React.Fragment>
      <div className={`response-code-input ${props.extra_className}`}>
        <FinalForm<ResponseCodeValues>
          onSubmit={handleSubmit}
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
    if (values.v[pos] && values.v[pos].length && !isDigit(values.v[pos])) {
      const name = `v[${pos}]`;
      err[name] = "Not a digit";
      // Set the form-wide error too. This is what is currently displayed.
      err[FORM_ERROR] = "Not a digit";
    }
  });
  return err;
}

function ShortCodeForm(props: FormRenderProps<ResponseCodeValues> & ResponseCodeFormProps) {
  return (
    <form onSubmit={props.handleSubmit} className="response-code-form">
      <div className="response-code-inputs">
        <CodeField num={0} value="S" disabled={true} />
        <CodeField num={1} value="K" disabled={true} />
        <span className="nowrap-group">
          <CodeField num={2} value="" disabled={props.inputsDisabled} autoFocus={!props.inputsDisabled} />
          <CodeField num={3} value="" disabled={props.inputsDisabled} />
          <CodeField num={4} value="" disabled={props.inputsDisabled} />
        </span>
        <CodeField num={5} value="-" disabled={true} fixed={true} />
        <span className="nowrap-group">
          <CodeField num={6} value="" disabled={props.inputsDisabled} />
          <CodeField num={7} value="" disabled={props.inputsDisabled} />
          <CodeField num={8} value="" disabled={props.inputsDisabled} />
        </span>
      </div>
      {props.error && (
        <div role="alert" aria-invalid="true" tabIndex={0} className="input-validate-error">
          {props.error}
        </div>
      )}
      {props.handleAbort || props.handleLogin ? (
        <div className={`buttons ${props.extra_className}`}>
          {props.handleLogin && (
            <ButtonPrimary
              type="submit"
              onClick={props.handleLogin}
              id="response-code-submit-button"
              className={"settings-button"}
              disabled={props.submitDisabled || props.submitting || props.invalid}
            >
              <FormattedMessage defaultMessage="Log in" description="Login OtherDevice" />
            </ButtonPrimary>
          )}

          {props.handleAbort && (
            <ButtonPrimary
              type="submit"
              onClick={props.handleAbort}
              id="response-code-abort-button"
              className={"settings-button"}
              disabled={props.submitting}
            >
              <FormattedMessage defaultMessage="Abort" description="Login OtherDevice" />
            </ButtonPrimary>
          )}
        </div>
      ) : null}
    </form>
  );
}

interface CodeFieldProps {
  num: number;
  value: string;
  disabled?: boolean;
  fixed?: boolean;
  autoFocus?: boolean;
}

// helper-function to make for tidy code with one line per input field below
function CodeField({ num, value, disabled = false, fixed = false, autoFocus = undefined }: CodeFieldProps) {
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
