import { Fragment } from "react/jsx-runtime";

interface SignupStepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export function SignupStepIndicator({
  currentStep,
  totalSteps = 6,
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
    </Fragment>
  );
}
