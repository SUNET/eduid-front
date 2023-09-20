import React, { useEffect } from "react";
import { Accordion } from "react-accessible-accordion";
import { FormattedMessage, useIntl } from "react-intl";
import AccordionItemTemplate from "./Common/AccordionItemTemplate";
import ScrollToTopButton from "./ScrollToTopButton";

export function Help(): JSX.Element {
  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Help",
      defaultMessage: "Faq | eduID",
    });
  }, []);

  return (
    <React.Fragment>
      <section className="intro">
        <h1>
          <FormattedMessage description="help headline" defaultMessage="Help and contact" />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              description="help lead text"
              defaultMessage={`Listed below is general information about the service, answers to common questions about 
              using eduID 
               and Support contact information.`}
            />
          </p>
        </div>
      </section>
      <div className="help-content">
        <Accordion allowMultipleExpanded allowZeroExpanded id="eduid-faq">
          <AccordionItemTemplate
            uuid="help-about-eduid"
            title={<FormattedMessage description="about eduid handle" defaultMessage="About eduID" />}
            additionalInfo="What it is and may be used for"
          >
            <article>
              <h4>
                <FormattedMessage description="what is eduID heading" defaultMessage="What is eduID?" />
              </h4>
              <p>
                <FormattedMessage
                  description="what is eduID description 1"
                  defaultMessage={`eduID is a federated identity - a user identity that can be used in several different 
                  organisations that have agreed on how identities will be managed. The basic idea is that a given user, 
                  who is authenticated with an organisation, is automatically authenticated with other organisations
                   in the federation.`}
                />
              </p>
              <p>
                <FormattedMessage
                  description="what is eduID description 2"
                  defaultMessage={`Federated identities are one of the cornerstones of trust between organisations. 
                    Trust is based on all the organisations relying on all the others to carry out their authentication 
                    - identification and verification - properly and in a controlled and reliable IT environment.`}
                />
              </p>
              <h4>
                <FormattedMessage description="why have eduID heading" defaultMessage="Why have eduID?" />
              </h4>

              <p>
                <FormattedMessage
                  description="why have eduID description 1"
                  defaultMessage={`From the user's perspective, in the long-term eduID means fewer accounts to keep 
                    track of. For many organisations, identity management is a complex issue and it is
                    necessary to work with confirmed users.`}
                />
              </p>
              <p>
                <FormattedMessage
                  description="why have eduID description 2"
                  defaultMessage={`There are many services that require identification of users. This is often done by 
                    the user entering an email address to which the service provider sends a password. Such a user is 
                    normally called unconfirmed, because the service 
                    provider does not really know who the user with that email address is - and for many 
                    services this is at a sufficient level. Through the use of eduID, 
                    identification of users is elevated to that of confirmed users.`}
                />
              </p>
              <h4>
                <FormattedMessage description="when use eduID heading" defaultMessage="When will I use eduID?" />
              </h4>
              <p>
                <FormattedMessage
                  description="when use eduID description"
                  defaultMessage={`Depending on where you work or study you might only use your eduID account a few 
                  times, or you might use it every day. Some schools, institutions and services use eduID as their 
                  identity provider, this means you will use your eduID to gain access to their IT-systems. Or you may 
                  mainly use your eduID account to create and access other accounts, such as {link} or your student 
                  account.`}
                  values={{
                    link: (
                      <a className="text-link" href="https://www.universityadmissions.se" target="_blank">
                        universityadmissions.se
                      </a>
                    ),
                  }}
                />
              </p>
              <p>
                <FormattedMessage
                  description="when use eduID eduID list definition"
                  defaultMessage="Log in at eduid.se when you:"
                />
              </p>
              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="when use eduID list item 1"
                    defaultMessage="apply to and accept your place at a university,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="when use eduID list item 2"
                    defaultMessage="organise your student account for email and intranet,"
                  />
                </li>
                <li>
                  <FormattedMessage description="when use eduID list item 3" defaultMessage="change university," />
                </li>
                <li>
                  <FormattedMessage
                    description="when use eduID list item 4"
                    defaultMessage="lose a student account password and need to regain access."
                  />
                </li>
              </ul>
            </article>
          </AccordionItemTemplate>
          <AccordionItemTemplate
            uuid="help-using-eduid"
            title={<FormattedMessage description="using eduid handle" defaultMessage="Using eduID" />}
            additionalInfo={"How to create, use and strengthen your eduID"}
          >
            <article>
              <h4>
                <FormattedMessage description="creating eduID heading" defaultMessage="How do I create an eduID?" />
              </h4>
              <p>
                <FormattedMessage
                  description="creating eduID list definition"
                  defaultMessage={"How to create your eduID account at {eduidLink}:"}
                  values={{
                    eduidLink: (
                      <a className="text-link" href="https://signup.eduid.se/register/" target="_blank">
                        eduid.se
                      </a>
                    ),
                  }}
                />
              </p>
              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="creating eduID list item 1"
                    defaultMessage="register your email address,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="creating eduID list item 2"
                    defaultMessage="confirm that you are human by using captcha,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="creating eduID list item 3"
                    defaultMessage="accept the eduID terms of use,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="creating eduID list item 4"
                    defaultMessage="verify your email address by entering the code emailed to you,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="creating eduID list item 5"
                    defaultMessage={`take note of the email address and password in use when your login details are 
                    presented to you. Your eduID is now ready to use.`}
                  />
                </li>
              </ul>
              <h4>
                <FormattedMessage description="enhancing eduID heading" defaultMessage="How can I enhance my eduID?" />
              </h4>
              <p>
                <FormattedMessage
                  description="enhancing eduID list definition"
                  defaultMessage={`In eduID you are encouraged to add further details such as:`}
                />
              </p>
              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="enhancing eduID list item 1"
                    defaultMessage={`your full name to be able to add a security key or access some services from an 
                    unverified account,`}
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="enhancing eduID list item 2"
                    defaultMessage="your phone number for easier retrieval of your account should it be needed,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="enhancing eduID list item 3"
                    defaultMessage="a security key of you are able to for added security,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="enhancing eduID list item 4"
                    defaultMessage={`connecting your eduID to Ladok if enabled by your institution, or sharing it with 
                    your existing ORCID iD,`}
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="enhancing eduID list item 5"
                    defaultMessage="verifying your identity to strengthen your eduID sufficiently for many external services."
                  />
                </li>
              </ul>
              <p>
                <FormattedMessage
                  description="enhancing eduID verification description"
                  defaultMessage={`For more detailed information on how to verify your created account based on your 
                  situation, see the 'Verification of Identity' help section.`}
                />
              </p>
            </article>
            <article>
              <h4>
                <FormattedMessage
                  description="login email heading"
                  defaultMessage="Which email account should I use to log in?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="login email description"
                  defaultMessage="You can log in with all the email addresses you have entered and confirmed in eduID."
                />
              </p>
              <h4>
                <FormattedMessage
                  description="changing language heading"
                  defaultMessage="How do I change the default language in eduID?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="changing language description"
                  defaultMessage={`To change the default language you can log into eduID and select your language 
                  preference in the Personal information area in eduID. The default language is based on the language 
                  setting that your browser uses. You can also change the displayed language in the footer of the 
                  webpage. Available options are Swedish and English.`}
                />
              </p>
              <h4>
                <FormattedMessage
                  description="other devices heading"
                  defaultMessage="How can I login with other devices?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="other devices description"
                  defaultMessage={`Passwordless login can also be supported by using another device to login to eduID 
                  on the device you are currently using:`}
                />
              </p>
              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="other devices list item 1"
                    defaultMessage="select 'Other device' button in the login form,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="other devices list item 2"
                    defaultMessage={`scan the QR-code with the device where you have your login credentials, 
                    e.g. security key or saved password,`}
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="other devices list item 3"
                    defaultMessage={`on that second device, review the device requesting to be logged in and use the 
                    presented code to login by entering it within the time shown, in the first device.`}
                  />
                </li>
              </ul>
            </article>
          </AccordionItemTemplate>
          <AccordionItemTemplate
            uuid="help-security-key"
            title={
              <FormattedMessage
                description="security key handle"
                defaultMessage="Improving the security level of eduID"
              />
            }
            additionalInfo="Adding an MFA/2FA Security Key"
          >
            <article>
              <h4>
                <FormattedMessage
                  description="more secure heading"
                  defaultMessage="How do I make my eduID more secure?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="more secure description 1"
                  defaultMessage={`Some services will require a higher security level and to improve the security of 
                  your eduID, in addition to knowledge of your username (confirmed email address) and password 
                  combination, you can use another layer of authentication to log in. This is called multi-Factor 
                  authentication (MFA); and in eduID's case two-factor authentication (2FA).`}
                />
              </p>
              <p>
                <FormattedMessage
                  description="more secure description 2"
                  defaultMessage={`Examples can be a physical device in your possession such as a USB token, 
                  or biometric information such as fingerprint or face-recognition supported on the device you are 
                  using, and we refer to these techniques as a 'Security key'.`}
                />
              </p>
              <h4>
                <FormattedMessage
                  description="add security key heading"
                  defaultMessage="How do I implement 2FA with eduID?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="add security key description 1"
                  defaultMessage={`When logged in you can add and confirm security keys of your choice (provided you 
                    have access to any of these methods) in the Settings area of eduID and follow the instructions.`}
                />
              </p>
              <p>
                <FormattedMessage
                  description="add security key description 2"
                  defaultMessage={`Note: once you have added a security key to your eduID it must be used to log in.`}
                />
              </p>
            </article>
          </AccordionItemTemplate>
          <AccordionItemTemplate
            uuid="help-verification"
            title={
              <FormattedMessage
                description="verification of identity handle"
                defaultMessage="Verification of Identity"
              />
            }
            additionalInfo="Levels and methods of verifying eduID for different user groups"
          >
            <article id="identity">
              <h4>
                <FormattedMessage
                  description="verification levels heading"
                  defaultMessage="What are verification levels?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="verification levels description"
                  defaultMessage={`Service providers need to rely on organisations to manage their users credentials 
                  according to certain assurance levels (e.g. AL1-3), depending on the type of information accessible. 
                  The levels range from unconfirmed, to confirmed, to verified users also using MFA when logging in 
                  to the system.`}
                />
              </p>
            </article>
            <article>
              <h4>
                <FormattedMessage
                  description="verification methods heading"
                  defaultMessage="What are the methods of verification for eduID?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="verification methods description"
                  defaultMessage={`The service is constantly being developed to better support the needs of our various 
                  users. At present the methods below are available, depending on your situation such as assurance level 
                  requirements, nationality and residence.`}
                />
              </p>
              <section>
                <p>
                  <FormattedMessage
                    description="verification methods list definition"
                    defaultMessage="{emphasis}, verifying it can be done via:"
                    values={{
                      emphasis: <strong>If you have a Swedish personal identity number</strong>,
                    }}
                  />
                </p>
                <ul className="bullets">
                  <li>
                    <FormattedMessage
                      description="verification methods list item 1"
                      defaultMessage={`{post} the user receives a letter with a code sent to their home address as 
                      registered at Skatteverket (the Swedish Tax Agency), and instructions on how to complete the 
                      verification on eduid.se,`}
                      values={{
                        post: <em>post:</em>,
                      }}
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="verification methods list item 2"
                      defaultMessage={`{mobile} the user receives a message sent to the phone number that is registered in
                    the Swedish telephone register, and instructions on how to complete the verification on eduid.se,`}
                      values={{
                        mobile: <em>mobile:</em>,
                      }}
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="verification methods list item 3"
                      defaultMessage={`{freja} the user will be directed to the Freja eID website to
                      use their service. If you don't have Freja+ you have to create it separately before you can
                      complete verification of your eduID. Read more about Freja+ below.`}
                      values={{
                        freja: <em>Freja+ (digital ID-card):</em>,
                      }}
                    />
                  </li>
                </ul>
              </section>
              <section>
                <p>
                  <FormattedMessage
                    description="eidas description"
                    defaultMessage={`{strong}, you could use {emphasis} to verify your identity. Read more about eIDAS 
                    below.`}
                    values={{
                      strong: <strong>If you are an EU citizen and without a Swedish personal identity number</strong>,
                      emphasis: <em>eIDAS</em>,
                    }}
                  />
                </p>
              </section>
              <section>
                <p>
                  <FormattedMessage
                    description="svipe description"
                    defaultMessage={`{strong}, you could use {emphasis} to verify your identity using your passport. 
                    Read more about Svipe iD below.`}
                    values={{
                      strong: (
                        <strong>If you are not an EU citizen and without a Swedish personal identity number</strong>
                      ),
                      emphasis: <em>Svipe eID</em>,
                    }}
                  />
                </p>
              </section>
            </article>

            <Accordion allowMultipleExpanded allowZeroExpanded id="eduid-verification">
              <AccordionItemTemplate
                uuid="help-freja"
                title={<FormattedMessage description="about freja handle" defaultMessage="About Freja+" />}
                additionalInfo={null}
              >
                <article>
                  <h4>
                    <FormattedMessage description="about freja heading" defaultMessage="What is Freja+?" />
                  </h4>
                  <p>
                    <FormattedMessage
                      description="about freja description"
                      defaultMessage={`Freja+ is a digital ID-card (a verified Freja eID) free of charge, available to 
                      holders of a Swedish personal identification number.`}
                    />
                  </p>
                  <p>
                    <FormattedMessage
                      description="create freja+ list definition"
                      defaultMessage="How to use Freja+ with eduID:"
                    />
                  </p>

                  <ul className="bullets">
                    <li>
                      <FormattedMessage
                        description="create freja+ list item 1"
                        defaultMessage={`install the {Freja}  on your mobile device (iOS or Android) and create a Freja+ 
                        account according to the instructions,`}
                        values={{
                          Freja: (
                            <a className="text-link" href="https://frejaeid.com/en/get-freja-eid/" target="_blank">
                              Freja app
                            </a>
                          ),
                        }}
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        description="create freja+ list item 2"
                        defaultMessage={`if you have a valid Swedish passport you can complete the verification of your 
                        account in the app using your device camera, or bring a valid ID (including drivers license or 
                        ID card) to the nearest ATG agent authorised to verify your identity,`}
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        description="create freja+ list item 3"
                        defaultMessage={`log in to eduID and choose the 'Digital ID-card' option in the Identity area 
                        and follow the instructions.`}
                      />
                    </li>
                  </ul>

                  <h4>
                    <FormattedMessage
                      description="visit atg agent to create freja+ heading"
                      defaultMessage="Do I need to visit an authorised ATG agent to create Freja+?"
                    />
                  </h4>
                  <p>
                    <FormattedMessage
                      description="visit atg agent to create freja+ description"
                      defaultMessage={`Only if you use another means of identification than a Swedish passport. On site, 
                      the agent can start the verification process by scanning a QR code in your app and follow the 
                      instructions in their terminal. You will be informed when you have passed the ID verification and 
                      will be able use your Freja+ with your eduID. It can take up to three hours for your Freja+ to be 
                      fully activated.`}
                    />
                  </p>

                  <h4>
                    <FormattedMessage
                      description="if verification for freja+ fails heading"
                      defaultMessage="What should I do if my identity verification for Freja+ fails?"
                    />
                  </h4>

                  <p>
                    <FormattedMessage
                      description="if verification for freja+ fails description"
                      defaultMessage={`Reinstall the app, redo the registration and make sure that you have entered the 
                    correct expiration date as well as written down the correct reference number of the chosen form of 
                    ID and personal identity number (personnummer).`}
                    />
                  </p>
                </article>
              </AccordionItemTemplate>
              <AccordionItemTemplate
                uuid="help-eidas"
                title={<FormattedMessage description="about eidas handle" defaultMessage="About eIDAS" />}
                additionalInfo={null}
              >
                <article>
                  <h4>
                    <FormattedMessage description="about eidas heading" defaultMessage="What is eIDAS?" />
                  </h4>
                  <p>
                    <FormattedMessage
                      description="about eidas description"
                      defaultMessage={`eIDAS is a federation of EU countries providing electronic identification to 
                      allow access to public authority systems for EU citizens, using their country's electronic ID.`}
                    />
                  </p>
                  <p>
                    <FormattedMessage
                      description="use eidas list definition"
                      defaultMessage="How to use eIDAS with eduID:"
                    />
                  </p>
                  <ul className="bullets">
                    <li>
                      <FormattedMessage
                        description="use eidas list item 1"
                        defaultMessage={`make sure you have an electronic ID from a connected country to have the 
                        possibility to authenticate yourself via eIDAS,`}
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        description="use eIDAS list item 2"
                        defaultMessage={`to verify your identity in eduID, log in and choose the verification method for 
                      'EU-citizens' in the Identity area and follow the instructions.`}
                      />
                    </li>
                  </ul>
                  <p>
                    <FormattedMessage
                      description="eidas personal number description"
                      defaultMessage={`If you have a Swedish personal identity number, use that method instead e.g. to 
                      simplify communication with Swedish authorities. Note: If you initially verify your identity with 
                      eIDAS and later receive a Swedish personal identity number you can add it in eduID and verify 
                      yourself again using it in the Identity area.`}
                    />
                  </p>
                </article>
              </AccordionItemTemplate>
              <AccordionItemTemplate
                uuid="help-svipe"
                title={<FormattedMessage description="about svipe handle" defaultMessage="About Svipe iD" />}
                additionalInfo={null}
              >
                <article id="svipe">
                  <h4>
                    <FormattedMessage description="about svipe heading" defaultMessage="What is Svipe iD?" />
                  </h4>
                  <p>
                    <FormattedMessage
                      description="about svipe description 1"
                      defaultMessage={`Svipe iD is based on an identity verification platform using biometric documents 
                      from over 140 countries, e.g. passports and ID-cards, combined with the users mobile device 
                      face-recognition ability, to create a verified digital identity than can be used remotely.`}
                    />
                  </p>
                  <p>
                    <FormattedMessage
                      description="about svipe description 2"
                      defaultMessage={`You can stay informed about the information that Svipe saves about you and your 
                      ID-document by reading their data privacy policy. In short, the information uploaded to the app 
                      from your ID-document is saved locally on your device, and the company Svipe does not have access 
                      to it.`}
                    />
                  </p>
                  <p>
                    <FormattedMessage
                      description="about svipe list definition"
                      defaultMessage="How to use Svipe iD with eduID:"
                    />
                  </p>
                  <ul className="bullets">
                    <li>
                      <FormattedMessage
                        description="about svipe list item 1"
                        defaultMessage={`to verify your eduID using Svipe you first need a Svipe account with a verified 
                        profile supported by your ID-document, in the Svipe app available at App store for IOS, or 
                        Google Play for Android,`}
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        description="about svipe list item 2"
                        defaultMessage={`login to eduID and scan the QR code produced by Svipe iD from the 'All other 
                        countries' section in the Identity area of eduID by following the instructions.`}
                      />
                    </li>
                  </ul>
                  <p>
                    <FormattedMessage
                      description="svipe personal number description"
                      defaultMessage={`Note: Holders of Swedish personal identity numbers are advised to use that method 
                      instead.`}
                    />
                  </p>
                </article>
              </AccordionItemTemplate>
            </Accordion>
          </AccordionItemTemplate>

          <AccordionItemTemplate
            uuid="help-orcid-ladok"
            title={
              <FormattedMessage
                description="connecting orcid ladok handle"
                defaultMessage="Connecting account with Orcid / Ladok"
              />
            }
            additionalInfo={null}
          >
            <article>
              <h4>
                <FormattedMessage description="what is orcid heading" defaultMessage="What is ORCID?" />
              </h4>
              <p>
                <FormattedMessage
                  description="what is orcid description"
                  defaultMessage={`ORCID is integrated into many research-related services, such as systems used by 
                    publishers, funders and institutions. ORCID is an independent non-profit organisation that provides 
                    a persistent identifier – an ORCID iD – that distinguishes you from other researchers and a 
                    mechanism for linking your research outputs and activities to your ORCID iD.`}
                />
              </p>

              <p>
                <FormattedMessage description="orcid list definition" defaultMessage="How to link ORCID with eduID:" />
              </p>
              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="orcid list item 1"
                    defaultMessage="read more and register for an ORCID at {orcid},"
                    values={{
                      orcid: (
                        <a className="text-link" href="https://orcid.org" target="_blank">
                          orcid.org
                        </a>
                      ),
                    }}
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="orcid list item 2"
                    defaultMessage="click the 'Connect ORCID account' button in the Settings area of eduID,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="orcid list item 3"
                    defaultMessage="sign in to your ORCID account and grant 
                    eduID permission to receive your ORCID iD. This process ensures that the correct ORCID iD is 
                    connected to the correct eduID."
                  />
                </li>
              </ul>

              <h4>
                <FormattedMessage
                  description="remove linked orcid heading"
                  defaultMessage="How do I remove a linked ORCID from eduID?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="remove linked orcid description"
                  defaultMessage={`If you do not longer want eduID to know your ORCID iD you can remove it by 
                    clicking the Remove button in your eduID.`}
                />
              </p>
            </article>
            <article>
              <h4>
                <FormattedMessage description="what is ladok heading" defaultMessage="What is Ladok?" />
              </h4>
              <p>
                <FormattedMessage
                  description="what is ladok description"
                  defaultMessage={`Ladok is a student administration system used in all Swedish higher education 
                  institutions for registration and grading. A couple of schools have chosen to let eduID release the
                  
                  ESI attribute, used for instance when applying to a Erasmus exchange student program.`}
                />
              </p>

              <p>
                <FormattedMessage description="ladok list definition" defaultMessage="How to link Ladok with eduID:" />
              </p>

              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="ladok list item 1"
                    defaultMessage="in the Settings area of eduID, toggle the Ladok control,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="ladok list item 2"
                    defaultMessage="choose your institution from the drop down list - if it is available."
                  />
                </li>
              </ul>
            </article>
          </AccordionItemTemplate>
          <AccordionItemTemplate
            uuid="help-privacy-accessibility"
            title={
              <FormattedMessage
                description="privacy accessibility handle"
                defaultMessage="Privacy policy and Web accessibility"
              />
            }
            additionalInfo={null}
          >
            <article>
              <h4>
                <FormattedMessage
                  description="privacy policy heading"
                  defaultMessage="What is eduIDs Privacy policy?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="privacy policy description"
                  defaultMessage={`Read the full {privacy} regarding use of eduID at the Sunet website, where you also 
                  find contact information to our Dataskyddsombud and Integritetsskyddsmyndigheten (in Swedish).`}
                  values={{
                    privacy: (
                      <a
                        className="text-link"
                        href="https://sunet.se/om-sunet/behandling-av-personuppgifter-i-eduid"
                        target="_blank"
                      >
                        Privacy policy
                      </a>
                    ),
                  }}
                />
              </p>
              <p>
                <FormattedMessage
                  description="privacy policy list definition"
                  defaultMessage="Summary of how eduID treats your information according to the policy:"
                />
              </p>
              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="privacy policy list item 1"
                    defaultMessage="stores information that you have provided as well as updates from trusted registers,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="privacy policy list item 2"
                    defaultMessage={`transfers information according to the data minimisation principle - never more 
                    than required,`}
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="privacy policy list item 3"
                    defaultMessage="uses the information to identify the individual for services you have chosen to use,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="privacy policy list item 4"
                    defaultMessage="protects and stores the information securely,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="privacy policy list item 5"
                    defaultMessage="develops using open source code accessible at GitHub,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="privacy policy list item 6"
                    defaultMessage="enables removal of eduID and connections directly in the service,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="privacy policy list item 7"
                    defaultMessage="stores log files recording use for 6 months,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="privacy policy list item 8"
                    defaultMessage="retains inactive accounts for a maximum of 2 years,"
                  />
                </li>
                <li>
                  <FormattedMessage description="privacy policy list item 9" defaultMessage="does not use cookies." />
                </li>
              </ul>
            </article>
            <article>
              <h4>
                <FormattedMessage
                  description="accessibility report heading"
                  defaultMessage="What is eduIDs Accessibility report?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="accessibility report description 1"
                  defaultMessage={`Read the full {accessability} regarding the eduID site at Sunets website, where you 
                  also find instructions on how to report accessibility issues. The report addresses how eduID adheres 
                  to the Swedish law governing accessibility to digital public services as well as currently known 
                  issues of the site (in Swedish).`}
                  values={{
                    accessability: (
                      <a
                        className="text-link"
                        href="https://sunet.se/om-sunet/tillganglighet-for-eduid-se"
                        target="_blank"
                      >
                        Accessibility report
                      </a>
                    ),
                  }}
                />
              </p>
              <p>
                <FormattedMessage
                  description="accessibility report description 2"
                  defaultMessage={`It is of outmost importance to us that as many as possible are able to use the 
                  service in a convenient and safe manner and is one of the many ways eduID is always striving to 
                  improve.`}
                />
              </p>
            </article>
          </AccordionItemTemplate>
          <AccordionItemTemplate
            uuid="help-about-sunet"
            title={<FormattedMessage description="about sunet handle" defaultMessage="About SUNET" />}
            additionalInfo={null}
          >
            {" "}
            <article>
              <h4>
                <FormattedMessage description="about sunet heading" defaultMessage="What is SUNET?" />
              </h4>
              <p>
                <FormattedMessage
                  description="about sunet description 1"
                  defaultMessage={`eduID is a service provided by SUNET - the Swedish University Computer Network, which 
                  is governed by the Swedish Research Council (Vetenskapsrådet). SUNET delivers data communication 
                  networks and many other related services to public organisations and higher education and research 
                  institutions.`}
                />
              </p>
              <p>
                <FormattedMessage
                  description="about sunet description 2"
                  defaultMessage={`SUNET developed eduID to provide a secure common routine for managing identity in the 
                  higher education community, with adequate authorization levels of confirmed accounts. 
                  More information about SUNET is available at {sunet}.`}
                  values={{
                    sunet: (
                      <a className="text-link" href="http://www.sunet.se" target="_blank">
                        www.sunet.se
                      </a>
                    ),
                  }}
                />
              </p>
            </article>
          </AccordionItemTemplate>
          <AccordionItemTemplate
            uuid="help-contact"
            title={<FormattedMessage description="contact support handle" defaultMessage="Contacting eduID support" />}
            additionalInfo={null}
          >
            <article>
              <h4>
                <FormattedMessage
                  description="contact support heading"
                  defaultMessage="How to contact eduID support?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="contact support description 1"
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
                  description="contact support description 2"
                  defaultMessage={`Always let us know the e-mail address you used when you logged in to eduID, and if 
                  you are logged in include your unique id ‘eppn’ in the Settings area.  
                  If something went wrong, it is always a good idea to include screenshots with error messages to 
                  ease troubleshooting.`}
                />
              </p>
              <p>
                <FormattedMessage
                  description="contact support description 3"
                  defaultMessage="{strong}, but for simple matters you can also reach us on phone number {phone}."
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
                <FormattedMessage description="opening hours list definition" defaultMessage="Opening hours:" />
              </p>
              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="opening hours list item 1"
                    defaultMessage="Monday-Thursday 09:00-12:00, 13:00-16:00"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="opening hours list item 2"
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
