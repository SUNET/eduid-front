import React, { FocusEvent } from "react";
import { Field as FinalField, Form as FinalForm, FormRenderProps, useForm } from "react-final-form";
import { FormattedMessage } from "react-intl";

// export for use in tests
export const codeFormTestId = "response-code-form";

interface ResponseCodeFormProps {
  bad_attempts?: number;
  children?: React.ReactNode;
  code?: string;
  handleSubmitCode(values: ResponseCodeValues): void;
  inputsDisabled: boolean;
}

export interface ResponseCodeValues {
  v: string[];
}

export function ResponseCodeForm(props: ResponseCodeFormProps): JSX.Element {
  const valueChars = (props.code || "").split("");
  const initialValues: ResponseCodeValues = {
    v: [valueChars[0], valueChars[1], valueChars[2], valueChars[3], valueChars[4], valueChars[5]],
  };

  return (
    <FinalForm<ResponseCodeValues>
      onSubmit={props.handleSubmitCode}
      initialValues={initialValues}
      render={(formProps) => {
        // Add the formProps to all the children of this component. The children are typically buttons,
        // and they need to know some of the formProps to know if they should be disabled or not.
        const childrenWithProps = React.Children.map(props.children, (child) => {
          if (React.isValidElement<{ formProps: any }>(child)) {
            return React.cloneElement(child, { formProps });
          }
          return child;
        });

        return (
          <React.Fragment>
            <ShortCodeForm {...formProps} {...props} />
            {childrenWithProps}
          </React.Fragment>
        );
      }}
    />
  );
}

function ShortCodeForm(props: FormRenderProps<ResponseCodeValues> & ResponseCodeFormProps) {
  const showBadAttempts = Boolean(props.bad_attempts && props.bad_attempts > 0);

  return (
    <form onSubmit={props.handleSubmit} className="response-code-form" data-testid={codeFormTestId}>
      <div className="response-code-inputs">
        <CodeField num={0} disabled={props.inputsDisabled} autoFocus={!props.inputsDisabled} />
        <CodeField num={1} disabled={props.inputsDisabled} />
        <CodeField num={2} disabled={props.inputsDisabled} />
        <CodeField num={3} disabled={props.inputsDisabled} />
        <CodeField num={4} disabled={props.inputsDisabled} />
        <CodeField num={5} disabled={props.inputsDisabled} />
      </div>

      {showBadAttempts && (
        <div>
          <span className="input-validate-error" id="wrong-code-error">
            <FormattedMessage defaultMessage="Incorrect code, try again" description="Short code form" />
          </span>
        </div>
      )}

      {props.error && <p>{props.error}</p>}
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

  /* Advance to the next input field on (valid) key press, and handle back/forward/delete keys */
  function handleKeyUp(event: React.KeyboardEvent<HTMLFormElement>) {
    const pressedKey = event.key;
    const ResponseCodeForm = event.currentTarget.form;
    const inputs = [...ResponseCodeForm].filter((input: HTMLInputElement) => input.tagName.toLowerCase() === "input");
    const index = inputs.indexOf(event.currentTarget);

    if (form.getState().valid) {
      form.submit();
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
