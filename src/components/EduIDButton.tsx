import React from "react";
import { Button } from "reactstrap";

interface EduIDButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id?: string;
  color: string;
  size?: string;
}

// An ordinary <Button> with color="primary", and mandatory id
const EduIDButton = (props: EduIDButtonProps) => (
  <Button {...props} size={props.size} color={props.color}>
    {props.children}
  </Button>
);

export default EduIDButton;
