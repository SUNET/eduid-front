import ButtonPrimary from "login/components/Buttons/ButtonPrimary";
import ButtonSecondary from "login/components/Buttons/ButtonSecondary";
import React from "react";
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
              onFocus={(e: any) => e.target.select()}
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
  onFocus?: any;
}

// helper-function to make for tidy code with one line per input field below
function CodeField({ num, value, onFocus, disabled = false, fixed = false, autoFocus = undefined }: CodeFieldProps) {
  // TODO: Handle backspace, moving to the preceding field *after* clearing the contents of this one
  // TODO: Add final-form validation to the form
  function handleKeyUp(event: React.KeyboardEvent<HTMLFormElement>) {
    const pressedKey = event.key;
    const form = event.currentTarget.form;
    const inputs = [...form].filter((input: { disabled?: boolean }) => !input.disabled);
    const index = inputs.indexOf(event.currentTarget);
    switch (pressedKey) {
      case "Backspace":
      case "Delete": {
        event.preventDefault();
        if (inputs[index].value) {
        } else {
          inputs[index - 1].focus();
          // focusPrevInput();
        }
        break;
      }
      case "ArrowLeft": {
        event.preventDefault();
        if (inputs[index - 1] !== undefined) {
          inputs[index - 1].focus();
        }

        // focusPrevInput();
        break;
      }
      case "ArrowRight": {
        event.preventDefault();
        if (inputs[index + 1] !== undefined) {
          inputs[index + 1].focus();
        }
        // focusNextInput();

        break;
      }
      default: {
        if (pressedKey.match(/(\w|\s)/g)) {
          event.preventDefault();
        }
      }
    }

    // console.log("Key up: ", event.key.toLowerCase());
    // if (event.key.toLowerCase() === "enter") {
    //   event.preventDefault();
    //   //dispatch(submit("usernamePwForm"));
    // } else if (isDigit(event.key.toLowerCase())) {
    //   // focus the next input field
    //   const form = event.currentTarget.form;
    //   // disabled inputs are placeholders, filter them out
    //   const inputs = [...form].filter((input: { disabled?: boolean }) => !input.disabled);
    //   const index = inputs.indexOf(event.currentTarget);
    //   if (index < 0) {
    //     // bail of the current input could not be found
    //     return undefined;
    //   }
    //   const lastIndex = inputs.length - 1;
    //   console.log(`Current index ${index} of ${lastIndex}`);
    //   if (index > -1 && index < inputs.length - 1) {
    //     console.log(`Advancing focus to index ${index + 1} of ${lastIndex}`);
    //     inputs[index + 1].focus();
    //   }
    // }
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
      onFocus={onFocus}
    />
  );
}

function isDigit(c: string) {
  return c >= "0" && c <= "9";
}
