import { Fragment } from "react/jsx-runtime";

interface SignupStepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
  labels?: string[];
}

export function SignupStepIndicator({
  currentStep,
  totalSteps = 4,
  labels = ["Registration method", "Confirm/Accept", "Verify email address", "Sign-in method"],
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
            <span key={i} className={i + 1 === currentStep ? "active" : ""}>
              {label}
            </span>
          ))}
        </section>
      )}
    </Fragment>
  );
}
