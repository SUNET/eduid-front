import React, { useEffect } from "react";
import { Accordion } from "react-accessible-accordion";
import { FormattedMessage, useIntl } from "react-intl";
import AccordionItemTemplate from "./AccordionItemTemplate";
import ScrollToTopButton from "./ScrollToTopButton";

export function Help(): JSX.Element {
  const intl = useIntl();
  const preExpanded: string[] = ["help-contact-us"];

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Help",
      defaultMessage: "Help | eduID",
    });
  }, []);

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
              defaultMessage={`Listed below is general information about the service, answers to common questions about using eduID 
               and support contact information.`}
            />
          </p>
        </div>
      </section>
      <div className="help-content">
        <Accordion allowMultipleExpanded allowZeroExpanded id="eduID-FAQ">
          <AccordionItemTemplate
            uuid="help-about-eduID"
            title={<FormattedMessage description="About eduID" defaultMessage="About eduID" />}
            additionalInfo={"What it is and may be used for"}
          >
            <article>
              <h3>
                <FormattedMessage description="What is eduID?" defaultMessage="What is eduID?" />
              </h3>
              <p>
                <FormattedMessage
                  description="What is eduID? explanation"
                  defaultMessage={`eduID is a federated identity - a user identity that can be used in several different 
                  organisations that have agreed on how identities will be managed. The basic idea is that a given user, 
                  who is authenticated with an organisation, is automatically authenticated with other organisations
                   in the federation.`}
                />
              </p>
              <p>
                <FormattedMessage
                  description="What is eduID? description"
                  defaultMessage={`Federated identities are one of the cornerstones of trust between organisations. 
                    Trust is based on all the organisations relying on all the others to carry out their authentication 
                    - identification and verification - properly and in a controlled and reliable IT environment.`}
                />
              </p>
              <h4>
                <FormattedMessage description="Why have eduID? heading" defaultMessage="Why have eduID?" />
              </h4>

              <p>
                <FormattedMessage
                  description="Why have eduID? description1"
                  defaultMessage={`From the user's perspective, in the long-term eduID means fewer accounts to keep 
                    track of. For many organisations, identity management is a complex issue and it is
                    necessary to work with confirmed users.`}
                />
              </p>
              <p>
                <FormattedMessage
                  description="Why have eduID? description2"
                  defaultMessage={`There are many services that require identification of users. This is often done by 
                    the user entering an email address to which the service provider sends a password. Such a user is normally called unconfirmed, because the service 
                    provider does not really know who the user with that email address is - and for many 
                    services this is at a sufficient level. Through the use of eduID, 
                    identification of users is elevated to that of confirmed users.`}
                />
              </p>
              <h4>
                <FormattedMessage
                  description="When will I use eduID? heading"
                  defaultMessage="When will I use eduID?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="What is eduID? description"
                  defaultMessage={`Depending on where you work or study you might only use your eduID account a few times, or you might use it every day. Some schools, institutions and services use eduID as their identity provider, this means you will use your eduID to gain access to their IT-systems. Or you may mainly use your eduID account to create and access other accounts, such as {link} or your student account.`}
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
                    defaultMessage="apply to and accept your place at a university,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="Log in at eduid.se when you: list item"
                    defaultMessage="organise your student account for email and intranet,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="Log in at eduid.se when you: list item"
                    defaultMessage="change university,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="Log in at eduid.se when you: list item"
                    defaultMessage="lose a student account password and need to regain access."
                  />
                </li>
              </ul>
            </article>
          </AccordionItemTemplate>
          <AccordionItemTemplate
            uuid="help-using-eduID"
            title={<FormattedMessage description="About eduID" defaultMessage="Using eduID" />}
            additionalInfo={"How to create and use your eduID"}
          >
            <article>
              <h3>
                <FormattedMessage
                  description="How do I use eduID? heading"
                  defaultMessage="How do I create an eduID?"
                />
              </h3>
              <p>
                <FormattedMessage
                  description="Log in at eduid.se when you: heading"
                  defaultMessage={"Create your eduID account at {eduidLink}:"}
                  values={{
                    eduidLink: (
                      <a className="text-link" href="https://signup.eduid.se/register/">
                        eduid.se
                      </a>
                    ),
                  }}
                />
              </p>
              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="Create a eduID account heading"
                    defaultMessage="register your email address,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="Create a eduID account heading2"
                    defaultMessage="confirm that you are human by using captcha,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="Create a eduID account heading3"
                    defaultMessage="accept the eduID terms of use,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="Create a eduID account heading4"
                    defaultMessage="verify your email address by entering the code emailed to you,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="Create a eduID account heading5"
                    defaultMessage="take note of the email address and password in use when your login details are presented to you. Your eduID is now ready to use."
                  />
                </li>
              </ul>

              <p>
                <FormattedMessage
                  description="How do I use eduID? description"
                  defaultMessage={`In eduID you are encouraged to add further details such as:`}
                />
              </p>
              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="Create a eduID account heading"
                    defaultMessage="your phone number for easier retrieval of your account should it be needed,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="Create a eduID account heading"
                    defaultMessage="a security key of you are able to for added security,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="Create a eduID account heading"
                    defaultMessage="to verify your identity to strengthen your eduID sufficiently for many external services."
                  />
                </li>
              </ul>
              <p>
                <FormattedMessage
                  description="How do I use eduID? description"
                  defaultMessage="For detailed information on how to verify your created account based on your circumstances, see the 'Verification of Identity' help section."
                />
              </p>
              <h4>
                <FormattedMessage
                  description="Which email account should I use to log in? heading"
                  defaultMessage="Which email account should I use to log in?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="Which email account should I use to log in? description"
                  defaultMessage="You can log in with all the email addresses you have entered and confirmed in eduID."
                />
              </p>
              <h4>
                <FormattedMessage
                  description="How do I change the default language in eduID? heading"
                  defaultMessage="How do I change the default language in eduID?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="How do I change the default language in eduID? description"
                  defaultMessage={`
                    To change the default language you can log into eduID and select your language preference in the
                    Personal information area in eduID. The default language is based on the language setting that your
                    browser uses. You can also change the displayed language in the footer of the webpage. Available options are Swedish and English.`}
                />
              </p>
            </article>
            <article>
              <h3>
                <FormattedMessage
                  description="How can I login with other devices? heading"
                  defaultMessage="How can I login with other devices?"
                />
              </h3>
              <p>
                <FormattedMessage
                  description="How can I login with other devices? description"
                  defaultMessage="Passwordless login is supported  by another device you can use that to login to eduID (e.g. saved password or security key)."
                />
              </p>
              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="Create a eduID account heading"
                    defaultMessage="Select 'Other device' button under the login form,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="Create a eduID account heading"
                    defaultMessage="Scan the QR-code with the device where you have your login credentials, e.g. security key or saved password,"
                  />
                </li>
              </ul>
            </article>
          </AccordionItemTemplate>
          <AccordionItemTemplate
            uuid="help-mfa-sunet"
            title={<FormattedMessage description="SUNET" defaultMessage="Improving the security level of eduID" />}
            additionalInfo={"Adding an MFA/2FA Security Key"}
          >
            {" "}
            <article>
              <h3>
                <FormattedMessage
                  description="How can I make my eduID more secure? heading"
                  defaultMessage="How do I make my eduID more secure?"
                />
              </h3>
              <p>
                <FormattedMessage
                  description="How can I login with other devices? description"
                  defaultMessage="Some services will require a higher security level and to improve the security of your eduID, in addition to knowledge of your username (confirmed email address) and password combination, 
                  you can use another layer of authentication to log in. This is called multi-Factor authentication (MFA); and in eduID's case two-factor authentication (2FA)."
                />
              </p>
              <p>
                <FormattedMessage
                  description="How can I login with other devices? description"
                  defaultMessage="Examples can be a physical device in your possession such as a USB token, 
                  or biometric information such as fingerprint or face-recognition supported on the device you are using, and we refer to these techniques as a 'Security key'."
                />
              </p>
              <h4>
                <FormattedMessage
                  description="How can I make my eduID more secure? heading"
                  defaultMessage="How do I implement 2FA with eduID?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="How can I login with other devices? description"
                  defaultMessage="When logged in you can add and confirm security keys of your choice (provided you have access to any of these methods) in the settings area of eduID and follow the instructions."
                />
              </p>
              <p>
                <FormattedMessage
                  description="How can I login with other devices? description"
                  defaultMessage="Note: once you have added a security key to your eduID it must be used to log in."
                />
              </p>
            </article>
          </AccordionItemTemplate>
          <AccordionItemTemplate
            uuid="help-verification-of-identity"
            title={
              <FormattedMessage description="Verification of Identity" defaultMessage="Verification of Identity" />
            }
            additionalInfo={"Levels and methods of verifying eduID for different user groups"}
          >
            <article id="identity">
              <h3>
                <FormattedMessage
                  description="Verification levels heading"
                  defaultMessage="What are the levels of verification?"
                />
              </h3>
              <p>
                <FormattedMessage
                  description="Freja eID+ is a digital ID-card free of charge. description"
                  defaultMessage="Describing levels of verification and what they may be used for."
                />
              </p>
            </article>
            <article>
              <h3>
                <FormattedMessage
                  description="What are the selected methods of verification for eduID? heading"
                  defaultMessage="What are the methods of verification for eduID?"
                />
              </h3>
              <p>
                <FormattedMessage
                  description="Verifying methods initial paragraph"
                  defaultMessage="The service is constantly being developed to better support the needs of our various users. At present
                  the methods below are available, depending on your circumstances."
                />
              </p>
              <section>
                <p>
                  <FormattedMessage
                    description="At this moment, verifying an id number can be done via: description"
                    defaultMessage="{emphasis}, verifying it can be done via:"
                    values={{
                      emphasis: <strong>If you have a Swedish personal identity number</strong>,
                    }}
                  />
                </p>
                <ul className="bullets">
                  <li>
                    <FormattedMessage
                      description="identity verification methods: Post"
                      defaultMessage={`{post} the user receives a letter with a code sent to their home address as 
                      registered at Skatteverket (the Swedish Tax Agency), `}
                      values={{
                        post: <em>post:</em>,
                        // detailedList: (
                        //   <ol>
                        //     <li>kolla brevlådan</li>
                        //   </ol>
                        // ),
                      }}
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="identity verification methods: Mobile"
                      defaultMessage={`{mobile} the user receives a message sent to the phone number that is registered in
                    the Swedish telephone register,`}
                      values={{
                        mobile: <em>mobile:</em>,
                      }}
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="identity verification methods: Mobile"
                      defaultMessage={`{freja} the user will be directed to the Freja eID website to
                      use their service. If you don't have Freja eID+ you have to create it separately before you can
                      complete verification of your eduID. Read more about {frejaLink}.`}
                      values={{
                        freja: <em>Freja eID+ (digital ID-card):</em>,
                        frejaLink: (
                          <a className="text-link" href="#frejaeid">
                            Freja eID+
                          </a>
                        ),
                      }}
                    />
                  </li>
                </ul>
              </section>
              <section>
                <p>
                  <FormattedMessage
                    description="eidas heading"
                    defaultMessage={`{emphasis}, you could use 
                    eIDAS to verify your identity. Read more about {eIDASLink}.`}
                    values={{
                      emphasis: (
                        <strong>If you are an EU citizen and without a Swedish personal identity number</strong>
                      ),
                      eIDASLink: (
                        <a className="text-link" href="#eidas">
                          eIDAS
                        </a>
                      ),
                    }}
                  />
                </p>
              </section>
              <section>
                <p>
                  <FormattedMessage
                    description="Svipe heading"
                    defaultMessage={`{emphasis}, you could use Svipe eID to verify your identity using your passport. Read more about {SvipeLink}.`}
                    values={{
                      emphasis: (
                        <strong>If you are not an EU citizen and without a Swedish personal identity number</strong>
                      ),
                      SvipeLink: (
                        <a className="text-link" href="#svipe">
                          Svipe iD
                        </a>
                      ),
                    }}
                  />
                </p>
              </section>
            </article>
            <article id="frejaeid">
              <h3>
                <FormattedMessage description="What is Freja eID+? heading" defaultMessage="What is Freja eID+" />
              </h3>
              <p>
                <FormattedMessage
                  description="Freja eID+ is a digital ID-card free of charge. description"
                  defaultMessage="Freja eID+ is a digital ID-card free of charge, available to holders of a Swedish personal identification number."
                />
              </p>
              <p>
                <FormattedMessage
                  description="Freja eID+ description"
                  defaultMessage="How to use Freja eID+ with eduID:"
                />
              </p>

              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="Create a Freja eID+ account heading"
                    defaultMessage="install the {Freja}  on your mobile device (iOS or Android) and create a Freja eID+ account,"
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
                    defaultMessage="bring a valid ID to the nearest ATG agent authorised to verify your identity,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="Create a Freja eID+ account list item"
                    defaultMessage="log in to eduID and choose the 'Digital ID-card' option in the Identity area and follow the instructions."
                  />
                </li>
              </ul>

              <h4>
                <FormattedMessage
                  description="visit an authorised ATG agent to create Freja eID+ heading"
                  defaultMessage="Why do I need to visit an authorised ATG agent to create Freja eID+?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="visit an authorised ATG agent to create Freja eID+ description"
                  defaultMessage={`On site, the agent can start the verification process by scanning a QR code in your 
                    app and follow the instructions in their terminal. You will be informed when you have passed the 
                    ID verification and will be able use your Freja eID+ with your eduID. It can take up to three hours for your Freja eID+ to be fully activated.`}
                />
              </p>

              <h4>
                <FormattedMessage
                  description="What should I do if my identity verification for Freja eID+ fails?"
                  defaultMessage="What should I do if my identity verification for Freja eID+ fails?"
                />
              </h4>

              <p>
                <FormattedMessage
                  description="Create a Freja eID+ account description"
                  defaultMessage={`Reinstall the app, redo the registration and make sure that you have entered the 
                    correct expiration date as well as written down the correct reference number of the chosen form of 
                    ID and personal identity number (personnummer).`}
                />
              </p>
            </article>
            <article id="eidas">
              <h3>
                <FormattedMessage description="eIDAS heading" defaultMessage="What is eIDAS?" />
              </h3>
              <p>
                <FormattedMessage
                  description="What is eIDAS? description"
                  defaultMessage={`eIDAS is a federation of EU countries providing electronic identification to allow 
                    access to public authority systems for EU citizens, using their country's electronic ID.`}
                />
              </p>
              <p>
                <FormattedMessage description="How to use eIDAS:" defaultMessage="How to use eIDAS with eduID:" />
              </p>
              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="eIDAS list item"
                    defaultMessage={`make sure you have an electronic ID from a connected country to have the possibility to 
                      authenticate yourself via eIDAS,`}
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="eIDAS list item"
                    defaultMessage={`to verify your identity in eduID, log in and choose the verification method for 
                      'EU-citizens' in the Identity area and follow the instructions.`}
                  />
                </li>
              </ul>
              <p>
                <FormattedMessage
                  description="eIDAS item"
                  defaultMessage={`If you have a Swedish personal identity number, use that method instead e.g. to 
                      simplify communication with Swedish authorities. Note: If you initially verify your identity with eIDAS and later receive a Swedish 
                      personal identity number you can add it in eduID and verify yourself again using it in the 
                      Identity area.`}
                />
              </p>
            </article>
            <article id="svipe">
              <h3>
                <FormattedMessage description="Svipe heading" defaultMessage="What is Svipe iD?" />
              </h3>
              <p>
                <FormattedMessage
                  description="What is Svipe? description"
                  defaultMessage={`Svipe iD is based on an identity verification platform using biometric documents from over 140 countries, combined with the users mobile device face-recognition ability, to create a verified digital identity.`}
                />
              </p>
              <p>
                <FormattedMessage
                  description="How do I use Svipe? description"
                  defaultMessage={`How to use Svipe iD with eduID:`}
                />
              </p>
              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="How do I use Svipe? description"
                    defaultMessage="to verify your eduID using Svipe you first need a Svipe account with a verified profile supported by e.g. your passport, in the Svipe app available at App Store and Google play,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="How do I use Svipe? description"
                    defaultMessage="login to eduID and scan the QR code produced by Svipe iD from the 'All other countries' section in the Identity area of eduID by following the instructions."
                  />
                </li>
              </ul>
              <p>
                <FormattedMessage
                  description="How do I use Svipe? description"
                  defaultMessage={`Note: Holders of Swedish personal identity numbers are advised to use that method instead.`}
                />
              </p>
            </article>
          </AccordionItemTemplate>

          <AccordionItemTemplate
            uuid="help-About-orcid"
            title={
              <FormattedMessage
                description="Connecting with Orcid / Ladok"
                defaultMessage="Connecting with Orcid / Ladok"
              />
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
                  defaultMessage={`ORCID is integrated into many research-related services, such as systems used by 
                    publishers, funders and institutions. ORCID is an independent non-profit organisation that provides 
                    a persistent identifier – an ORCID iD – that distinguishes you from other researchers and a 
                    mechanism for linking your research outputs and activities to your ORCID iD.`}
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

              <h4>
                <FormattedMessage
                  description="How does linking ORCID to eduID work? heading"
                  defaultMessage="How does linking ORCID to eduID work?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="connect orcid   account description"
                  defaultMessage={`Click the 'Connect ORCID account' button, sign in to your ORCID account and grant 
                    eduID permission to receive your ORCID iD. This process ensures that the correct ORCID iD is 
                    connected to the correct eduID.`}
                />
              </p>
              <h4>
                <FormattedMessage
                  description="What do I do if I don't have an ORCID? heading"
                  defaultMessage=" What do I do if I don't have an ORCID?"
                />
              </h4>
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
              <h4>
                <FormattedMessage
                  description=" How do I remove a linked ORCID from eduID? heading"
                  defaultMessage="  How do I remove a linked ORCID from eduID?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="orcid description"
                  defaultMessage={`If you do not longer want eduID to know your ORCID iD you can easily remove it by 
                    clicking the remove button in your eduID.`}
                />
              </p>
            </article>
          </AccordionItemTemplate>
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
            <article>
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
            </article>
          </AccordionItemTemplate>
          <AccordionItemTemplate
            uuid="help-about-sunet"
            title={<FormattedMessage description="SUNET" defaultMessage="About SUNET" />}
            additionalInfo={null}
          >
            {" "}
            <article>
              <p>
                <FormattedMessage
                  description="About SUNET description"
                  defaultMessage={`SUNET is the organisation responsible for Swedish universities and data networks, 
                  as well as many services that are used by universities in Sweden.`}
                />
              </p>
              <p>
                <FormattedMessage
                  description="What is SUNET? description"
                  defaultMessage={`SUNET has been working with the issue of identity management for a long time and 
                  developed eduID to make things easier for all parties in the higher education community. 
                  More information about SUNET is available at {sunet}.`}
                  values={{
                    sunet: (
                      <a className="text-link" href="http://www.sunet.se">
                        www.sunet.se
                      </a>
                    ),
                  }}
                />
              </p>
            </article>
          </AccordionItemTemplate>
          <AccordionItemTemplate
            uuid="help-contact-us"
            title={
              <FormattedMessage description="How to contact eduID support" defaultMessage="Contacting eduID support" />
            }
            additionalInfo={null}
          >
            <article>
              <p>
                <FormattedMessage
                  description="Create a Freja eID+ account list item"
                  defaultMessage={`If you can't find the answers to your questions about eduID on this help page, 
                  you can contact the eduID support by mailing {support}.`}
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
                  defaultMessage={`Always let us know the e-mail address you used when you logged in to eduID, and if you are logged in include your unique id ‘eppn’ under the advanced settings tab.  
                  If something went wrong, it is always a good idea to include screenshots with error messages to 
                  ease troubleshooting.`}
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
                <FormattedMessage description="Opening hours:" defaultMessage="Opening hours:" />
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
            </article>
          </AccordionItemTemplate>
        </Accordion>
      </div>
      <ScrollToTopButton />
    </React.Fragment>
  );
}
