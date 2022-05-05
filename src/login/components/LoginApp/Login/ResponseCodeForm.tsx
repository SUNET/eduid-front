import EduIDButton from "../../../../components/EduIDButton";
import React, { FocusEvent } from "react";
import { Field as FinalField, Form as FinalForm, FormRenderProps } from "react-final-form";
import { FormattedMessage } from "react-intl";

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
  return (
    <form onSubmit={props.handleSubmit} className="response-code-form">
      <div className="response-code-inputs">
        <CodeField num={2} disabled={props.inputsDisabled} autoFocus={!props.inputsDisabled} />
        <CodeField num={3} disabled={props.inputsDisabled} />
        <CodeField num={4} disabled={props.inputsDisabled} />
        <CodeField num={6} disabled={props.inputsDisabled} />
        <CodeField num={7} disabled={props.inputsDisabled} />
        <CodeField num={8} disabled={props.inputsDisabled} />
      </div>
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
  function handleKeyUp(event: React.KeyboardEvent<HTMLFormElement>) {
    const pressedKey = event.key;
    const form = event.currentTarget.form;
    const inputs = [...form].filter((input: HTMLElement) => input.tagName.toLowerCase() === "input");
    const index = inputs.indexOf(event.currentTarget);
    const checkIfInputHasValue = inputs.find((input: { value?: string }) => !input.value);

    if (checkIfInputHasValue === undefined) {
      //  (document.getElementById("response-code-submit-button")as HTMLElement).addEventListener("click", props.handleLogin);
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
          if (inputs[index + 1] !== undefined) {
            inputs[index + 1].focus();
          }
        }
        break;
      }
    }
  }

  function handleCodeFieldKeyPress(e: React.KeyboardEvent<HTMLFormElement>) {
    if (!isDigit(e.key)) e.preventDefault();
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
      autoFocus={autoFocus}
      onKeyUp={handleKeyUp}
      onFocus={(event: FocusEvent<HTMLInputElement>) => event.target.select()}
      onKeyPress={handleCodeFieldKeyPress}
    />
  );
}

function isDigit(c: string) {
  return c >= "0" && c <= "9";
}
