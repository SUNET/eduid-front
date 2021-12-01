import React, { ReactElement, useEffect } from "react";
import ButtonPrimary from "../../Buttons/ButtonPrimary";
import loginSlice from "../../../redux/slices/loginSlice";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import { FormattedMessage, useIntl } from "react-intl";

// TODO: If we decide to not use the intl.formatMessage approach, this object doesn't need to
//       hold functional components anymore (in order to use the useIntl() hook) and can be
//       simplified to just { [key: string]: ReactElement }
export const ToUs: { [key: string]: () => ReactElement } = {
  "1999-v1": () => {
    return (
      <React.Fragment>
        <ul tabIndex={0}>
          <p>
            <FormattedMessage defaultMessage="The following generally applies:" description="ToU paragraph 1 heading" />
          </p>
          <li>
            <p>This a test version of terms of use version 1 from 2021,</p>
          </li>
          <li>
            <p>The versioning allows us to update terms if needed and keep parallel versions at the same time,</p>
          </li>
          <li>
            <p>And still ensure that we serve the correct version a specific users need to accept,</p>
          </li>
        </ul>
      </React.Fragment>
    );
  },
  "2016-v1": () => {
    const intl = useIntl();

    return (
      <React.Fragment>
        <ul tabIndex={0}>
          <p>
            <FormattedMessage defaultMessage="The following generally applies:" description="ToU paragraph 1 heading" />
          </p>
          {intl
            .formatMessage({
              id: "ToU.2016-v1.first_paragraph",
              defaultMessage: `
              that all usage of user accounts follow the laws and by-laws of Sweden,|
              that all personal information that you provide, such as name and contact information shall be truthful,|
              that user accounts, password and codes are individual and shall only be used by the intended individual,|
              that SUNET's ethical rules regulate the “other” usage.
              `,
              description: "ToU 2016-v1 first paragraph",
            })
            .split("|")
            .map((list, index) => {
              return (
                <p>
                  <li key={index}>{list}</li>
                </p>
              );
            })}
        </ul>
        <ul tabIndex={0}>
          <p>
            <FormattedMessage
              defaultMessage="SUNET judges unethical behaviour to be when someone:"
              description="ToU 2016-v1 paragraph 2 heading"
            />
          </p>
          {[
            <FormattedMessage
              defaultMessage="attempts to gain access to network resources that they do not have the right"
              description="ToU 2016-v1 second paragraph"
            />,
            <FormattedMessage
              defaultMessage="attempts to conceal their user identity"
              description="ToU 2016-v1 second paragraph"
            />,
            <FormattedMessage
              defaultMessage="attempts to interfere or disrupt the intended usage of the network"
              description="ToU 2016-v1 second paragraph"
            />,
            <FormattedMessage
              defaultMessage="clearly wastes available resources (personnel, hardware or software)"
              description="ToU 2016-v1 second paragraph"
            />,
            <FormattedMessage
              defaultMessage="attempts to disrupt or destroy computer-based information"
              description="ToU 2016-v1 second paragraph"
            />,
            <FormattedMessage
              defaultMessage="infringes on the privacy of others"
              description="ToU 2016-v1 second paragraph"
            />,
            <FormattedMessage
              defaultMessage="attempts to insult or offend others"
              description="ToU 2016-v1 second paragraph"
            />,
          ].map((list, index) => {
            return (
              <p>
                <li key={index}>{list}</li>
              </p>
            );
          })}
        </ul>
      </React.Fragment>
    );
  },
};

const TermsOfUseText = ({ version }: { version?: string }) => {
  return (
    <div className="tou-text">
      <p className="heading" tabIndex={0}>
        <FormattedMessage defaultMessage="General rules for eduID users:" description="Terms of use (common header)" />
      </p>
      {version !== undefined ? ToUs[version]() : undefined}
      <p tabIndex={0} className="heading">
        <FormattedMessage
          defaultMessage={`Any person found violating or suspected of violating these rules can be disabled
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
