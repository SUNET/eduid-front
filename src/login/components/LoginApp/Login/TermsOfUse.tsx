import React, { useEffect } from "react";
import ButtonPrimary from "../../Buttons/ButtonPrimary";
import loginSlice from "../../../redux/slices/loginSlice";
import { translate } from "login/translation";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import { FormattedMessage } from "react-intl";

const TermsOfUseText = ({ version }: { version?: string }) => {
  // const ToU2016v1 = () => {
  //   return <div>...</div>;
  // };
  // {version === "2016-v1" ? <ToU2016v1 /> : undefined}

  return (
    <div className="tou-text">
      <p className="heading" tabIndex={0}>
        <FormattedMessage defaultMessage="General rules for eduID users:" description="Terms of use (common header)" />
      </p>
      {version !== null ? translate(`login.tou.version.${version}`) : null}
      <p tabIndex={0} className="heading">
        <FormattedMessage
          defaultMessage={`Any person found violating or suspected of violating these rules can be disable
          from eduID.se for investigation. Furthermore, legal action can be taken.`}
          description="Terms of use (common footer)"
        />
      </p>
    </div>
  );
};

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
      <FormattedMessage defaultMessage="I accept" description="Terms of use (accept button text)" />
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
      <h2 className="heading">
        <FormattedMessage defaultMessage="Log in: Terms of use" description="Terms of use (h2 heading)" />
      </h2>
      <p tabIndex={0}>
        <FormattedMessage
          defaultMessage="We need an updated acceptance from you of the eduID terms of use."
          description="Terms of use (banner text)"
        />
      </p>
      <TermsOfUseText version={version} />
      <AcceptButton version={version} />
    </div>
  );
};

export default TermsOfUse;
