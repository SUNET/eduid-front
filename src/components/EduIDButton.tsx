import React from "react";
import { Button } from "reactstrap";

interface EduIDButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id?: string;
  size?: string;
  buttonStyle: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
// depends on props.buttonStyle, button will display as primary, secondary, link or close button
const EduIDButton = (props: EduIDButtonProps) => (
  <Button id={props.id} onClick={props.onClick} size={props.size} color={props.buttonStyle}>
    {props.children}
  </Button>
);

export default EduIDButton;
