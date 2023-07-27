import React, { useRef } from "react";
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
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const form = useForm();

  function validateCodeForm(value: number): string | undefined {
    if (!value) {
      return "required";
    }
  }

  function selectIfNotEmpty(event: React.FocusEvent<HTMLInputElement>) {
    if (event.target.value) {
      event.target.select();
    }
  }

  function handleInput(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const onlyNumbers = value.replace(/\D/g, ""); // Remove all non-numeric characters

    // Update the input field's value with only numeric characters
    target.value = onlyNumbers;

    if (onlyNumbers && target.nextElementSibling instanceof HTMLInputElement) {
      target.nextElementSibling.focus();
    }
  }

  function handleBackspace(event: React.KeyboardEvent<HTMLFormElement>) {
    const target = event.target as HTMLInputElement;
    if (
      event.key === "Backspace" &&
      target?.value === "" &&
      target.previousElementSibling instanceof HTMLInputElement
    ) {
      target?.previousElementSibling?.focus();
    }
    if (form.getState().valid) {
      form.submit();
    }
  }

  function handleArrows(event: React.KeyboardEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    if (event.key === "ArrowLeft" && target.previousElementSibling instanceof HTMLInputElement) {
      event.preventDefault();
      target.previousElementSibling.focus();
    }

    if (event.key === "ArrowRight" && target.nextElementSibling instanceof HTMLInputElement) {
      event.preventDefault();
      target.nextElementSibling.focus();
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();

    const pastedText = event.clipboardData.getData("text");
    const numbersOnly = pastedText.replace(/[^\d]/g, "");
    const digits = numbersOnly.split("");

    // Get all the input elements
    const inputs = document.querySelectorAll('input[name^="v["]');

    // Save the current input values
    const currentValues = Array.from(inputs).map((input) => (input as HTMLInputElement).value);

    // Distribute the digits to each input
    for (let i = 0; i < Math.min(digits.length, inputs.length); i++) {
      const input = inputs[i] as HTMLInputElement;
      const digit = digits[i];

      // Update the input value only if it's empty
      if (!input.value) {
        input.value = digit;
      }

      const fieldName = `v[${i}]`;
      form.change(fieldName, input.value);
    }

    // Restore the previous input values for any remaining empty inputs
    for (let i = digits.length; i < inputs.length; i++) {
      const input = inputs[i] as HTMLInputElement;
      const fieldName = `v[${i}]`;

      if (!input.value) {
        input.value = currentValues[i] || "";
        form.change(fieldName, input.value);
      }
    }

    // Trigger form submission if all inputs are filled
    const allInputsFilled = Array.from(inputs).every((input) => (input as HTMLInputElement).value !== "");
    if (allInputsFilled && form.getState().valid) {
      form.submit();
    }
  }

  return (
    <FinalField<number>
      name={`v[${num}]`}
      component="input"
      type="number"
      pattern="[0-9]*"
      maxLength="1"
      placeholder={value}
      disabled={disabled === true ? "disabled" : null}
      autoFocus={autoFocus}
      validate={validateCodeForm}
      ref={(input: HTMLInputElement) => input && inputsRef.current.push(input)}
      onFocus={selectIfNotEmpty}
      onInput={handleInput}
      onKeyUp={handleBackspace}
      onKeyDown={handleArrows}
      onPaste={handlePaste}
    />
  );
}
