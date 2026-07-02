import { ResponseCodeValues } from "components/Login/ResponseCodeForm";
import { FormRenderProps } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { EduIDButton } from "./EduIDButton";

interface ResponseCodeButtonsProps {
  formProps?: FormRenderProps<ResponseCodeValues>;
  handleAbortButtonOnClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

interface ResponseCodeAbortButtonProps {
  disabled: boolean;
  invalid: boolean;
  submit: () => void;
  handleAbortButtonOnClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

export function ResponseCodeButtons({ formProps, handleAbortButtonOnClick }: Readonly<ResponseCodeButtonsProps>) {
  if (!formProps) {
    return null;
  }

  // 'convert' from FormRenderProps to a simple "disabled" boolean
  return (
    <ResponseCodeAbortButton
      disabled={formProps.submitting ?? false}
      invalid={formProps.invalid ?? false}
      submit={formProps.form.submit}
      handleAbortButtonOnClick={handleAbortButtonOnClick}
    />
  );
}

export function ResponseCodeAbortButton({
  disabled,
  invalid,
  submit,
  handleAbortButtonOnClick,
}: Readonly<ResponseCodeAbortButtonProps>) {
  // abort button usable from both ResponseCodeButtons and when isExpired below
  return (
    <div className="buttons">
      <EduIDButton
        type="button"
        buttonstyle="secondary"
        onClick={handleAbortButtonOnClick}
        id="response-code-abort-button"
        disabled={disabled}
      >
        <FormattedMessage defaultMessage="Cancel" description="button cancel" />
      </EduIDButton>
      <EduIDButton type="submit" buttonstyle="primary" onClick={submit} id="response-code-ok-button" disabled={invalid}>
        <FormattedMessage defaultMessage="Ok" description="Short code form Ok button" />
      </EduIDButton>
    </div>
  );
}
