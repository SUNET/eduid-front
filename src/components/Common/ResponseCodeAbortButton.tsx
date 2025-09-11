import { ResponseCodeValues } from "components/Login/ResponseCodeForm";
import { FormRenderProps } from "react-final-form";
import { FormattedMessage } from "react-intl";
import EduIDButton from "./EduIDButton";

interface ResponseCodeButtonsProps {
  formProps?: FormRenderProps<ResponseCodeValues>;
  //TODO: Type definition needed
  handleAbortButtonOnClick: () => void;
}

export function ResponseCodeButtons(props: ResponseCodeButtonsProps) {
  if (!props.formProps) {
    return null;
  }

  // 'convert' from FormRenderProps to a simple "disabled" boolean
  return (
    <ResponseCodeAbortButton
      disabled={props.formProps.submitting ?? false}
      invalid={props.formProps.invalid ?? false}
      submit={props.formProps.form.submit}
      handleAbortButtonOnClick={props.handleAbortButtonOnClick}
    />
  );
}

export function ResponseCodeAbortButton(props: {
  disabled: boolean;
  invalid: boolean;
  submit: () => void;
  handleAbortButtonOnClick: () => void;
}) {
  // abort button usable from both ResponseCodeButtons and when isExpired below
  return (
    <div className="buttons">
      <EduIDButton
        type="button"
        buttonstyle="secondary"
        onClick={props.handleAbortButtonOnClick}
        id="response-code-abort-button"
        disabled={props.disabled}
      >
        <FormattedMessage defaultMessage="Cancel" description="button cancel" />
      </EduIDButton>
      <EduIDButton
        type="submit"
        buttonstyle="primary"
        onClick={props.submit}
        id="response-code-ok-button"
        disabled={props.invalid}
      >
        <FormattedMessage defaultMessage="Ok" description="Short code form Ok button" />
      </EduIDButton>
    </div>
  );
}
