import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ButtonPrimary from "../../Buttons/ButtonPrimary";
import PropTypes from "prop-types";
import SecurityKeySelected from "./SecurityKeySelected";
import { postRefForWebauthnChallenge } from "../../../redux/actions/postRefForWebauthnChallengeActions";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

let SecurityKeyUnselected = ({ translate, setSelected }) => {
  const webauthn_challenge = useSelector(
    (state) => state.login.mfa.webauthn_challenge
  );
  const dispatch = useDispatch();
  return (
    <Fragment>
      <p className="heading">{translate("login.mfa.primary-option.title")}</p>
      <ButtonPrimary
        type="submit"
        onClick={() => {
          setSelected(true);
          // HACK: after failing freja additional call to mfa_auth
          // is needed to use the security key option
          webauthn_challenge === null
            ? dispatch(postRefForWebauthnChallenge())
            : null;
        }}
        id="mfa-security-key"
      >
        {translate("login.mfa.primary-option.button")}
      </ButtonPrimary>
    </Fragment>
  );
};

let SecurityKey = (props) => {
  const { translate } = props;
  const [selected, setSelected] = useState(false);
  return (
    <div className="primary" tabIndex="0">
      <div className="option">
        {selected ? (
          <SecurityKeySelected setSelected={setSelected} {...props} />
        ) : (
          <SecurityKeyUnselected setSelected={setSelected} {...props} />
        )}
      </div>
      {selected && (
        <p className="help-link">
          {translate("login.mfa.primary-option.hint")}
        </p>
      )}
    </div>
  );
};

SecurityKey.propTypes = {
  translate: PropTypes.func,
};

export default InjectIntl(SecurityKey);
