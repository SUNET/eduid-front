import React, { forwardRef } from "react";
import { useIntl } from "react-intl";

interface ExtraProps {
  "aria-label"?: string;
}

interface EduIDButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly id?: string;
  readonly buttonstyle: string;
}

// depends on props.buttonstyle, button will display as primary, secondary, link or close button
const EduIDButton = forwardRef<HTMLButtonElement, EduIDButtonProps>((props, ref) => {
  const intl = useIntl();
  const extra: ExtraProps = {};

  if (props.buttonstyle.includes("close")) {
    const closeLabel = intl.formatMessage({
      id: "modal.close",
      defaultMessage: "Close",
      description: "Notification modal close label",
    });
    extra["aria-label"] = closeLabel;
  }

  return (
    <button
      ref={ref}
      type={props.type ? props.type : "button"}
      className={props.buttonstyle}
      {...extra}
      {...{ ...props, buttonstyle: undefined }}
    >
      {props.children}
    </button>
  );
});

EduIDButton.displayName = "EduIDButton";
export default EduIDButton;
