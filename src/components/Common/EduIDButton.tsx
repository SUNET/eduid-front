import React from "react";
import { useIntl } from "react-intl";

interface ExtraProps {
  "aria-label"?: string;
}

interface EduIDButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly id?: string;
  readonly buttonstyle: string;
}

// depends on props.buttonstyle, button will display as primary, secondary, link or close button
export default function EduIDButton(props: EduIDButtonProps): React.JSX.Element {
  const intl = useIntl();
  const extra: ExtraProps = {};

  // Provide a textual representation of the "close" button for screen readers (and RTL)
  if (props.buttonstyle.includes("close")) {
    // aria-label can't be an Element, we need to get the actual translated string here
    const closeLabel = intl.formatMessage({
      id: "modal.close",
      defaultMessage: "Close",
      description: "Notification modal close label",
    });

    extra["aria-label"] = closeLabel;
  }

  return (
    <button
      type={props.type ? props.type : "button"}
      className={props.buttonstyle}
      {...extra}
      {...{ ...props, buttonstyle: undefined }}
    >
      {props.children}
    </button>
  );
}
