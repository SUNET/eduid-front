import React, { Component } from "react";
import PropTypes from "prop-types";

import FormText from "reactstrap/lib/FormText";
import FormGroup from "reactstrap/lib/FormGroup";
import FormFeedback from "reactstrap/lib/FormFeedback";
import Input from "reactstrap/lib/Input";
import Label from "reactstrap/lib/Label";
import i18n from "i18n-messages";

const textInput = props => {
  const {
    input,
    label,
    name,
    meta,
    selectOptions,
    componentClass,
    type,
    translate,
    disabled,
    helpBlock,
    placeholder
  } = props;
  let valid = false,
    invalid = false;
  if (meta.touched || meta.submitFailed) {
    if (meta.error) {
      invalid = true;
    } else {
      valid = true;
    }
  }
  const errmsg = (invalid && translate(meta.error)) || "";
  let feedback = "",
    help;
  if (errmsg !== "") {
    feedback = <span className="eduid-field-error">{errmsg}</span>;
    help = (
      <FormText>
        {feedback} | {helpBlock}
      </FormText>
    );
  } else {
    help = <FormText>{helpBlock}</FormText>;
  }

  let field;

  if (type === "select") {
    let options = [];
    if (selectOptions) {
      options = selectOptions.slice();
    }
    const children = options.map(opt => {
      return (
        <option key={opt[0]} value={opt[0]}>
          {opt[1]}
        </option>
      );
    });
    field = (
      <Input
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        id={name}
        name={name}
        valid={valid}
        invalid={invalid}
        {...input}
      >
        {children}
      </Input>
    );
  } else {
    field = (
      <Input
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        id={name}
        name={name}
        valid={valid}
        invalid={invalid}
        {...input}
      />
    );
  }
  let labelElem = "";
  if (label) {
    labelElem = <Label for={name}>{label}</Label>;
  }

  return (
    <FormGroup id={input.name}>
      {labelElem}
      {field}
      {help}
    </FormGroup>
  );
};

export default i18n(textInput);
