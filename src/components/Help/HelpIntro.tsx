import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Accordion } from "../Common/AccordionItemTemplate";
import ScrollToTopButton from "../ScrollToTopButton";
import { AboutEduID } from "./AboutEduID";
import { AboutSunet } from "./AboutSunet";
import { AboutTermsOfUse } from "./AboutTermsOfUse";
import { AssuranceLevels } from "./AssuranceLevels";
import { ConnectingAccountOrcid } from "./ConnectingAccountOrcid";
import { ContactSupport } from "./ContactSupport";
import { EnhancingSecurityLevel } from "./EnhancingSecurityLevel";
import { ManageEduIDSettings } from "./ManageEduIDSettings";
import { PrivacyPolicyAndWebAccessibility } from "./PrivacyPolicyAndWebAccessibility";
import { UsingEduID } from "./UsingEduID";
import { VerificationOfIdentity } from "./VerificationOfIdentity";

export function Help(): React.JSX.Element {
  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Help",
      defaultMessage: "Help | eduID",
    });
  }, [intl]);

  return (
    <React.Fragment>
      <section className="intro">
        <h1>
          <FormattedMessage description="help - general headline" defaultMessage="Help and contact" />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              description="help - lead"
              defaultMessage={`Listed below is general information about the service, answers to common questions about 
              using eduID 
               and Support contact information.`}
            />
          </p>
        </div>
      </section>
      <h2>
        <FormattedMessage description="help - content headline" defaultMessage="Content areas" />
      </h2>
      <p>
        <FormattedMessage description="help - content paragraph" defaultMessage="Expand sections to learn more." />
      </p>
      <div className="help-content">
        <Accordion id="eduid-help">
          <AboutEduID />
          <UsingEduID />
          <ManageEduIDSettings />
          <VerificationOfIdentity />
          <EnhancingSecurityLevel />
          <AssuranceLevels />
          <ConnectingAccountOrcid />
          <AboutTermsOfUse />
          <PrivacyPolicyAndWebAccessibility />
          <AboutSunet />
          <ContactSupport />
        </Accordion>
      </div>

      <ScrollToTopButton />
    </React.Fragment>
  );
}
