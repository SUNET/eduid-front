import React, { Fragment, useState } from "react";
import ButtonPrimary from "../../Buttons/ButtonPrimary";
import PropTypes from "prop-types";
import SecurityKeySelected from "./SecurityKeySelected";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

let SecurityKeyUnselected = ({ translate, setSelected }) => {
  return (
    <Fragment>
      <p className="heading">{translate("login.mfa.primary-option.title")}</p>
      <ButtonPrimary
        type="submit"
        onClick={() => setSelected(true)}
        id="mfa-security-key"
      >
        {translate("login.mfa.primary-option.button")}
      </ButtonPrimary>
    </Fragment>
  );
};

let SecurityKey = (props) => {
  const [selected, setSelected] = useState(false);
  return (
    <div className="primary">
      <div className="option">
        {selected ? (
          <SecurityKeySelected setSelected={setSelected} {...props} />
        ) : (
          <SecurityKeyUnselected setSelected={setSelected} {...props} />
        )}
      </div>
      {selected && (
        <p className="help-link">
          If your security key has a button, don&apos;t forget to tap it.
        </p>
      )}
    </div>
  );
};

SecurityKey.propTypes = {
  translate: PropTypes.func,
};

export default InjectIntl(SecurityKey);
