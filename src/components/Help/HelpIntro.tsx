import React from "react";
import { FormattedMessage } from "react-intl";
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
  return (
    <React.Fragment>
      <section className="intro">
        <h1>
          <FormattedMessage id="intro.general" description="help - general headline" defaultMessage="Help and contact" />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              id="intro.lead"
              description="help - lead"
              defaultMessage={`Listed below is general information about the service, answers to common questions about 
              using eduID 
               and Support contact information.`}
            />
          </p>
        </div>
      </section>
      <h2>
        <FormattedMessage id="intro.content" description="help - content headline" defaultMessage="Content areas" />
      </h2>
      <p>
        <FormattedMessage id="intro.paragraph" description="help - content paragraph" defaultMessage="Expand sections to learn more." />
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
