import { StepIndicator } from "components/Common/StepIndicator";
import { FormattedMessage } from "react-intl";

const SIGNUP_LABELS = [
  <FormattedMessage
    id="stepIndicator.step1"
    key="step1"
    description="signup step1"
    defaultMessage="Registration method"
  />,
  <FormattedMessage id="stepIndicator.step2" key="step2" description="signup step2" defaultMessage="Confirm/Accept" />,
  <FormattedMessage
    id="common.verifyEmailAddress"
    key="step3"
    description="signup step3"
    defaultMessage="Verify email address"
  />,
  <FormattedMessage id="stepIndicator.step4" key="step4" description="signup step4" defaultMessage="Sign-in method" />,
  <FormattedMessage id="common.completed" key="step5" description="signup step5" defaultMessage="Completed" />,
];

interface SignupStepIndicatorProps {
  currentStep: number;
}

export function SignupStepIndicator({ currentStep }: Readonly<SignupStepIndicatorProps>): React.JSX.Element {
  return <StepIndicator currentStep={currentStep} totalSteps={5} labels={SIGNUP_LABELS} />;
}
