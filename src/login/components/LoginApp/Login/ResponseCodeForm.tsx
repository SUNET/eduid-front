import { fetchNext } from "apis/eduidLogin";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import ButtonPrimary from "login/components/Buttons/ButtonPrimary";
import React from "react";
import { Field as FinalField, Form as FinalForm, FormRenderProps } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";

interface ResponseCodeProps {
  extra_className: string;
  submitDisabled: boolean;
  inputsDisabled: boolean;
  showButton: boolean;
  code?: string;
}

interface ResponseCodeValues {
  v: string[];
}

export function ResponseCodeForm(props: ResponseCodeProps): JSX.Element {
  const login_ref = useAppSelector((state) => state.login.ref);
  const dispatch = useAppDispatch();
  const history = useHistory();

  function onSubmit() {}

  function handleLoginButtonOnClick() {
    if (login_ref) {
      dispatch(fetchNext({ ref: login_ref }));
      // Send the user off to the regular login flow when they click the button
      history.push(`/login/${login_ref}`);
    }
  }

  function handleAbortButtonOnClick() {
    if (login_ref) {
      dispatch(fetchNext({ ref: login_ref }));
      // Send the user off to the regular login flow when they click the button
      history.push(`/login/${login_ref}`);
    }
  }

  const valueChars = (props.code || "").split("");
  const initialValues: ResponseCodeValues = {
    v: ["S", "K", valueChars[0], valueChars[1], valueChars[2], "-", valueChars[3], valueChars[4], valueChars[5]],
  };

  return (
    <React.Fragment>
      <div className={`response-code-input ${props.extra_className}`}>
        <FinalForm<ResponseCodeValues>
          onSubmit={onSubmit}
          initialValues={initialValues}
          render={(formProps) => {
            return (
              <ShortCodeForm
                {...formProps}
                {...props}
                handleAbort={handleAbortButtonOnClick}
                handleLogin={handleLoginButtonOnClick}
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
    if (!isDigit(values.v[pos])) {
      const name = `v[${pos}]`;
      err[name] = "Not a digit";
    }
  });
  return err;
}

interface ShortCodeFormProps extends ResponseCodeProps {
  handleAbort: () => void;
  handleLogin: () => void;
}

function ShortCodeForm(props: FormRenderProps<ResponseCodeValues> & ShortCodeFormProps) {
  return (
    <form onSubmit={props.handleSubmit} className="response-code-form">
      <div>
        <CodeField num={0} value="S" disabled={true} />
        <CodeField num={1} value="K" disabled={true} />
        <CodeField num={2} value="" disabled={props.inputsDisabled} autoFocus={!props.inputsDisabled} />
        <CodeField num={3} value="" disabled={props.inputsDisabled} />
        <CodeField num={4} value="" disabled={props.inputsDisabled} />
        <CodeField num={5} value="-" disabled={true} fixed={true} />
        <CodeField num={6} value="" disabled={props.inputsDisabled} />
        <CodeField num={7} value="" disabled={props.inputsDisabled} />
        <CodeField num={8} value="" disabled={props.inputsDisabled} />
      </div>
      {props.showButton ? (
        <div className={`buttons ${props.extra_className}`}>
          <ButtonPrimary
            type="submit"
            onClick={props.handleLogin}
            id="response-code-submit-button"
            className={"settings-button"}
            disabled={props.submitDisabled || props.submitting || props.invalid}
          >
            <FormattedMessage defaultMessage="Log in" description="Login OtherDevice" />
          </ButtonPrimary>

          <ButtonPrimary
            type="submit"
            onClick={props.handleAbort}
            id="response-code-abort-button"
            className={"settings-button"}
            disabled={props.submitting}
          >
            <FormattedMessage defaultMessage="Abort" description="Login OtherDevice" />
          </ButtonPrimary>
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
