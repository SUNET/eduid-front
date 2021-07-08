import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postTouVersions } from "../../../redux/actions/postTouVersionsActions";
import { updatedTouAccept } from "../../../redux/actions/postUpdatedTouAcceptActions";
import ButtonPrimary from "../../Buttons/ButtonPrimary";
import PropTypes from "prop-types";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

let TermOfUseText = ({ translate }) => (
  <div className="tou-text">
    <p className="heading">{translate("login.tou.legal-title")}</p>
    <ul>{translate("login.tou.2016-v1")}</ul>
    <p className="heading">{translate("login.tou.legal-warning")}</p>
  </div>
);
let AcceptButton = ({ loading }) => {
  const dispatch = useDispatch();
  return (
    <ButtonPrimary
      type="submit"
      onClick={() => dispatch(updatedTouAccept())}
      disabled={loading}
      aria-disabled={loading}
      id="accept-button"
    >
      accept
    </ButtonPrimary>
  );
};

let TermOfUse = (props) => {
  const dispatch = useDispatch();
  const { loading, translate } = props;

  // MOCK: the tou versions will be available from the translations object
  // pick these from the store
  const availableTouVersions = ["2016-v1", "2021-v1"];
  useEffect(() => {
    dispatch(postTouVersions(availableTouVersions));
  }, []);

  // MOCK: the backend determines what version the user nddes to accept
  const version = useSelector((state) => state.login.tou.version);

  return (
    <div className="tou">
      <h2 className="heading">
        {translate("login.tou.h2-heading")} ({version})
      </h2>
      <p>{translate("login.tou.paragraph")}</p>
      <TermOfUseText translate={translate} />
      <AcceptButton loading={loading} translate={translate} />
    </div>
  );
};

TermOfUse.propTypes = {
  translate: PropTypes.func,
};

export default InjectIntl(TermOfUse);
