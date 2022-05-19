import React from "react";
import { Button } from "reactstrap";

interface EduIDButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id?: string;
  size?: string;
  buttonstyle: "primary" | "secondary" | "link" | "close";
}

// depends on props.buttonstyle, button will display as primary, secondary, link or close button
const EduIDButton = (props: EduIDButtonProps) => (
  <Button {...props} size={props.size} color={props.buttonstyle}>
    {props.children}
  </Button>
);

export default EduIDButton;
