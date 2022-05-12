import EduIDButton from "../../../../components/EduIDButton";
import React, { FocusEvent } from "react";
import { Field as FinalField, Form as FinalForm, FormRenderProps, useForm } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { useAppSelector } from "login/app_init/hooks";

interface ResponseCodeFormProps {
  codeRequired?: boolean;
  extra_className: string;
  submitDisabled: boolean;
  inputsDisabled: boolean;
  code?: string;
  handleSubmitCode: (values: ResponseCodeValues) => undefined;
  handleAbort?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleLogin?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleContinueWithoutCode?: () => void;
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
      <div className={props.extra_className}>
        {props.codeRequired ? (
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
          />
        ) : (
          <div className="buttons">
            <EduIDButton
              buttonstyle="secondary"
              type="submit"
              onClick={props.handleAbort}
              id="response-code-cancel-button"
            >
              <FormattedMessage defaultMessage="Cancel" description="Login OtherDevice" />
            </EduIDButton>
            <EduIDButton
              type="submit"
              buttonstyle="primary"
              onClick={props.handleContinueWithoutCode}
              id="response-code-continue-button"
            >
              <FormattedMessage defaultMessage="Continue" description="Login OtherDevice" />
            </EduIDButton>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

function ShortCodeForm(props: FormRenderProps<ResponseCodeValues> & ResponseCodeFormProps) {
  const bad_attempts = useAppSelector((state) => state.login.other_device1?.bad_attempts);
  const showBadAttempts = Boolean(bad_attempts && bad_attempts > 0);

  return (
    <form onSubmit={props.handleSubmit} className="response-code-form" id="response-code-form">
      <div className="response-code-inputs">
        <CodeField num={2} disabled={props.inputsDisabled} autoFocus={!props.inputsDisabled} />
        <CodeField num={3} disabled={props.inputsDisabled} />
        <CodeField num={4} disabled={props.inputsDisabled} />
        <CodeField num={6} disabled={props.inputsDisabled} />
        <CodeField num={7} disabled={props.inputsDisabled} />
        <CodeField num={8} disabled={props.inputsDisabled} />
      </div>

      {showBadAttempts && (
        <div>
          <span className="input-validate-error" id="wrong-code-error">
            <FormattedMessage defaultMessage="Incorrect code, try again" description="Other Device, device 1" />
          </span>
        </div>
      )}

      {props.error && <p>{props.error}</p>}

      {props.handleAbort || props.handleLogin ? (
        <div className={`buttons ${props.extra_className}`}>
          {props.handleAbort && (
            <EduIDButton
              type="submit"
              buttonstyle="secondary"
              onClick={props.handleAbort}
              id="response-code-abort-button"
              disabled={props.submitting}
            >
              <FormattedMessage defaultMessage="Cancel" description="Login OtherDevice" />
            </EduIDButton>
          )}
          {props.handleLogin && (
            <EduIDButton
              type="submit"
              onClick={props.handleLogin}
              id="response-code-submit-button"
              buttonstyle="primary"
              disabled={props.submitDisabled || props.submitting || props.invalid || props.pristine}
            >
              <FormattedMessage defaultMessage="Log in" description="Login OtherDevice" />
            </EduIDButton>
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
  autoFocus?: boolean;
}

// helper-component to make for tidy code with one line per input field in ShortCodeForm
function CodeField({ num, value, disabled = false, autoFocus = undefined }: CodeFieldProps) {
  const form = useForm();

  function handleKeyUp(event: React.KeyboardEvent<HTMLFormElement>) {
    const pressedKey = event.key;
    const ResponseCodeForm = event.currentTarget.form;
    const inputs = [...ResponseCodeForm].filter((input: HTMLInputElement) => input.tagName.toLowerCase() === "input");
    const index = inputs.indexOf(event.currentTarget);

    if (form.getState().valid) {
      (document.getElementById("response-code-submit-button") as HTMLButtonElement).click();
      // when clicking button, autofocus to first input field
      inputs[0].focus();
    }

    switch (pressedKey.toLowerCase()) {
      case "backspace":
      case "delete": {
        if (inputs[index - 1] !== undefined) {
          inputs[index - 1].focus();
        }
        break;
      }
      case "arrowleft": {
        if (inputs[index - 1] !== undefined) {
          inputs[index - 1].focus();
        }
        break;
      }
      case "arrowright": {
        if (inputs[index + 1] !== undefined) {
          inputs[index + 1].focus();
        }
        break;
      }
      default: {
        if (isDigit(pressedKey)) {
          // In case more than one digit is pressed rapidly, the second one is blocked in the keyPress
          // event handler, but both generate keyUp event. We only want to advance the focus if a value
          // was registered for this input.
          const thisInputHasValue = Boolean((event.target as HTMLTextAreaElement).value);
          if (inputs[index + 1] !== undefined && thisInputHasValue) {
            inputs[index + 1].focus();
          }
        }
        break;
      }
    }
  }

  function handleCodeFieldKeyPress(e: React.KeyboardEvent<HTMLFormElement>) {
    if (!isDigit(e.key)) e.preventDefault();
    // Prevent more than 1 digit per input field
    if ((e.target as HTMLTextAreaElement).value) e.preventDefault();
  }

  function validateCodeForm(value: number): string | undefined {
    if (!value) {
      return "required";
    }
  }

  return (
    <FinalField<number>
      name={`v[${num}]`}
      component="input"
      type="number"
      maxLength="1"
      pattern="[0-9]"
      min="0"
      max="9"
      placeholder={value}
      disabled={disabled === true ? "disabled" : null}
      autoFocus={autoFocus}
      onKeyUp={handleKeyUp}
      onFocus={(event: FocusEvent<HTMLInputElement>) => event.target.select()}
      onKeyPress={handleCodeFieldKeyPress}
      validate={validateCodeForm}
    />
  );
}

function isDigit(c: string) {
  return c >= "0" && c <= "9";
}
