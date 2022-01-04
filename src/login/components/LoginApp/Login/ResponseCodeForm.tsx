import { fetchNext } from "apis/eduidLogin";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import ButtonPrimary from "login/components/Buttons/ButtonPrimary";
import React from "react";
import { Field, Form } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";

interface ResponseCodeProps {
  extra_className: string;
  submitDisabled: boolean;
  inputsDisabled: boolean;
  showButton: boolean;
  value?: string;
}

export function ResponseCodeForm(props: ResponseCodeProps): JSX.Element {
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
    fixed?: boolean;
    autoFocus?: boolean;
  }

  // helper-function to make for tidy code with one line per input field below
  function CodeField({ num, value, disabled = false, fixed = false, autoFocus = undefined }: CodeFieldProps) {
    return (
      <Field
        name={`code${num}`}
        component="input"
        type="text"
        maxLength="1"
        pattern="[0-9]"
        placeholder={value}
        disabled={disabled === true ? "disabled" : undefined}
        className={fixed === true ? "fixed" : undefined}
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

  function handleAbortButtonOnClick() {
    if (login_ref) {
      dispatch(fetchNext({ ref: login_ref }));
      // Send the user off to the regular login flow when they click the button
      history.push(`/login/${login_ref}`);
    }
  }

  const valueChars = (props.value || "").split("");
  const initialValues = {
    // code0 is 'S'
    // code1 is 'K'
    code2: valueChars[0],
    code3: valueChars[1],
    code4: valueChars[2],
    // code5 is '-'
    code6: valueChars[3],
    code7: valueChars[4],
    code8: valueChars[5],
  };

  return (
    <React.Fragment>
      <div className={`response-code-input ${props.extra_className}`}>
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} className="response-code-form">
              <div>
                <CodeField num={0} value="S" disabled={true} fixed={true} />
                <CodeField num={1} value="K" disabled={true} fixed={true} />
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
                    onClick={handleLoginButtonOnClick}
                    id="response-code-submit-button"
                    className={"settings-button"}
                    disabled={props.submitDisabled}
                  >
                    <FormattedMessage defaultMessage="Log in" description="Login OtherDevice" />
                  </ButtonPrimary>

                  <ButtonPrimary
                    type="submit"
                    onClick={handleAbortButtonOnClick}
                    id="response-code-abort-button"
                    className={"settings-button"}
                  >
                    <FormattedMessage defaultMessage="Abort" description="Use another device, finished" />
                  </ButtonPrimary>
                </div>
              ) : null}
            </form>
          )}
        />
      </div>
    </React.Fragment>
  );
}
