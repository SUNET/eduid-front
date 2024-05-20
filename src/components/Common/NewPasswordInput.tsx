import { FieldRenderProps } from "react-final-form";
import { InputWrapper } from "./InputWrapper";
import { PasswordInputElement } from "./PasswordInput";

export default function NewPasswordInput(props: FieldRenderProps<string>): JSX.Element {
  // the InputWrapper renders it's children plus a label, helpBlock and any error message from the field validation
  return (
    <InputWrapper {...props}>
      <PasswordInputElement {...props} />
    </InputWrapper>
  );
}
