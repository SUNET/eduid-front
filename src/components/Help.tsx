import { fetchApprovedSecurityKeys } from "apis/eduidSecurity";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import React, { useEffect, useState } from "react";
import { Accordion } from "react-accessible-accordion";
import { FormattedMessage, useIntl } from "react-intl";
import AccordionItemTemplate from "./Common/AccordionItemTemplate";
import ScrollToTopButton from "./ScrollToTopButton";

interface ApprovedSecurityKeysTypes {
  entries: [];
  next_update: Date;
}

export function Help(): JSX.Element {
  const intl = useIntl();
  const dispatch = useDashboardAppDispatch();
  const is_configured = useDashboardAppSelector((state) => state.config.is_configured);
  const [approvedSecurityKeys, setApprovedSecurityKeys] = useState<ApprovedSecurityKeysTypes>();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Help",
      defaultMessage: "Faq | eduID",
    });
  }, []);

  useEffect(() => {
    if (is_configured) {
      handleApprovedSecurityKeys();
    }
  }, [is_configured]);

  async function handleApprovedSecurityKeys() {
    const response = await dispatch(fetchApprovedSecurityKeys());
    if (fetchApprovedSecurityKeys.fulfilled.match(response)) {
      setApprovedSecurityKeys(response.payload);
    }
  }

  const newDate = approvedSecurityKeys && new Date(approvedSecurityKeys?.next_update);
  const formattedNextUpdateDate =
    newDate &&
    newDate.getFullYear() +
      "-" +
      (newDate.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      newDate.getDate().toString().padStart(2, "0");

  return (
    <React.Fragment>
      <section className="intro">
        <h1>
          <FormattedMessage description="help - headline" defaultMessage="Help and contact" />
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
      <div className="help-content">
        <Accordion allowMultipleExpanded allowZeroExpanded id="eduid-faq">
          <AccordionItemTemplate
            uuid="help-about-eduid"
            title={<FormattedMessage description="about eduid - handle" defaultMessage="About eduID" />}
            additionalInfo={
              <FormattedMessage description="about eduid - info" defaultMessage="What it is and may be used for" />
            }
          >
            <article>
              <h4>
                <FormattedMessage description="what is eduID - heading" defaultMessage="What is eduID?" />
              </h4>
              <p>
                <FormattedMessage
                  description="what is eduID - paragraph 1"
                  defaultMessage={`eduID is a federated identity - a user identity that can be used in several different 
                  organisations that have agreed on how identities will be managed. The basic idea is that a given user, 
                  who is authenticated with an organisation, is automatically authenticated with other organisations
                   in the federation.`}
                />
              </p>
              <p>
                <FormattedMessage
                  description="what is eduID - paragraph 2"
                  defaultMessage={`Federated identities are one of the cornerstones of trust between organisations. 
                    Trust is based on all the organisations relying on all the others to carry out their authentication 
                    - identification and verification - properly and in a controlled and reliable IT environment.`}
                />
              </p>
              <h4>
                <FormattedMessage description="why have eduID - heading" defaultMessage="Why have eduID?" />
              </h4>

              <p>
                <FormattedMessage
                  description="why have eduID - paragraph 1"
                  defaultMessage={`From the user's perspective, in the long-term eduID means fewer accounts to keep 
                    track of. For many organisations, identity management is a complex issue and it is
                    necessary to work with confirmed users.`}
                />
              </p>
              <p>
                <FormattedMessage
                  description="why have eduID - paragraph 2"
                  defaultMessage={`There are many services that require identification of users. This is often done by 
                    the user entering an email address to which the service provider sends a password. Such a user is 
                    normally called unconfirmed, because the service 
                    provider does not really know who the user with that email address is - and for many 
                    services this is at a sufficient level. Through the use of eduID, 
                    identification of users is elevated to that of confirmed users.`}
                />
              </p>
              <h4>
                <FormattedMessage description="when use eduID - heading" defaultMessage="When will I use eduID?" />
              </h4>
              <p>
                <FormattedMessage
                  description="when use eduID - paragraph"
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
                  description="when use eduID - list definition"
                  defaultMessage="Log in at eduid.se when you:"
                />
              </p>
              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="when use eduID - list item 1"
                    defaultMessage="apply to and accept your place at a university,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="when use eduID - list item 2"
                    defaultMessage="organise your student account for email and intranet,"
                  />
                </li>
                <li>
                  <FormattedMessage description="when use eduID - list item 3" defaultMessage="change university," />
                </li>
                <li>
                  <FormattedMessage
                    description="when use eduID - list item 4"
                    defaultMessage="lose a student account password and need to regain access."
                  />
                </li>
              </ul>
            </article>
          </AccordionItemTemplate>
          <AccordionItemTemplate
            uuid="help-using-eduid"
            title={<FormattedMessage description="about using eduid - handle" defaultMessage="Using eduID" />}
            additionalInfo={
              <FormattedMessage
                description="about using eduid - info"
                defaultMessage="How to create, use and strengthen your eduID"
              />
            }
          >
            <article>
              <h4>
                <FormattedMessage description="how create eduid - heading" defaultMessage="How do I create an eduID?" />
              </h4>
              <p>
                <FormattedMessage
                  description="create eduid - list definition"
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
                    description="create eduid - list item 1"
                    defaultMessage="register your email address,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="create eduid - list item 2"
                    defaultMessage="confirm that you are human by using captcha,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="create eduid - list item 3"
                    defaultMessage="accept the eduID terms of use,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="create eduid - list item 4"
                    defaultMessage="verify your email address by entering the code emailed to you,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="create eduid - list item 5"
                    defaultMessage={`take note of the email address and password in use when your login details are 
                    presented to you. Your eduID is now ready to use.`}
                  />
                </li>
              </ul>
              <h4>
                <FormattedMessage
                  description="how enhance eduid - heading"
                  defaultMessage="How can I enhance my eduID?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="enhance eduid - list definition"
                  defaultMessage={`In eduID you are encouraged to add further details such as:`}
                />
              </p>
              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="enhance eduid - list item 1"
                    defaultMessage={`your full name to be able to add a security key or access some services from an 
                    unverified account,`}
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="enhance eduid - list item 2"
                    defaultMessage="your phone number for easier retrieval of your account should it be needed,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="enhance eduid - list item 3"
                    defaultMessage="a security key of you are able to for added security,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="enhance eduid - list item 4"
                    defaultMessage={`connecting your eduID to Ladok if enabled by your institution, or sharing it with 
                    your existing ORCID iD,`}
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="enhance eduid - list item 5"
                    defaultMessage={`verifying your identity to strengthen your eduID sufficiently for many external 
                    services.`}
                  />
                </li>
              </ul>
              <p>
                <FormattedMessage
                  description="enhance eduID verification - paragraph"
                  defaultMessage={`For more detailed information on how to verify your created account based on your 
                  situation, see the 'Verification of Identity' help section.`}
                />
              </p>
            </article>
            <article>
              <h4>
                <FormattedMessage
                  description="which login email - heading"
                  defaultMessage="Which email account should I use to log in?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="which login email - paragraph"
                  defaultMessage="You can log in with all the email addresses you have entered and confirmed in eduID."
                />
              </p>
              <h4>
                <FormattedMessage
                  description="how change language - heading"
                  defaultMessage="How do I change the default language in eduID?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="how change language - paragraph"
                  defaultMessage={`To change the default language you can log into eduID and select your language 
                  preference in the Personal information area in eduID. The default language is based on the language 
                  setting that your browser uses. You can also change the displayed language in the footer of the 
                  webpage. Available options are Swedish and English.`}
                />
              </p>
              <h4>
                <FormattedMessage
                  description="how use other devices - heading"
                  defaultMessage="How can I login with other devices?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="how use other devices - paragraph"
                  defaultMessage={`You can also login using another device to login to eduID 
                  on the device you are currently using:`}
                />
              </p>
              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="use other devices - list item 1"
                    defaultMessage="select 'Other device' button in the login form,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="use other devices - list item 2"
                    defaultMessage={`scan the QR-code with the device where you have your login credentials, 
                    e.g. security key or saved password,`}
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="use other devices - list item 3"
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
                description="about security key - handle"
                defaultMessage="Improving the security level of eduID"
              />
            }
            additionalInfo={
              <FormattedMessage
                description="about security key - info"
                defaultMessage="Adding an MFA/2FA Security Key"
              />
            }
          >
            <article>
              <h4>
                <FormattedMessage
                  description="how more secure - heading"
                  defaultMessage="How do I make my eduID more secure?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="how more secure description 1"
                  defaultMessage={`Some services will require a higher security level and to improve the security of 
                  your eduID, in addition to knowledge of your username (confirmed email address) and password 
                  combination, you can use another layer of authentication to log in. This is called multi-Factor 
                  authentication (MFA); and in eduID's case two-factor authentication (2FA).`}
                />
              </p>
              <p>
                <FormattedMessage
                  description="how more secure description 2"
                  defaultMessage={`Examples can be a physical device in your possession such as a USB security token, 
                  or biometric information such as fingerprint or face-recognition supported on the device you are 
                  using, and we refer to these techniques as a 'Security key'.`}
                />
              </p>
              <h4>
                <FormattedMessage
                  description="how add security key - heading"
                  defaultMessage="How do I implement 2FA with eduID?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="how add security key - paragraph 1"
                  defaultMessage={`When logged in you can add and confirm security keys of your choice (provided you 
                    have access to any of these methods) in the 'Advanced Settings' area of eduID and follow the instructions.`}
                />
              </p>
              <p>
                <FormattedMessage
                  description="how add security key - paragraph 2"
                  defaultMessage="Note: once you have added a security key to your eduID it must be used to log in."
                />
              </p>

              <Accordion allowMultipleExpanded allowZeroExpanded id="eduid-security">
                <AccordionItemTemplate
                  uuid="help-security-usb"
                  title={<FormattedMessage description="about usb key - handle" defaultMessage="About Security Keys" />}
                  additionalInfo={null}
                >
                  <article>
                    <h4>
                      <FormattedMessage
                        description="choosing usb key - heading"
                        defaultMessage="Choosing a Security Key"
                      />
                    </h4>
                    <p>
                      <FormattedMessage
                        description="choosing usb key - paragraph"
                        defaultMessage={`Not all security keys meet the necessary specifications to be used as a security key for eduID.`}
                      />
                    </p>
                    <p>
                      <FormattedMessage
                        description="choosing usb key - list definition"
                        defaultMessage="Check with the manufacturer or retailer that the product meets the following requirements:"
                      />
                    </p>

                    <ul className="bullets">
                      <li>
                        <FormattedMessage
                          description="usb key - list item 1"
                          defaultMessage={`Certified FIDO 2.0, you can read more at {Fido}.`}
                          values={{
                            Fido: (
                              <a className="text-link" href="https://fidoalliance.org/" target="_blank">
                                fidoalliance.org
                              </a>
                            ),
                          }}
                        />
                      </li>
                      <li>
                        <FormattedMessage
                          description="usb key - list item 2"
                          defaultMessage={`Releases a certificate issued by the manufacturer providing information about the device where used, as well as requiring the user physically present for the key to be used.`}
                        />
                      </li>
                    </ul>
                    <section>
                      <h5>
                        <FormattedMessage
                          description="usb key technical section - heading"
                          defaultMessage="Further technical information: "
                        />
                      </h5>
                      <ul className="bullets">
                        <li>
                          <FormattedMessage
                            description="usb key technical section - list item 1"
                            defaultMessage="The key must perform an attestation and exist in the metadata,"
                          />
                        </li>
                        <li>
                          <FormattedMessage
                            description="usb key technical section - list item 2"
                            defaultMessage="it must not contain any other status in the metadata than a few variants of: "
                          />
                          &nbsp;
                          <code>
                            <FormattedMessage
                              description="usb key technical section - list item 2 code"
                              defaultMessage='"fido certified"'
                            />
                          </code>
                          ,
                        </li>
                        <li>
                          <FormattedMessage
                            description="usb key technical section - list item 3"
                            defaultMessage="it must support any of the following user verification methods: "
                          />
                          &nbsp;
                          <code>
                            <FormattedMessage
                              description="usb key technical section - list item 3 code"
                              defaultMessage='"faceprint_internal", "passcode_external", "passcode_internal", "handprint_internal",
                  "pattern_internal", "voiceprint_internal", "fingerprint_internal", "eyeprint_internal"'
                            />
                          </code>
                          ,
                        </li>
                        <li>
                          <FormattedMessage
                            description="usb key technical section - list item 4"
                            defaultMessage="and must not support any other key protection than: "
                          />
                          &nbsp;
                          <code>
                            <FormattedMessage
                              description="usb key technical section - list item 4 code"
                              defaultMessage='"remote_handle", "hardware", "secure_element", "tee"'
                            />
                          </code>
                          .
                        </li>
                      </ul>
                    </section>
                  </article>
                </AccordionItemTemplate>
              </Accordion>
            </article>
          </AccordionItemTemplate>
          {/* security key list */}
          <AccordionItemTemplate
            uuid="security-key-list"
            title={
              <FormattedMessage
                defaultMessage="Currently valid physical Security Keys"
                description="Security keys list - heading"
              />
            }
            additionalInfo={null}
          >
            <article>
              <p>
                <FormattedMessage
                  defaultMessage={`This is a list of names of maker and models of external security keys that kan be used for eduID. The list is updated once a month`}
                  description="Security keys list - paragraph"
                />
              </p>
              <form>
                <fieldset className="key-update">
                  <div>
                    <label>
                      <FormattedMessage defaultMessage="Next update" description="Security keys list - paragraph" />
                    </label>
                    <time>{formattedNextUpdateDate}</time>
                  </div>
                </fieldset>
                <table className="keys">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Model</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvedSecurityKeys?.entries.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </form>
            </article>
          </AccordionItemTemplate>
          <AccordionItemTemplate
            uuid="help-verification"
            title={
              <FormattedMessage
                description="about verification of identity - handle"
                defaultMessage="Verification of Identity"
              />
            }
            additionalInfo={
              <FormattedMessage
                description="about verification of identity - info"
                defaultMessage="Levels and methods of verifying eduID for different user groups"
              />
            }
          >
            <article id="identity">
              <h4>
                <FormattedMessage
                  description="what are verification levels - heading"
                  defaultMessage="What are verification levels?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="what are verification levels - paragraph"
                  defaultMessage={`Service providers need to rely on organisations to manage their users credentials 
                  according to certain assurance levels (e.g. AL1-3), depending on the type of information accessible. 
                  The levels range from unconfirmed, to confirmed, to verified users also using MFA when logging in to 
                  the system.`}
                />
              </p>
            </article>
            <article>
              <h4>
                <FormattedMessage
                  description="which verification methods - heading"
                  defaultMessage="What are the methods of verification for eduID?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="which verification methods - paragraph"
                  defaultMessage={`The service is constantly being developed to better support the needs of our various 
                  users. At present the methods below are available, depending on your situation such as assurance 
                  level requirements, nationality and residence.`}
                />
              </p>
              <section>
                <p>
                  <strong>
                    <FormattedMessage
                      description="swedish nin - heading"
                      defaultMessage={`If you have a Swedish personal identity number or coordination number`}
                    />
                  </strong>
                  <FormattedMessage
                    description="verification methods - list definition"
                    defaultMessage=", verifying it can be done via:"
                  />
                </p>
                <ul className="bullets">
                  <li>
                    <em>
                      <FormattedMessage
                        description="swedish nin post - heading"
                        defaultMessage="post - for Swedish personal identity number holders:"
                      />
                    </em>
                    &nbsp;
                    <FormattedMessage
                      description="verification methods - list item 1"
                      defaultMessage={` the user receives a letter with a code sent to their home address as 
                      registered at Skatteverket (the Swedish Tax Agency), and instructions on how to complete the 
                      verification on eduid.se,`}
                    />
                  </li>
                  <li>
                    <em>
                      <FormattedMessage
                        description="swedish nin mobile - heading"
                        defaultMessage="mobile - for Swedish personal identity number holders:"
                      />
                    </em>
                    &nbsp;
                    <FormattedMessage
                      description="verification methods - list item 2"
                      defaultMessage={` the user receives a message sent to the phone number that is registered 
                      in the Swedish telephone register, and instructions on how to complete the verification on 
                      eduid.se,`}
                    />
                  </li>
                  <li>
                    <em>
                      <FormattedMessage
                        description="swedish nin freja - heading"
                        defaultMessage="Freja+ (digital ID-card) - for Swedish personal identity or coordination number holders:"
                      />
                    </em>
                    &nbsp;
                    <FormattedMessage
                      description="verification methods - list item 3"
                      defaultMessage={` the user will be directed to the Freja eID website to
                      use their service. If you don't have Freja+ you have to create it separately before you can
                      complete verification of your eduID. Read more about Freja+ below.`}
                    />
                  </li>
                  <li>
                    <em>
                      <FormattedMessage
                        description="swedish nin bankid - heading"
                        defaultMessage="BankID (electronic identification system) - for Swedish personal identity number holders:"
                      />
                    </em>
                    &nbsp;
                    <FormattedMessage
                      description="verification methods - list item 3"
                      defaultMessage={` the user will be asked to verify themself using their BankID service. If you don't have BankID you have to create it separately before you can
                      complete verification of your eduID. Read more about BankID below.`}
                    />
                  </li>
                </ul>
              </section>
              <section>
                <p>
                  <strong>
                    <FormattedMessage
                      description="method eidas - heading"
                      defaultMessage={`If you are an EU citizen and without a Swedish personal identity number`}
                    />
                  </strong>
                  <FormattedMessage
                    description="method eidas - paragraph"
                    defaultMessage={`, you could use 
                    {emphasis} to verify your identity. Read more about eIDAS below.`}
                    values={{
                      emphasis: <em>eIDAS</em>,
                    }}
                  />
                </p>
              </section>
              <section>
                <p>
                  <strong>
                    <FormattedMessage
                      description="method svipe - heading"
                      defaultMessage={`If you are not an EU citizen and without a Swedish personal identity number`}
                    />
                  </strong>
                  <FormattedMessage
                    description="method svipe - paragraph"
                    defaultMessage={`, you could use {emphasis} to verify your identity using your passport. 
                    Read more about Svipe iD below.`}
                    values={{
                      emphasis: <em>Svipe ID</em>,
                    }}
                  />
                </p>
              </section>
            </article>

            <Accordion allowMultipleExpanded allowZeroExpanded id="eduid-verification">
              <AccordionItemTemplate
                uuid="help-freja"
                title={<FormattedMessage description="about freja - handle" defaultMessage="About Freja+" />}
                additionalInfo={null}
              >
                <article>
                  <h4>
                    <FormattedMessage description="what is freja - heading" defaultMessage="What is Freja+?" />
                  </h4>
                  <p>
                    <FormattedMessage
                      description="what is freja - paragraph"
                      defaultMessage={`Freja+ is a digital ID-card (a verified Freja eID) free of charge, available to 
                      holders of a Swedish personal identification number or coordination number.`}
                    />
                  </p>
                  <p>
                    <FormattedMessage
                      description="use freja - list definition"
                      defaultMessage="How to use Freja+ with eduID:"
                    />
                  </p>

                  <ul className="bullets">
                    <li>
                      <FormattedMessage
                        description="use freja - list item 1"
                        defaultMessage={`install the {Freja}  on your mobile device (iOS or Android) and create a 
                        Freja+ account according to the instructions,`}
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
                        description="use freja - list item 2"
                        defaultMessage={`if you have a valid Swedish passport you can complete the verification of your 
                        account in the app using your device camera, or bring a valid ID (including drivers license or 
                          ID card) to the nearest ATG agent authorised to verify your identity,`}
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        description="use freja - list item 3"
                        defaultMessage={`log in to eduID and choose the 'Freja+ digital ID-card' option in the Identity area 
                        and follow the instructions.`}
                      />
                    </li>
                  </ul>

                  <h4>
                    <FormattedMessage
                      description="need visit atg agent for freja - heading"
                      defaultMessage="Do I need to visit an authorised ATG agent to create Freja+?"
                    />
                  </h4>
                  <p>
                    <FormattedMessage
                      description="need visit atg agent for freja - paragraph"
                      defaultMessage={`Only if you use another means of identification than a Swedish passport. 
                      On site, the agent can start the verification process by scanning a QR code in your 
                    app and follow the instructions in their terminal. You will be informed when you have passed the 
                    ID verification and will be able use your Freja+ with your eduID. It can take up to three hours for 
                    your Freja+ to be fully activated.`}
                    />
                  </p>

                  <h4>
                    <FormattedMessage
                      description="what if verification for freja fails - heading"
                      defaultMessage="What should I do if my identity verification for Freja+ fails?"
                    />
                  </h4>

                  <p>
                    <FormattedMessage
                      description="what if verification for freja fails - paragraph"
                      defaultMessage={`Reinstall the app, redo the registration and make sure that you have entered the 
                    correct expiration date as well as the correct reference number of the chosen form of 
                    ID and personal identity number or coordination number.`}
                    />
                  </p>
                </article>
              </AccordionItemTemplate>
              <AccordionItemTemplate
                uuid="help-bankid"
                title={<FormattedMessage description="about bankid - handle" defaultMessage="About BankID" />}
                additionalInfo={null}
              >
                <article>
                  <h4>
                    <FormattedMessage description="what is bankid - heading" defaultMessage="What is BankID?" />
                  </h4>
                  <p>
                    <FormattedMessage
                      description="what is bankid - paragraph"
                      defaultMessage={`BankID is a widely used electronic verification system, available to 
                      holders of a Swedish personal identification number, an approved Swedish ID document (e.g. passport, drivers license or ID card) and connected to a bank in Sweden.`}
                    />
                  </p>
                  <p>
                    <FormattedMessage
                      description="use bankid - list definition"
                      defaultMessage="How to use BankID with eduID:"
                    />
                  </p>

                  <ul className="bullets">
                    <li>
                      <FormattedMessage
                        description="use bankid - list item 1"
                        defaultMessage={`the BankID is obtained from your personal bank and installed on your device as an app or file. The process varies, so visit your bank's website and follow the instructions. You can read more about obtaining a BankID on {bankid}`}
                        values={{
                          bankid: (
                            <a
                              className="text-link"
                              href="https://www.bankid.com/en/privat/skaffa-bankid"
                              target="_blank"
                            >
                              the BankID website
                            </a>
                          ),
                        }}
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        description="use bankid - list item 2"
                        defaultMessage={`log in to eduID and choose the 'Electronic BankID' option in the Identity area 
                        and follow the instructions.`}
                      />
                    </li>
                  </ul>
                </article>
              </AccordionItemTemplate>
              <AccordionItemTemplate
                uuid="help-eidas"
                title={<FormattedMessage description="about eidas - handle" defaultMessage="About eIDAS" />}
                additionalInfo={null}
              >
                <article>
                  <h4>
                    <FormattedMessage description="what is eidas - heading" defaultMessage="What is eIDAS?" />
                  </h4>
                  <p>
                    <FormattedMessage
                      description="what is eidas - paragraph"
                      defaultMessage={`eIDAS is a federation of EU countries providing electronic identification to allow 
                    access to public authority systems for EU citizens, using their country's electronic ID.`}
                    />
                  </p>
                  <p>
                    <FormattedMessage
                      description="use eidas - list definition"
                      defaultMessage="How to use eIDAS with eduID:"
                    />
                  </p>
                  <ul className="bullets">
                    <li>
                      <FormattedMessage
                        description="use eidas - list item 1"
                        defaultMessage={`make sure you have an electronic ID from a connected country to have the possibility to 
                      authenticate yourself via eIDAS,`}
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        description="use eidas - list item 2"
                        defaultMessage={`to verify your identity in eduID, log in and choose the verification method for 
                      'EU-citizens' in the Identity area and follow the instructions.`}
                      />
                    </li>
                  </ul>
                  <p>
                    <FormattedMessage
                      description="eidas if personal number - paragraph"
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
                title={<FormattedMessage description="about svipe - handle" defaultMessage="About Svipe iD" />}
                additionalInfo={null}
              >
                <article id="svipe">
                  <h4>
                    <FormattedMessage description="what is svipe - heading" defaultMessage="What is Svipe iD?" />
                  </h4>
                  <p>
                    <FormattedMessage
                      description="what is svipe - paragraph 1"
                      defaultMessage={`Svipe iD is based on an identity verification platform using biometric documents 
                      from over 140 countries, e.g. passports and ID-cards, combined with the users mobile device 
                      face-recognition ability, to create a verified digital identity than can be used remotely.`}
                    />
                  </p>
                  <p>
                    <FormattedMessage
                      description="what is svipe - paragraph 2"
                      defaultMessage={`You can stay informed about the information that Svipe saves about you and your 
                      ID-document by reading their data privacy policy. In short, the information uploaded to the app 
                      from your ID-document is saved locally on your device, and the company Svipe does not have access to it.`}
                    />
                  </p>
                  <p>
                    <FormattedMessage
                      description="use svipe - list definition"
                      defaultMessage={`How to use Svipe iD with eduID:`}
                    />
                  </p>
                  <ul className="bullets">
                    <li>
                      <FormattedMessage
                        description="use svipe - list item 1"
                        defaultMessage={`to verify your eduID using Svipe you first need a Svipe account with a verified
                         profile supported by your ID-document, in the Svipe app available at App store for IOS, or 
                         Google Play for Android,`}
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        description="use svipe - list item 2"
                        defaultMessage={`login to eduID and scan the QR code produced by Svipe iD from the 'All other 
                        countries' section in the Identity area of eduID by following the instructions.`}
                      />
                    </li>
                  </ul>
                  <p>
                    <FormattedMessage
                      description="svipe if personal number - paragraph"
                      defaultMessage={`Note: Holders of Swedish personal identity numbers are advised to use that method instead.`}
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
                description="about orcid ladok - handle"
                defaultMessage="Connecting account with Orcid / Ladok"
              />
            }
            additionalInfo={null}
          >
            <article>
              <h4>
                <FormattedMessage description="what is orcid - heading" defaultMessage="What is ORCID?" />
              </h4>
              <p>
                <FormattedMessage
                  description="what is orcid - paragraph"
                  defaultMessage={`ORCID is integrated into many research-related services, such as systems used by 
                    publishers, funders and institutions. ORCID is an independent non-profit organisation that provides 
                    a persistent identifier – an ORCID iD – that distinguishes you from other researchers and a 
                    mechanism for linking your research outputs and activities to your ORCID iD.`}
                />
              </p>

              <p>
                <FormattedMessage
                  description="use orcid - list definition"
                  defaultMessage="How to link ORCID with eduID:"
                />
              </p>
              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="use orcid - list item 1"
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
                    description="use orcid - list item 2"
                    defaultMessage="click the 'Connect ORCID account' button in the Settings area of eduID,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="use orcid - list item 3"
                    defaultMessage="sign in to your ORCID account and grant 
                    eduID permission to receive your ORCID iD. This process ensures that the correct ORCID iD is 
                    connected to the correct eduID."
                  />
                </li>
              </ul>

              <h4>
                <FormattedMessage
                  description="how remove linked orcid - heading"
                  defaultMessage="How do I remove a linked ORCID from eduID?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="how remove linked orcid - paragraph"
                  defaultMessage={`If you do not longer want eduID to know your ORCID iD you can remove it by 
                    clicking the Remove button in your eduID.`}
                />
              </p>
            </article>
            <article>
              <h4>
                <FormattedMessage description="what is ladok - heading" defaultMessage="What is Ladok?" />
              </h4>
              <p>
                <FormattedMessage
                  description="what is ladok - paragraph"
                  defaultMessage={`Ladok is a student administration system used in all Swedish higher education 
                  institutions for registration and grading. A couple of schools have chosen to let eduID release the
                  
                  ESI attribute, used for instance when applying to a Erasmus exchange student program.`}
                />
              </p>

              <p>
                <FormattedMessage
                  description="use ladok - list definition"
                  defaultMessage="How to link Ladok with eduID:"
                />
              </p>

              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="use ladok - list item 1"
                    defaultMessage="in the Settings area of eduID, toggle the Ladok control,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="use ladok - list item 2"
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
                description="about privacy accessibility - handle"
                defaultMessage="Privacy policy and Web accessibility"
              />
            }
            additionalInfo={null}
          >
            <article>
              <h4>
                <FormattedMessage
                  description="what is privacy policy - heading"
                  defaultMessage="What is eduIDs Privacy policy?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="what is privacy policy - paragraph"
                  defaultMessage={`Read the full {privacy} regarding use of eduID at the Sunet website, where you also 
                  find contact information to our Dataskyddsombud and Integritetsskyddsmyndigheten (in Swedish).`}
                  values={{
                    privacy: (
                      <a
                        className="text-link"
                        href="https://sunet.se/om-sunet/behandling-av-personuppgifter-i-eduid"
                        target="_blank"
                      >
                        <FormattedMessage description="privacy policy - link" defaultMessage="Privacy policy" />
                      </a>
                    ),
                  }}
                />
              </p>
              <p>
                <FormattedMessage
                  description="privacy policy - list definition"
                  defaultMessage="Summary of how eduID treats your information according to the policy:"
                />
              </p>
              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="privacy policy - list item 1"
                    defaultMessage="stores information that you have provided as well as updates from trusted registers,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="privacy policy - list item 2"
                    defaultMessage="transfers information according to the data minimisation principle - never more than required,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="privacy policy - list item 3"
                    defaultMessage="uses the information to identify the individual for services you have chosen to use,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="privacy policy - list item 4"
                    defaultMessage="protects and stores the information securely,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="privacy policy - list item 5"
                    defaultMessage="develops using open source code accessible at GitHub,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="privacy policy - list item 6"
                    defaultMessage="enables removal of eduID and connections directly in the service,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="privacy policy - list item 7"
                    defaultMessage="stores log files recording use for 6 months,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="privacy policy - list item 8"
                    defaultMessage="retains inactive accounts for a maximum of 2 years,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="privacy policy - list item 9"
                    defaultMessage="only uses necessary functional cookies."
                  />
                </li>
              </ul>
            </article>
            <article>
              <h4>
                <FormattedMessage
                  description="what is accessibility report - heading"
                  defaultMessage="What is eduIDs Accessibility report?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="what is accessibility report - paragraph 1"
                  defaultMessage={`Read the full {accessibility} regarding the eduID site at Sunets website, where you 
                  also find instructions on how to report accessibility issues. The report addresses how eduID adheres 
                  to the Swedish law governing accessibility to digital public services as well as currently known 
                  issues of the site (in Swedish).`}
                  values={{
                    accessibility: (
                      <a
                        className="text-link"
                        href="https://sunet.se/om-sunet/tillganglighet-for-eduid-se"
                        target="_blank"
                      >
                        <FormattedMessage
                          description="accessibility report - link"
                          defaultMessage="Accessibility report"
                        />
                      </a>
                    ),
                  }}
                />
              </p>
              <p>
                <FormattedMessage
                  description="what is accessibility report - paragraph 2"
                  defaultMessage={`It is of outmost importance to us that as many as possible are able to use the 
                  service in a convenient and safe manner and is one of the many ways eduID is always striving to improve.`}
                />
              </p>
            </article>
          </AccordionItemTemplate>
          <AccordionItemTemplate
            uuid="help-about-sunet"
            title={<FormattedMessage description="about sunet - handle" defaultMessage="About SUNET" />}
            additionalInfo={null}
          >
            <article>
              <h4>
                <FormattedMessage description="what is sunet - heading" defaultMessage="What is SUNET?" />
              </h4>
              <p>
                <FormattedMessage
                  description="what is sunet - paragraph 1"
                  defaultMessage={`eduID is a service provided by SUNET - the Swedish University Computer Network, 
                  which is governed by the Swedish Research Council (Vetenskapsrådet). SUNET delivers data communication 
                  networks and many other related services to public organisations and higher education and research institutions.`}
                />
              </p>
              <p>
                <FormattedMessage
                  description="what is sunet - paragraph 2"
                  defaultMessage={`SUNET developed eduID to provide a secure common routine for managing identity in the 
                  higher education community, with adequate authorization levels of confirmed accounts. 
                  More information about SUNET is available at {sunet}.`}
                  values={{
                    sunet: (
                      <a className="text-link" href="https://www.sunet.se" target="_blank">
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
            title={
              <FormattedMessage
                description="about contact support - handle"
                defaultMessage="Contacting eduID support"
              />
            }
            additionalInfo={null}
          >
            <article>
              <h4>
                <FormattedMessage
                  description="how to contact support - heading"
                  defaultMessage="How to contact eduID support?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="how to contact support - paragraph 1"
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
                  description="how to contact support - paragraph 2"
                  defaultMessage={`Always let us know the e-mail address you used when you logged in to eduID, and if 
                  you are logged in include your unique id ‘eppn’ in the Settings area.  
                  If something went wrong, it is always a good idea to include screenshots with error messages to 
                  ease troubleshooting.`}
                />
              </p>
              <p>
                <strong>
                  <FormattedMessage
                    description="how to contact support email - strong"
                    defaultMessage={`In order to get best possible support, we recommend that you send e-mail`}
                  />
                </strong>
                <FormattedMessage
                  description="how to contact support - paragraph 3"
                  defaultMessage=", but for simple
              matters you can also reach us on phone number {phone}."
                  values={{
                    phone: (
                      <a className="text-link" href="tel:+46455-385200">
                        0455-385200
                      </a>
                    ),
                  }}
                />
              </p>
              <p>
                <FormattedMessage description="opening hours - list definition" defaultMessage="Opening hours:" />
              </p>
              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="opening hours - list item 1"
                    defaultMessage="Monday-Thursday 09:00-12:00, 13:00-16:00"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="opening hours - list item 2"
                    defaultMessage="Friday 9:00-12:00, 13:00-14:30"
                  />
                </li>
              </ul>
              {/* <p>
                <strong>
                  <FormattedMessage
                    description="opening hours - differing paragraph"
                    defaultMessage="Note: During December 25th - January 5th (weeks 52-1) the regular phone support hours are 09:00-12:00, 13:00-14:30."
                  />
                </strong>
              </p> */}
            </article>
          </AccordionItemTemplate>
        </Accordion>
      </div>
      <ScrollToTopButton />
    </React.Fragment>
  );
}
