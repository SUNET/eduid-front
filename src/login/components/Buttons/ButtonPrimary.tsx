import React from "react";
import { Button } from "reactstrap";

interface ButtonPrimaryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
}

// An ordinary <Button> with color="primary", and mandatory id
const ButtonPrimary = (props: ButtonPrimaryProps) => (
  <Button {...props} color="primary">
    {props.children}
  </Button>
);

export default ButtonPrimary;
