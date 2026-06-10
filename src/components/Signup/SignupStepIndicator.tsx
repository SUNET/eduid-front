import { FormattedMessage } from "react-intl";
import { Fragment } from "react/jsx-runtime";

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
}: Readonly<SignupStepIndicatorProps>): React.JSX.Element {
  return (
    <Fragment>
      <hr className="border-line border-line-lesser" />
      <section className="step-indicator">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          let className = "";
          if (step < currentStep) className = "completed";
          else if (step === currentStep) className = "active";

          return (
            <div key={step} className={className}>
              {step}
            </div>
          );
        })}
      </section>
      {labels.length > 0 && (
        <section className="step-labels">
          {labels.map((label, i) => (
            <span key={`step-label-${i + 1}`} className={i + 1 === currentStep ? "active" : ""}>
              {label}
            </span>
          ))}
        </section>
      )}
    </Fragment>
  );
}
