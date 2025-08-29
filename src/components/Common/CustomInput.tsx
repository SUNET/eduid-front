import { FieldRenderProps } from "react-final-form";
import { InputWrapper } from "./InputWrapper";

type InputType = "text" | "password" | "email";

export interface CustomInputProps<T> extends FieldRenderProps<T> {
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  label?: string;
  helpBlock?: string;
  passwordStrengthMeter?: string;
  children?: React.ReactNode;

}

export default function CustomInput(props: FieldRenderProps<string>): React.JSX.Element {
  // the InputWrapper renders it's children plus a label, helpBlock and any error message from the field validation
  return (
    <InputWrapper {...props}>
      <InputElement {...props} />
    </InputWrapper>
  );
}

export interface CustomInputProps<T> extends FieldRenderProps<T> {
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
}

const InputElement = (props: CustomInputProps<string>): React.JSX.Element => {
  let className = "is-valid";
  if (props.meta.touched || props.meta.submitFailed) {
    if (props.meta.invalid) {
      className = "is-invalid";
    }
  }
  if (props.disabled) {
    className = "disabled";
  }

  return (
    <input
      {...props.input}
      id={props.input.name}
      type={props.input.type as InputType}
      className={`${className}`}
      placeholder={props.placeholder}
      aria-required={props.required}
      autoFocus={props.autoFocus}
      autoComplete={props.autoComplete}
    />
  );
};
