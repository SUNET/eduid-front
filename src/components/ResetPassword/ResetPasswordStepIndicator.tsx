import { StepIndicator } from "components/Common/StepIndicator";
import { FormattedMessage } from "react-intl";

const RESETPW_LABELS = [
  <FormattedMessage key="step1" description="resetpw step1" defaultMessage="Enter the email address" />,
  <FormattedMessage key="step2" description="resetpw step2" defaultMessage="Captcha" />,
  <FormattedMessage key="step3" description="resetpw step3" defaultMessage="Verify email address" />,
  <FormattedMessage key="step4" description="resetpw step4" defaultMessage="Verification method" />,
  <FormattedMessage key="step5" description="resetpw step5" defaultMessage="Set a password" />,
  <FormattedMessage key="step6" description="resetpw step6" defaultMessage="Completed" />,
];

interface ResetPasswordStepIndicatorProps {
  currentStep: number;
}

export function ResetPasswordStepIndicator({
  currentStep,
}: Readonly<ResetPasswordStepIndicatorProps>): React.JSX.Element {
  return <StepIndicator currentStep={currentStep} totalSteps={6} labels={RESETPW_LABELS} />;
}
