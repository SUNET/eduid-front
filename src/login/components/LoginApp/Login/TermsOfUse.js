import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postTouVersions } from "../../../redux/actions/postTouVersionsActions";
import { updatedTouAccept } from "../../../redux/actions/postUpdatedTouAcceptActions";
import ButtonPrimary from "../../Buttons/ButtonPrimary";
import PropTypes from "prop-types";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

let TermOfUseText = ({ translate, version }) => (
  <div className="tou-text">
    <p className="heading">{translate("login.tou.legal-title")}</p>
    {version !== null ? (
      <ul>{translate(`login.tou.version.${version}`)}</ul>
    ) : null}
    <p className="heading">{translate("login.tou.legal-warning")}</p>
  </div>
);

let AcceptButton = ({ loading }) => {
  const dispatch = useDispatch();
  return (
    <ButtonPrimary
      type="submit"
      onClick={() => dispatch(updatedTouAccept())}
      id="accept-button"
    >
      accept
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
  });
  return (
    <div className="tou">
      <h2 className="heading">
        {translate("login.tou.h2-heading")} ({version})
      </h2>
      <p>{translate("login.tou.paragraph")}</p>
      <TermOfUseText translate={translate} version={version} />
      <AcceptButton translate={translate} />
    </div>
  );
};

TermOfUse.propTypes = {
  translate: PropTypes.func,
};

export default InjectIntl(TermOfUse);
