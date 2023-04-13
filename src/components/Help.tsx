import React from "react";
import { Accordion } from "react-accessible-accordion";
import { FormattedMessage } from "react-intl";
import AccordionItemTemplate from "./AccordionItemTemplate";
import ScrollToTopButton from "./ScrollToTopButton";

export function Help(): JSX.Element {
  const preExpanded: string[] = ["help-contact-us"];

  return (
    <React.Fragment>
      <section className="intro">
        <h1>
          <FormattedMessage description="help main title" defaultMessage="Help and contact" />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              description="help main description"
              defaultMessage="Here you will find the answers to the most common questions, our contact information and much more."
            />
          </p>
        </div>
      </section>
      <div className="faq-content">
        <Accordion allowMultipleExpanded allowZeroExpanded id="Contact us" preExpanded={preExpanded}>
          <AccordionItemTemplate
            uuid="help-contact-us"
            title={
              <FormattedMessage
                description="How to contact eduID support"
                defaultMessage="How to contact eduID support"
              />
            }
            additionalInfo={null}
          >
            <p>
              <FormattedMessage
                description="Create a Freja eID+ account list item"
                defaultMessage=" If you can't find the answers to your questions about eduID on our help page, you can contact the eduID
              support by mailing {support}."
                values={{
                  support: (
                    <a className="text-link" href="mailto:support@eduid.se">
                      support@eduid.se
                    </a>
                  ),
                }}
              />
            </p>
            <p>
              <FormattedMessage
                description="support description"
                defaultMessage="Always let us know the e-mail address you used when you logged into eduID. If something went wrong, it is
              always a good idea to include screenshots with error messages to ease troubleshooting."
              />
            </p>
            <p>
              <FormattedMessage
                description="Create a Freja eID+ account list item"
                defaultMessage="{strong}, but for simple
              matters you can also reach us on phone number {phone}."
                values={{
                  strong: <strong>In order to get best possible support, we recommend that you send e-mail</strong>,
                  phone: (
                    <a className="text-link" href="tel:+46455-385200">
                      0455-385200
                    </a>
                  ),
                }}
              />
            </p>
            <p>
              <FormattedMessage description="Opening hours:" defaultMessage="Opening hours" />
            </p>
            <ul className="bullets">
              <li>
                <FormattedMessage
                  description="Opening hours: list item"
                  defaultMessage="Monday-Thursday 09:00-12:00, 13:00-16:00"
                />
              </li>
              <li>
                <FormattedMessage
                  description="Opening hours: list item"
                  defaultMessage="Friday 9:00-12:00, 13:00-14:30"
                />
              </li>
            </ul>
          </AccordionItemTemplate>
        </Accordion>

        <Accordion allowMultipleExpanded allowZeroExpanded id="About eduID">
          <AccordionItemTemplate
            uuid="help-about-eduID"
            title={<FormattedMessage description="About eduID" defaultMessage="About eduID" />}
            additionalInfo={null}
          >
            <article>
              <h3>
                <FormattedMessage description="What is eduID?" defaultMessage="What is eduID?" />
              </h3>
              <p>
                <FormattedMessage
                  description="What is eduID? explanation"
                  defaultMessage="eduID is a federated identity - a user identity that can be used in several different organisations that
                have agreed on how identities will be managed. The basic idea is that a given user, who is authenticated
                with an organisation, is automatically authenticated with other organisations in the federation."
                />
              </p>
              <p>
                <FormattedMessage
                  description="What is eduID? description"
                  defaultMessage="Federated identities are one of the cornerstones of trust between organisations. Trust is based on all
                  the organisations relying on all the others to carry out their authentication - identification and
                  verification - properly and in a controlled and reliable IT environment. This is why eduID is certified
                  by {link}."
                  values={{
                    link: (
                      <a className="text-link" href="https://kantarainitiative.org/">
                        Kantara
                      </a>
                    ),
                  }}
                />
              </p>
            </article>
            <article>
              <h3>
                <FormattedMessage description="Why have eduID? heading" defaultMessage="Why have eduID?" />
              </h3>

              <p>
                <FormattedMessage
                  description="Why have eduID? description1"
                  defaultMessage="From the student's perspective, in the long-term eduID means fewer accounts to keep track of during
                studies. For many organisations, identity management is a complex issue and it is necessary to work with
                confirmed users."
                />
              </p>
              <p>
                <FormattedMessage
                  description="Why have eduID? description2"
                  defaultMessage="There are many services that require identification of users. This is often done by the user entering an
                  email address to which the service provider sends a password - and for many services is this a
                  sufficient level. Such a user is normally called unconfirmed, because the service provider does not
                  really know who the user with that email address is. Through the use of eduID, identification of users
                  is taken up a level to that of confirmed users."
                />
              </p>
            </article>
            <article>
              <h3>
                <FormattedMessage description="How do I use eduID? heading" defaultMessage="How do I use eduID?" />
              </h3>
              <p>
                <FormattedMessage
                  description="What is eduID? description"
                  defaultMessage=" Once you have created your account, you will hardly ever need to log in to eduID. You will only be using
                  your account to create and access other accounts, such as {link} or your student account."
                  values={{
                    link: (
                      <a className="text-link" href="https://www.universityadmissions.se">
                        universityadmissions.se
                      </a>
                    ),
                  }}
                />
              </p>
              <p>
                <FormattedMessage
                  description="Log in at eduid.se when you: heading"
                  defaultMessage="Log in at eduid.se when you:"
                />
              </p>
              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="Log in at eduid.se when you: list item"
                    defaultMessage="Accept your place at university"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="Log in at eduid.se when you: list item"
                    defaultMessage="Organise your student account for email and intranet"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="Log in at eduid.se when you: list item"
                    defaultMessage="Change university"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="Log in at eduid.se when you: list item"
                    defaultMessage="Lose a password"
                  />
                </li>
              </ul>
            </article>
            <article>
              <h3>
                <FormattedMessage
                  description="How do I change the default language in eduID? heading"
                  defaultMessage="How do I change the default language in eduID?"
                />
              </h3>
              <p>
                <FormattedMessage
                  description="How do I change the default language in eduID? description"
                  defaultMessage="  How do I change the default language in eduID?
                  To change the default language you can log into eduID and select the language you want under the
                  personal information tab. The default language in eduID is based on the language setting that your
                  browser uses."
                />
              </p>
            </article>
            <article>
              <h3>
                <FormattedMessage
                  description="Which email account should I use to log in? heading"
                  defaultMessage="Which email account should I use to log in?"
                />
              </h3>
              <p>
                <FormattedMessage
                  description="Which email account should I use to log in? description"
                  defaultMessage="You can log in with all the email addresses you have entered and confirmed in eduID."
                />
              </p>
            </article>
          </AccordionItemTemplate>
        </Accordion>

        <Accordion allowMultipleExpanded allowZeroExpanded id="Verification of Identity">
          <AccordionItemTemplate
            uuid="help-verification-of-identity"
            title={
              <FormattedMessage description="Verification of Identity" defaultMessage="Verification of Identity" />
            }
            additionalInfo={null}
          >
            <article>
              <h3>
                <FormattedMessage
                  description="What are the selected methods of verifying an id number for eduID? heading"
                  defaultMessage="What are the selected methods of verifying an id number for eduID?"
                />
              </h3>
              <p>
                <FormattedMessage
                  description="At this moment, verifying an id number can be done via: description"
                  defaultMessage="At this moment, verifying an id number can be done via:"
                />
              </p>
              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="identity verification methods: post"
                    defaultMessage="{post} The user receives a letter with a code sent to their home address as registered
                  at Skatteverket (the Swedish Tax Agency)"
                    values={{
                      post: <strong>Post:</strong>,
                    }}
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="identity verification methods: Mobile"
                    defaultMessage="{Mobile} The user receives a message sent to the phone number that is registered in
                    the Swedish telephone register"
                    values={{
                      Mobile: <strong>Mobile:</strong>,
                    }}
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="identity verification methods: Mobile"
                    defaultMessage="{Freja} The user will be directed to the Freja eID website to
                    use their service. If you don't have Freja eID+ you have to create it separately before you can
                    complete verification of your eduID"
                    values={{
                      Freja: <strong>Freja eID+ (digital ID-card)</strong>,
                    }}
                  />
                </li>
              </ul>
              <p>
                <FormattedMessage
                  description="eidas heading"
                  defaultMessage=" If you are a EU citizen without a Swedish personal identity number you could use {eIDAS} to verify your identity."
                  values={{
                    eIDAS: (
                      <a className="text-link" href="#eidas">
                        eIDAS
                      </a>
                    ),
                  }}
                />
              </p>
            </article>
            <article>
              <h3>
                <FormattedMessage description="What is Freja eID+? heading" defaultMessage="What is Freja eID+?" />
              </h3>
              <p>
                <FormattedMessage
                  description="Freja eID+ is a digital ID-card free of charge. description"
                  defaultMessage="Freja eID+ is a digital ID-card free of charge."
                />
              </p>
              <p>
                <FormattedMessage
                  description="Freja eID+ description"
                  defaultMessage="This is how you create Freja eID+:"
                />
              </p>

              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="Create a Freja eID+ account heading"
                    defaultMessage="Install the {Freja}  on your mobile device (iOS or Android)"
                    values={{
                      Freja: (
                        <a className="text-link" href="https://frejaeid.com/en/get-freja-eid/" target="_blank">
                          Freja eID app
                        </a>
                      ),
                    }}
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="Create a Freja eID+ account list item"
                    defaultMessage="Create a Freja eID+ account"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="Create a Freja eID+ account list item"
                    defaultMessage="Bring a valid ID to the nearest ATG agent authorised to verify your identity"
                  />
                </li>
              </ul>
            </article>
            <article>
              <h3>
                <FormattedMessage
                  description="visit an authorised ATG agent to create Freja eID+ heading"
                  defaultMessage="Why do I need to visit an authorised ATG agent to create Freja eID+?"
                />
              </h3>
              <p>
                <FormattedMessage
                  description="visit an authorised ATG agent to create Freja eID+ description"
                  defaultMessage=" On site, the agent can start the verification process by scanning a QR code in your app and follow the
              instructions in their terminal. You will be informed when you have passed the ID verification and will be
              able use your Freja eID+ with your eduID."
                />
              </p>
            </article>
            <article>
              <h3>
                <FormattedMessage
                  description="What should I do if my identity verification for Freja eID+ fails?"
                  defaultMessage="What should I do if my identity verification for Freja eID+ fails?"
                />
              </h3>

              <p>
                <FormattedMessage
                  description="Create a Freja eID+ account description"
                  defaultMessage="Reinstall the app, redo the registration and make sure that you have entered the correct expiration date as
              well as written down the correct reference number of the chosen form of ID and personal identity number
              (personnummer)."
                />
              </p>
            </article>
            <article>
              <h3>
                <FormattedMessage
                  description="How do I use my Freja eID+ with my eduID?"
                  defaultMessage="How do I use my Freja eID+ with my eduID?"
                />
              </h3>
              <p>
                <FormattedMessage
                  description="Log in to eduID and click 'Use my Freja eID+' button."
                  defaultMessage="Log in to eduID and click 'Use my Freja eID+' button."
                />
              </p>
            </article>
            <article>
              <h3>
                <FormattedMessage
                  description="How long does it take for a Freja eID+ to be processed?"
                  defaultMessage="How long does it take for a Freja eID+ to be processed?"
                />
              </h3>
              <p>
                <FormattedMessage
                  description="It can take up to three hours for your Freja eID+ to be fully activated."
                  defaultMessage="It can take up to three hours for your Freja eID+ to be fully activated."
                />
              </p>
            </article>
            <article>
              <h3>
                <FormattedMessage description="What is eIDAS?" defaultMessage="What is eIDAS?" />
              </h3>
              <p>
                <FormattedMessage
                  description="What is eIDAS? description"
                  defaultMessage="eIDAS is a federation of EU countries providing electronic identification to allow access to public
              authority systems for EU citizens, using their country's electronic ID."
                />
              </p>
              <p>
                <FormattedMessage description="How to use eIDAS:" defaultMessage="How to use eIDAS:" />
              </p>
              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="eIDAS list item"
                    defaultMessage="If you have an electronic ID from a connected country you have the possibility to authenticate yourself
                via eIDAS."
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="eIDAS list item"
                    defaultMessage="  To verify your identity in eduID, log in and choose the verification method for 'EU-citizens' under the
                'Identity' tab."
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="eIDAS list item"
                    defaultMessage="If you have a Swedish personal identity number use that method instead e.g. to simplify communication with
                Swedish authorities."
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="eIDAS list item"
                    defaultMessage="If you initially verify your identity with eIDAS and later receive a Swedish personal identity number you
                can add it and verify yourself again using it under the 'Identity' tab."
                  />
                </li>
              </ul>
            </article>
          </AccordionItemTemplate>
        </Accordion>

        <Accordion allowMultipleExpanded allowZeroExpanded id="About Orcid">
          <AccordionItemTemplate
            uuid="help-About-orcid"
            title={
              <FormattedMessage description="Connect to Orcid / Ladok" defaultMessage="Connect to Orcid / Ladok" />
            }
            additionalInfo={null}
          >
            <article>
              <h3>
                <FormattedMessage description=" What is ORCID? heading" defaultMessage=" What is ORCID?" />
              </h3>
              <p>
                <FormattedMessage
                  description="What is ORCID? description"
                  defaultMessage="ORCID is integrated into many research-related services, such as systems used by publishers, funders and
              institutions. ORCID is an independent non-profit organisation that provides a persistent identifier – an
              ORCID iD – that distinguishes you from other researchers and a mechanism for linking your research outputs
              and activities to your ORCID iD."
                />
              </p>
              <p>
                <FormattedMessage
                  description="Read more at"
                  defaultMessage="Read more at {orcid}."
                  values={{
                    orcid: (
                      <a className="text-link" href="https://orcid.org">
                        orcid.org
                      </a>
                    ),
                  }}
                />
              </p>
            </article>
            <article>
              <h3>
                <FormattedMessage
                  description="How does linking ORCID to eduID work? heading"
                  defaultMessage="How does linking ORCID to eduID work?"
                />
              </h3>
              <p>
                <FormattedMessage
                  description="connect orcid   account description"
                  defaultMessage=" Click the 'Connect ORCID account' button, sign in to your ORCID account and grant eduID permission to
              receive your ORCID iD. This process ensures that the correct ORCID iD is connected to the correct eduID."
                />
              </p>
            </article>
            <article>
              <h3>
                <FormattedMessage
                  description="What do I do if I don't have an ORCID? heading"
                  defaultMessage=" What do I do if I don't have an ORCID?"
                />
              </h3>
              <p>
                <FormattedMessage
                  description="orcid description"
                  defaultMessage="You can register for an ORCID at {orcid}."
                  values={{
                    orcid: (
                      <a className="text-link" href="https://orcid.org">
                        orcid.org
                      </a>
                    ),
                  }}
                />
              </p>
            </article>
            <article>
              <h3>
                <FormattedMessage
                  description=" How do I remove a linked ORCID from eduID? heading"
                  defaultMessage="  How do I remove a linked ORCID from eduID?"
                />
              </h3>
              <p>
                <FormattedMessage
                  description="orcid description"
                  defaultMessage="If you do not longer want eduID to know your ORCID iD you can easily remove it by clicking the remove button
              in your eduID."
                />
              </p>
            </article>
          </AccordionItemTemplate>
        </Accordion>

        <Accordion allowMultipleExpanded allowZeroExpanded id="Privacy Policy">
          <AccordionItemTemplate
            uuid="help-privacy-policy"
            title={
              <FormattedMessage
                description="privacy policy / Web accessibility"
                defaultMessage="eduID Privacy policy and Web accessibility"
              />
            }
            additionalInfo={null}
          >
            <p>
              <FormattedMessage
                description="Read more at sunet"
                defaultMessage="Read more at {sunet}."
                values={{
                  sunet: (
                    <a className="text-link" href="https://sunet.se/om-sunet/behandling-av-personuppgifter-i-eduid">
                      www.sunet.se
                    </a>
                  ),
                }}
              />
            </p>
          </AccordionItemTemplate>
        </Accordion>

        <Accordion allowMultipleExpanded allowZeroExpanded id="About Sunet">
          <AccordionItemTemplate
            uuid="help-about-sunet"
            title={<FormattedMessage description="SUNET" defaultMessage="What is SUNET?" />}
            additionalInfo={null}
          >
            <p>
              <FormattedMessage
                description="What is SUNET? description"
                defaultMessage="SUNET is the organisation responsible for Swedish universities and data networks, as well as many services
              that are used by universities in Sweden."
              />
            </p>
            <p>
              <FormattedMessage
                description="What is SUNET? description"
                defaultMessage="SUNET has been working with the issue of identity management for a long time and developed eduID to make
              things easier for all parties in the higher education community. More information about SUNET is available
              at {sunet}."
                values={{
                  sunet: (
                    <a className="text-link" href="http://www.sunet.se">
                      www.sunet.se
                    </a>
                  ),
                }}
              />
            </p>
          </AccordionItemTemplate>
        </Accordion>
      </div>
      <ScrollToTopButton />
    </React.Fragment>
  );
}
