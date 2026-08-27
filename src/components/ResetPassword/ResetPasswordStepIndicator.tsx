import { StepIndicator } from "components/Common/StepIndicator";
import { FormattedMessage } from "react-intl";

const RESETPW_LABELS = [
  <FormattedMessage id="stepIndicator.resetpwStep1" key="step1" description="resetpw step1" defaultMessage="Enter email address" />,
  <FormattedMessage id="stepIndicator.resetpwStep2" key="step2" description="resetpw step2" defaultMessage="Confirm Captcha" />,
  <FormattedMessage id="common.verifyEmailAddress" key="step3" description="resetpw step3" defaultMessage="Verify email address" />,
  <FormattedMessage id="stepIndicator.resetpwStep4" key="step4" description="resetpw step4" defaultMessage="Verification method" />,
  <FormattedMessage id="stepIndicator.resetpwStep5" key="step5" description="resetpw step5" defaultMessage="Set password" />,
  <FormattedMessage id="common.completed" key="step6" description="resetpw step6" defaultMessage="Completed" />,
];

interface ResetPasswordStepIndicatorProps {
  currentStep: number;
}

export function ResetPasswordStepIndicator({
  currentStep,
}: Readonly<ResetPasswordStepIndicatorProps>): React.JSX.Element {
  return <StepIndicator currentStep={currentStep} totalSteps={6} labels={RESETPW_LABELS} />;
}
