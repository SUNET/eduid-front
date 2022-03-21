import React from "react";
import { Button } from "reactstrap";

interface EduIDButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id?: string;
}

// An ordinary <Button> with color="primary", and mandatory id
const EduIDButton = (props: EduIDButtonProps) => (
  <Button {...props} className={"eduid-button" + props.className ? props.className : ""}>
    {props.children}
  </Button>
);

export default EduIDButton;
