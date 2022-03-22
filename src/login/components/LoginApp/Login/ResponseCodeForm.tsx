import ButtonPrimary from "login/components/Buttons/ButtonPrimary";
import ButtonSecondary from "login/components/Buttons/ButtonSecondary";
import React, { FocusEvent } from "react";
import { Field as FinalField, Form as FinalForm, FormRenderProps } from "react-final-form";
import { FormattedMessage } from "react-intl";

interface ResponseCodeFormProps {
  extra_className: string;
  submitDisabled: boolean;
  inputsDisabled: boolean;
  code?: string;
  handleSubmitCode: (values: ResponseCodeValues) => undefined;
  handleAbort?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleLogin?: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
        />
      </div>
    </React.Fragment>
  );
}

//type FixedFormRenderProps = Omit<FormRenderProps<ResponseCodeValues>, "handleSubmit">;

function ShortCodeForm(props: FormRenderProps<ResponseCodeValues> & ResponseCodeFormProps) {
  // the code is formatted as SK123-456, ignore positions S, K and -
  const positions = [2, 3, 4, 6, 7, 8];
  const invalidInputs = positions.filter((pos) => {
    return props.values.v[pos] == undefined;
  });

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
              disabled={
                invalidInputs.length > 0 || props.submitDisabled || props.submitting || props.invalid || props.pristine
              }
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
  value: string;
  disabled?: boolean;
  fixed?: boolean;
  autoFocus?: boolean;
}

// helper-component to make for tidy code with one line per input field in ShortCodeForm
function CodeField({ num, value, disabled = false, fixed = false, autoFocus = undefined }: CodeFieldProps) {
  function handleKeyUp(event: React.KeyboardEvent<HTMLFormElement>) {
    const pressedKey = event.key;
    const form = event.currentTarget.form;
    const inputs = [...form].filter((input: { disabled?: boolean }) => !input.disabled);
    const index = inputs.indexOf(event.currentTarget);
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

  function onlyAllowedNumericalInput(e: React.KeyboardEvent<HTMLFormElement>) {
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
      className={fixed === true ? "fixed" : null}
      autoFocus={autoFocus}
      onKeyUp={handleKeyUp}
      onFocus={(event: FocusEvent<HTMLInputElement>) => event.target.select()}
      onKeyPress={onlyAllowedNumericalInput}
    />
  );
}

function isDigit(c: string) {
  return c >= "0" && c <= "9";
}
