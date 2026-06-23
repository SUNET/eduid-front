import { Fragment } from "react/jsx-runtime";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: React.ReactNode[];
}

export function StepIndicator({ currentStep, totalSteps, labels }: Readonly<StepIndicatorProps>): React.JSX.Element {
  return (
    <Fragment>
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
    </Fragment>
  );
}
