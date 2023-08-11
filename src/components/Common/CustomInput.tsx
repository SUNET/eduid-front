import { FieldRenderProps } from "react-final-form";
import { Input } from "reactstrap";
import { InputWrapper } from "./InputWrapper";

export default function CustomInput(props: FieldRenderProps<string>): JSX.Element {
  // the InputWrapper renders it's children plus a label, helpBlock and any error message from the field validation
  return (
    <InputWrapper {...props}>
      <InputElement {...props} />
    </InputWrapper>
  );
}

const InputElement = (props: FieldRenderProps<string>): JSX.Element => {
  return (
    <Input
      {...props.input}
      id={props.input.name}
      type={props.type}
      placeholder={props.placeholder}
      aria-required={props.input.required}
      valid={props.meta.valid}
      invalid={props.invalid}
      autoFocus={props.autoFocus}
      autoComplete={props.autoComplete}
    />
  );
};
