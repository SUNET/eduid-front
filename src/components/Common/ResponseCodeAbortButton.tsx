import { ResponseCodeValues } from "components/Login/ResponseCodeForm";
import { FormRenderProps } from "react-final-form";
import { FormattedMessage } from "react-intl";
import EduIDButton from "./EduIDButton";

interface ResponseCodeButtonsProps {
  formProps?: FormRenderProps<ResponseCodeValues>;
  handleAbortButtonOnClick: any;
}

export function ResponseCodeButtons(props: ResponseCodeButtonsProps) {
  if (!props.formProps) {
    return null;
  }

  // 'convert' from FormRenderProps to a simple "disabled" boolean
  return (
    <ResponseCodeAbortButton
      disabled={props.formProps.submitting}
      invalid={props.formProps.invalid}
      submit={props.formProps.form.submit}
      handleAbortButtonOnClick={props.handleAbortButtonOnClick}
    />
  );
}

export function ResponseCodeAbortButton(props: {
  disabled: boolean;
  invalid: boolean;
  submit: () => void;
  handleAbortButtonOnClick: any;
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
        <FormattedMessage defaultMessage="Cancel" description="Short code form" />
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
