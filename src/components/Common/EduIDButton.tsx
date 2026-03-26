import React, { forwardRef } from "react";
import { useIntl } from "react-intl";

interface ExtraProps {
  "aria-label"?: string;
  "title"?: string;
}

interface EduIDButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id?: string;
  buttonstyle: string;
}

// depends on props.buttonstyle, button will display as primary, secondary, link or close button
const EduIDButton = forwardRef<HTMLButtonElement, Readonly<EduIDButtonProps>>((props, ref) => {
  const intl = useIntl();
  const extra: ExtraProps = {};

  if (props.buttonstyle.includes("close")) {
    const closeLabel = intl.formatMessage({
      id: "modal.close",
      defaultMessage: "Close",
      description: "Notification modal close label",
    });
    extra["aria-label"] = closeLabel;
    extra["title"] = closeLabel;
  }

  return (
    <button
      ref={ref}
      type={props.type ? props.type : "button"}
      {...extra}
      {...{ ...props, buttonstyle: undefined, className: undefined }}
      className={`${props.buttonstyle} ${props.className ?? ""}`.trim()}
    >
      {props.children}
    </button>
  );
});

EduIDButton.displayName = "EduIDButton";
export default EduIDButton;
