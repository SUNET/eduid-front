import React, { useEffect } from "react";
import ButtonPrimary from "../../Buttons/ButtonPrimary";
import loginSlice from "../../../redux/slices/loginSlice";
import { translate } from "login/translation";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";

const TermsOfUseText = ({ version }: { version?: string }) => (
  <div className="tou-text">
    <p className="heading" tabIndex={0}>
      {translate("login.tou.legal-title")}
    </p>
    {version !== null ? translate(`login.tou.version.${version}`) : null}
    <p tabIndex={0} className="heading">
      {translate("login.tou.legal-warning")}
    </p>
  </div>
);

const AcceptButton = ({ version }: { version?: string }) => {
  const dispatch = useAppDispatch();
  return (
    <ButtonPrimary
      type="submit"
      onClick={() => dispatch(loginSlice.actions.updatedTouAccept(version))}
      id="accept-button"
      aria-label="accept button"
      aria-disabled={!version}
      disabled={!version}
    >
      {translate("login.tou.button")}
    </ButtonPrimary>
  );
};

const TermsOfUse = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const availableTouVersions = useAppSelector((state) => state.login.tou.available_versions);
  // version is the version of the ToU the backend requests we ask the user to accept
  const version = useAppSelector((state) => state.login.tou.version);
  useEffect(() => {
    // TODO: So we render the ToU page, and *then* we fire off the request to ask the backend what version to show?
    //       We ought to send that request as soon as the backend /next call says that ToU is next.
    dispatch(loginSlice.actions.postTouVersions(availableTouVersions));
  }, []);
  return (
    <div className="tou">
      <h2 className="heading">{translate("login.tou.h2-heading")}</h2>
      <p tabIndex={0}>{translate("login.tou.paragraph")}</p>
      <TermsOfUseText version={version} />
      <AcceptButton version={version} />
    </div>
  );
};

export default TermsOfUse;
