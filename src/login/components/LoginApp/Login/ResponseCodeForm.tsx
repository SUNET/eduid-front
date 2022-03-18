import ButtonPrimary from "login/components/Buttons/ButtonPrimary";
import ButtonSecondary from "login/components/Buttons/ButtonSecondary";
import React, { FocusEvent } from "react";
import { Field as FinalField, Form as FinalForm, FormRenderProps } from "react-final-form";
import { FORM_ERROR } from "final-form";
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
  return (
    <form onSubmit={props.handleSubmit} className="response-code-form">
      <div className="response-code-inputs">
        {Array(9)
          .fill("")
          .map((_, index) => (
            <CodeField
              key={index}
              num={index}
              value=""
              disabled={index === 0 || index === 1 || index === 5 ? true : false}
              autoFocus={index === 2 ? true : false}
            />
          ))}
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
  value: string;
  disabled?: boolean;
  fixed?: boolean;
  autoFocus?: boolean;
}

// helper-function to make for tidy code with one line per input field below
function CodeField({ num, value, disabled = false, fixed = false, autoFocus = undefined }: CodeFieldProps) {
  function handleKeyUp(event: React.KeyboardEvent<HTMLFormElement>) {
    const pressedKey = event.key;
    const form = event.currentTarget.form;
    const inputs = [...form].filter((input: { disabled?: boolean }) => !input.disabled);
    const index = inputs.indexOf(event.currentTarget);
    switch (pressedKey) {
      case "Backspace":
      case "Delete": {
        if (inputs[index].value) {
        } else {
          inputs[index - 1].focus();
        }
        break;
      }
      case "ArrowLeft": {
        if (inputs[index - 1] !== undefined) {
          inputs[index - 1].focus();
        }
        break;
      }
      case "ArrowRight": {
        if (inputs[index + 1] !== undefined) {
          inputs[index + 1].focus();
        }
        break;
      }
      default: {
        if (isDigit(pressedKey)) {
          if (index > -1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
          }
        }
        break;
      }
    }
  }

  function onlyAllowedNumericalInput(e: React.KeyboardEvent<HTMLFormElement>) {
    e = e || window.event;
    const charCode = typeof e.which == "undefined" ? e.keyCode : e.which;
    const charStr = String.fromCharCode(charCode);
    if (!charStr.match(/^[0-9]+$/)) e.preventDefault();
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
