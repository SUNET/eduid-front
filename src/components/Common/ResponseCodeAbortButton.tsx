import { ResponseCodeValues } from "components/Login/ResponseCodeForm";
import { FormRenderProps } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { EduIDButton } from "./EduIDButton";

interface ResponseCodeButtonsProps {
  formProps?: FormRenderProps<ResponseCodeValues>;
  handleAbortButtonOnClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  // Also keep Ok disabled while the "email" extraField (see ResponseCodeForm) is empty.
  // EmailInput's validate() never flags a blank value, so formProps.invalid alone won't catch it -
  // EmailForm.tsx compensates for the same gap by ORing in a "no email yet" check.
  requireEmail?: boolean;
}

interface ResponseCodeAbortButtonProps {
  disabled: boolean;
  invalid: boolean;
  submit: () => void;
  handleAbortButtonOnClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

export function ResponseCodeButtons({
  formProps,
  handleAbortButtonOnClick,
  requireEmail,
}: Readonly<ResponseCodeButtonsProps>) {
  if (!formProps) {
    return null;
  }

  const emailMissing = Boolean(requireEmail) && !formProps.values?.email;

  // 'convert' from FormRenderProps to a simple "disabled" boolean
  return (
    <ResponseCodeAbortButton
      disabled={formProps.submitting ?? false}
      invalid={(formProps.invalid ?? false) || emailMissing}
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
        <FormattedMessage id="common.cancel" defaultMessage="Cancel" description="button cancel" />
      </EduIDButton>
      <EduIDButton type="submit" buttonstyle="primary" onClick={submit} id="response-code-ok-button" disabled={invalid}>
        <FormattedMessage
          id="common.continue"
          defaultMessage="Continue"
          description="Short code form Continue button"
        />
      </EduIDButton>
    </div>
  );
}
