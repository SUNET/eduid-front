import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postTouVersions } from "../../../redux/actions/postTouVersionsActions";
import { updatedTouAccept } from "../../../redux/actions/postUpdatedTouAcceptActions";
import ButtonPrimary from "../../Buttons/ButtonPrimary";
import PropTypes from "prop-types";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

let TermOfUseText = ({ translate, version }) => (
  <div className="tou-text">
    <p className="heading" tabIndex="0">
      {translate("login.tou.legal-title")}
    </p>
    {version !== null ? translate(`login.tou.version.${version}`) : null}
    <p tabIndex="0" className="heading">
      {translate("login.tou.legal-warning")}
    </p>
  </div>
);

let AcceptButton = ({ translate, version }) => {
  const dispatch = useDispatch();
  return (
    <ButtonPrimary
      type="submit"
      onClick={() => dispatch(updatedTouAccept(version))}
      id="accept-button"
      aria-label="accept button"
      aria-disabled={!version}
      disabled={!version}
    >
      {translate("login.tou.button")}
    </ButtonPrimary>
  );
};

let TermOfUse = (props) => {
  const dispatch = useDispatch();
  const { translate } = props;
  const availableTouVersions = useSelector(
    (state) => state.login.tou.available_versions
  );
  const version = useSelector((state) => state.login.tou.version);
  useEffect(() => {
    dispatch(postTouVersions(availableTouVersions));
  }, []);
  return (
    <div className="tou">
      <h2 className="heading">{translate("login.tou.h2-heading")}</h2>
      <p tabIndex="0">{translate("login.tou.paragraph")}</p>
      <TermOfUseText translate={translate} version={version} />
      <AcceptButton translate={translate} version={version} />
    </div>
  );
};

TermOfUse.propTypes = {
  translate: PropTypes.func,
};

export default InjectIntl(TermOfUse);
