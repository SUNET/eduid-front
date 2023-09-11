import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import NinDisplay from "components/Common/NinDisplay";
import { useDashboardAppSelector } from "dashboard-hooks";
import React, { Fragment, useEffect } from "react";
import { Accordion } from "react-accessible-accordion";
import ReactCountryFlag from "react-country-flag";
import { FormattedMessage, useIntl } from "react-intl";
import EuFlag from "../../../img/flags/eu.svg";
import SeFlag from "../../../img/flags/se.svg";
import { DashboardBreadcrumbs } from "./DashboardBreadcrumbs";
import { AccordionItemEu, AccordionItemSwedish, AccordionItemWorld } from "./IdentityItems";

/* UUIDs of accordion elements that we want to selectively pre-expand */
type accordionUUID = "swedish" | "eu" | "world";

function VerifyIdentity(): JSX.Element | null {
  const isAppLoaded = useDashboardAppSelector((state) => state.config.is_app_loaded);

  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Identity",
      defaultMessage: "Identity | eduID",
    });
  }, []);

  const currentPage = intl.formatMessage({
    id: "Identity",
    defaultMessage: "Identity",
    description: "Identity",
  });

  if (!isAppLoaded) {
    /* The accordions preExpanded option is only used at the first render of the component,
     * not on re-renders. Therefore, we _must_ have all data that we're going to use to set
     * preExpanded loaded before we render the accordion below.
     *
     * In reality, this "null" is only returned if the user reloads the page on the Identity tab.
     * Normally, the data is always loaded already when the user navigates to the Identity tab.
     */
    return null;
  }

  return (
    <Fragment>
      <DashboardBreadcrumbs pageIcon={faIdCard} currentPage={currentPage} />
      <VerifyIdentityIntro />
    </Fragment>
  );
}

function VerifyIdentityIntro(): JSX.Element {
  const identities = useDashboardAppSelector((state) => state.identities);

  const preExpanded: accordionUUID[] = [];

  if (!identities.is_verified) {
    if (identities.nin) {
      /* If the user has a Swedish NIN, pre-expand the "Swedish" option. */
      preExpanded.push("swedish");
    }
  }

  if (identities.is_verified) {
    /* User has a verified identity. Show which one (or ones) it is.
     *   TODO: Support other types of identities than NINs.
     */
    return (
      <React.Fragment>
        <section className="intro">
          <h1>
            <FormattedMessage
              description="verify identity unverified main title"
              defaultMessage={`Connect your identity to your eduID`}
            />
          </h1>
          <div className="lead">
            <p>
              <FormattedMessage
                description="verify identity verified title"
                defaultMessage="Your eduID is ready to use"
              />
            </p>
          </div>
        </section>
        <article>
          <h2>
            <FormattedMessage
              description="verify identity verified description"
              defaultMessage="The identities below are now connected to your eduID"
            />
          </h2>
          <VerifiedIdentitiesTable />
        </article>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <section className="intro">
        <h1>
          <FormattedMessage
            description="verify identity unverified main title"
            defaultMessage={`Connect your identity to your eduID`}
          />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              description="verify identity unverified description"
              defaultMessage={`Some services need to know your real life identity. Connect your identity to your eduID
            to get the most benefit from `}
            />
          </p>
        </div>
      </section>
      <article>
        <h2>
          <FormattedMessage
            description="verify identity non verified description"
            defaultMessage="Choose your principal identification method"
          />
        </h2>
        <Accordion allowMultipleExpanded allowZeroExpanded preExpanded={preExpanded}>
          <AccordionItemSwedish />
          <AccordionItemEu />
          <AccordionItemWorld />
        </Accordion>
      </article>
    </React.Fragment>
  );
}

function VerifiedIdentitiesTable(): JSX.Element {
  const identities = useDashboardAppSelector((state) => state.identities);
  const currentLocale = useDashboardAppSelector((state) => state.intl.locale);
  const regionNames = new Intl.DisplayNames([currentLocale], { type: "region" });

  return (
    <React.Fragment>
      {identities.nin?.verified && (
        <figure className="table-responsive identity-summary">
          <table className="table">
            <tbody>
              <tr className="border-row">
                <td>
                  <img height="35" className="circle-icon" alt="Sweden" src={SeFlag} />
                </td>
                <td>
                  <strong>
                    <FormattedMessage
                      defaultMessage="Swedish national identity number"
                      description="Verified identity"
                    />
                  </strong>
                </td>
                <td>
                  <NinDisplay nin={identities.nin} allowDelete={true} />
                </td>
              </tr>
            </tbody>
          </table>
        </figure>
      )}

      {identities.eidas?.verified && (
        <React.Fragment>
          <figure className="table-responsive identity-summary">
            <table className="table">
              <tbody>
                <tr className="border-row">
                  <td>
                    <img height="35" className="circle-icon" alt="European Union" src={EuFlag} />
                  </td>
                  <td>
                    <strong>
                      <FormattedMessage defaultMessage="European EIDAS identity" description="Verified identity" />
                    </strong>
                  </td>
                  <td>
                    {identities.eidas.country_code}&nbsp;{identities.eidas.date_of_birth}
                  </td>
                </tr>
              </tbody>
            </table>
          </figure>
        </React.Fragment>
      )}

      {identities.svipe?.verified && (
        <React.Fragment>
          <figure className="table-responsive identity-summary">
            <table className="table">
              <tbody>
                <tr className="border-row">
                  <td>
                    <ReactCountryFlag
                      className="flag-icon"
                      aria-label={regionNames.of(identities.svipe.country_code)}
                      countryCode={identities.svipe.country_code}
                    />
                  </td>
                  <td>
                    <strong>
                      <FormattedMessage defaultMessage="Foreign Svipe identity" description="Verified identity" />
                    </strong>
                  </td>
                  <td>
                    {regionNames.of(identities.svipe.country_code)}&nbsp;{identities.svipe.date_of_birth}
                  </td>
                </tr>
              </tbody>
            </table>
          </figure>
        </React.Fragment>
      )}
      {/* verifying with Swedish national number in accordion only possible for users already verified with Eidas or Svipe */}
      {!identities.nin?.verified && (
        <React.Fragment>
          <h2>
            <FormattedMessage
              description="verify identity non verified description"
              defaultMessage="Choose your principal identification method"
            />
          </h2>
          <p>
            <FormattedMessage
              description="verify identity with swedish ID description"
              defaultMessage={`Verify your eduID with a Swedish national ID number.`}
            />
          </p>
          <Accordion allowZeroExpanded>
            <AccordionItemSwedish />
          </Accordion>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default VerifyIdentity;
