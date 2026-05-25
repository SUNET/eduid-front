import { useAppSelector } from "eduid-hooks";
import { Fragment } from "react/jsx-runtime";

interface SignupStepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export function SignupStepIndicator({
  currentStep,
  totalSteps,
}: Readonly<SignupStepIndicatorProps>): React.JSX.Element {
  const external_mfa = useAppSelector((state) => state.signup.state?.external_mfa);
  const steps = totalSteps ?? (external_mfa ? 6 : 7);

  return (
    <Fragment>
      <hr className="border-line border-line-lesser" />
      <section className="step-indicator">
        {Array.from({ length: steps }, (_, i) => {
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
