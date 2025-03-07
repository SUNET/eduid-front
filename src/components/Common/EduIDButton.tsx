import React from "react";
import { useIntl } from "react-intl";
import { ButtonProps } from "reactstrap";

interface EduIDButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly id?: string;
  readonly buttonstyle: string;
}

// depends on props.buttonstyle, button will display as primary, secondary, link or close button
export default function EduIDButton(props: EduIDButtonProps): JSX.Element {
  const intl = useIntl();
  const extra: ButtonProps = {};

  // Provide a textual representation of the "close" button for screen readers (and RTL)
  if (props.buttonstyle === "close") {
    // aria-label can't be an Element, we need to get the actual translated string here
    const closeLabel = intl.formatMessage({
      id: "modal.close",
      defaultMessage: "Close",
      description: "Notification modal close label",
    });

    extra["aria-label"] = closeLabel;
  }

  return (
    <button className={props.buttonstyle} {...extra} {...props}>
      {props.children}
    </button>
  );
}
