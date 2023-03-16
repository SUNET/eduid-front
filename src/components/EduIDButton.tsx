import { useIntl } from "react-intl";
import { Button, ButtonProps } from "reactstrap";

interface EduIDButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id?: string;
  size?: string;
  buttonstyle: "primary" | "secondary" | "link" | "close";
  tabIndex?: number;
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
    <Button {...extra} tabIndex={props.tabIndex} {...props} size={props.size} color={props.buttonstyle}>
      {props.children}
    </Button>
  );
}
