import { FormattedMessage } from "react-intl";

interface SignupStepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
  labels?: React.ReactNode[];
}

export function SignupStepIndicator({
  currentStep,
  totalSteps = 5,

  labels = [
    <FormattedMessage key="step1" description="signup step1" defaultMessage="Registration method" />,
    <FormattedMessage key="step2" description="signup step2" defaultMessage="Confirm/Accept" />,
    <FormattedMessage key="step3" description="signup step3" defaultMessage="Verify email address" />,
    <FormattedMessage key="step4" description="signup step4" defaultMessage="Sign-in method" />,
    <FormattedMessage key="step5" description="signup step5" defaultMessage="Completed" />,
  ],
}: Readonly<SignupStepIndicatorProps>) {
  return (
    <>
      <hr className="border-line border-line-lesser" />
      <section className="step-indicator">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          let className = "step-item";
          if (step < currentStep) className += " completed";
          else if (step === currentStep) className += " active";

          return (
            <div key={step} className={className}>
              <div className="step-number">{step}</div>
              {labels[i] && <span className="step-label">{labels[i]}</span>}
            </div>
          );
        })}
      </section>
    </>
  );
}
