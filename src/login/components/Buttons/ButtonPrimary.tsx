import React from "react";
import PropTypes from "prop-types";
import Button from "reactstrap/lib/Button";

interface ButtonPrimaryProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  showIcon: boolean;
}

const ButtonPrimary = ({
  id,
  translate,
  disabled,
  onClick,
  type,
  children,
}: ButtonPrimaryProps) => (
  <Button
    type={type}
    id={id}
    translate={translate}
    disabled={disabled}
    onClick={onClick}
    color="primary"
  >
    {children}
  </Button>
);

ButtonPrimary.propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.string.isRequired,
};

export default ButtonPrimary;
