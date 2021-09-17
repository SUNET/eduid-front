import React from "react";
import PropTypes from "prop-types";
import Button from "reactstrap/lib/Button";

const ButtonPrimary = ({
  id,
  translate,
  disabled,
  onClick,
  type,
  children,
}) => (
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
