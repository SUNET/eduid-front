import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import ButtonPrimary from "../../Buttons/ButtonPrimary";
import PropTypes from "prop-types";
import SecurityKeySelected from "./SecurityKeySelected";
import { postRefForWebauthnChallenge } from "../../../redux/actions/postRefForWebauthnChallengeActions";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

let SecurityKeyUnselected = ({ translate, setSelected }) => {
  const dispatch = useDispatch();
  return (
    <Fragment>
      <p className="heading">{translate("login.mfa.primary-option.title")}</p>
      <ButtonPrimary
        type="submit"
        onClick={() => {
          dispatch(postRefForWebauthnChallenge());
          setSelected(true);
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
