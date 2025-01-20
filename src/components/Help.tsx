import { fetchApprovedSecurityKeys } from "apis/eduidSecurity";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useEffect, useState } from "react";
import { Accordion } from "react-accessible-accordion";
import { FormattedMessage, useIntl } from "react-intl";
import AccordionItemTemplate from "./Common/AccordionItemTemplate";
import { CommonToU } from "./Common/CommonToU";
import ScrollToTopButton from "./ScrollToTopButton";

interface ApprovedSecurityKeysTypes {
  entries: [];
  next_update: Date;
}

export function Help(): JSX.Element {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const is_configured = useAppSelector((state) => state.config.is_configured);
  const signup_link = useAppSelector((state) => state.config.signup_link);
  const dashboard_link = useAppSelector((state) => state.config.dashboard_link);

  const locale = useAppSelector((state) => state.intl.locale);

  const [approvedSecurityKeys, setApprovedSecurityKeys] = useState<ApprovedSecurityKeysTypes>();

  const FrejaAppURL =
    locale === "en" ? "https://frejaeid.com/en/get-freja-eid/" : "https://frejaeid.com/skaffa-freja-eid/";
  const BankIdURL =
    locale === "en" ? "https://www.bankid.com/en/privat/skaffa-bankid" : "https://www.bankid.com/privat/skaffa-bankid";
  const FrejaeIdURL =
    locale === "en"
      ? "https://org.frejaeid.com/en/an-e-id-for-foreign-citizens/"
      : "https://org.frejaeid.com/en-e-legitimation-for-utlandska-medborgare/";
  const UniversityAdmissionURL =
    locale === "en" ? "https://www.universityadmissions.se/intl/start" : "https://www.antagning.se";

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Help",
      defaultMessage: "Help | eduID",
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
        <Accordion allowMultipleExpanded allowZeroExpanded id="eduid-help">
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
                    identification of users is elevated to that of confirmed users. You can read more about these requirements in the Assurance levels help section.`}
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
                  mainly use your eduID account to create and access other accounts, such as your student account or e.g. {link}.
                 `}
                  values={{
                    link: (
                      <a className="text-link" href={UniversityAdmissionURL} target="_blank">
                        <FormattedMessage
                          description="universityadmissions - link text"
                          defaultMessage="universityadmissions.se"
                        />
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
                    defaultMessage="lose a student account password and need to regain access,"
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="when use eduID - list item 5"
                    defaultMessage="administrate students taking the Digital national exam."
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
                defaultMessage="Create, login and account settings"
              />
            }
          >
            <h4>
              <FormattedMessage description="create eduid - heading" defaultMessage="How do I get an account?" />
            </h4>
            <Accordion allowMultipleExpanded allowZeroExpanded id="eduid-create">
              <AccordionItemTemplate
                uuid="help-create"
                title={<FormattedMessage description="how create eduid - handle" defaultMessage="Create an eduID" />}
                additionalInfo={null}
              >
                <p>
                  <FormattedMessage
                    description="create eduid - list definition"
                    defaultMessage={"How to register your new eduID account at {eduidRegisterLink}:"}
                    values={{
                      eduidRegisterLink: (
                        <a className="text-link" href={signup_link} target="_blank">
                          eduid.se/register
                        </a>
                      ),
                    }}
                  />
                </p>
                <ol className="numbers">
                  <li>
                    <FormattedMessage
                      description="create eduid - list item 1"
                      defaultMessage="enter your first name, last name and email address in the form and press the ”Create eduID” button,"
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="create eduid - list item 2"
                      defaultMessage="confirm that you are human using CAPTCHA by entering the displayed/read out code and press the ”Continue” button,"
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="create eduid - list item 3"
                      defaultMessage="read and approve the eduID terms of use by pressing the ”I Accept” button,"
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="create eduid - list item 4"
                      defaultMessage="verify your email address by entering the code emailed to you in the website form and press the ”Ok” button,"
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="create eduid - list item 5"
                      defaultMessage="choose using the radio buttons between a suggested (automatically generated) password or one you create,"
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="create eduid - list item 6"
                      defaultMessage={`when validated for strength, repeat the password in the corresponding field and press the ”Save” button,`}
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="create eduid - list item 7"
                      defaultMessage={`take careful note of your login details (used email address and password)! `}
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="create eduid - list item 8"
                      defaultMessage={`You can now log in with your eduID. `}
                    />
                  </li>
                </ol>
              </AccordionItemTemplate>
            </Accordion>

            <h4>
              <FormattedMessage description="login eduid - heading" defaultMessage="How do I log in with my account?" />
            </h4>
            <Accordion allowMultipleExpanded allowZeroExpanded id="eduid-login">
              <AccordionItemTemplate
                uuid="help-login"
                title={<FormattedMessage description="login eduid - handle" defaultMessage="Log in with eduID" />}
                additionalInfo={null}
              >
                <article>
                  <h5>
                    <FormattedMessage
                      description="login eduid - username heading"
                      defaultMessage={`With username and password`}
                    />
                  </h5>
                  <p>
                    <FormattedMessage
                      description="login eduid - username list definition"
                      defaultMessage={`If you have an eduID account, enter your credentials in the form at {eduidLoginLink} and press the button "Log in". Your username can be:`}
                      values={{
                        eduidLoginLink: (
                          <a className="text-link" href={dashboard_link} target="_blank">
                            eduid.se
                          </a>
                        ),
                      }}
                    />
                  </p>
                  <ul className="bullets">
                    <li>
                      <FormattedMessage
                        description="login eduid - username list item 1"
                        defaultMessage={`any email address you have entered and confirmed in eduID under Account,`}
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        description="login eduid - username list item 2"
                        defaultMessage="your unique ID, shown on the logged in start page and under Account."
                      />
                    </li>
                  </ul>
                </article>
                <article>
                  <h5>
                    <FormattedMessage
                      description="login eduid - remember me heading"
                      defaultMessage={`With saved credentials`}
                    />
                  </h5>
                  <p>
                    <FormattedMessage
                      description="login eduid - remember me paragraph"
                      defaultMessage={`Underneath the login form there is a toggle control called "Remember me on this device". 
                    If this is switched on the web browser will attempt to fill in your username and hidden password in the form. For a different account or on a shared device, set this to off.`}
                    />
                  </p>
                </article>
                <article>
                  <h5>
                    <FormattedMessage
                      description="login eduid - other device heading"
                      defaultMessage={`With another device`}
                    />
                  </h5>
                  <p>
                    <FormattedMessage
                      description="login eduid - other device list definition"
                      defaultMessage={`Use your credentials from another device than you wish to access eduID with:`}
                    />
                  </p>
                  <ol className="numbers">
                    <li>
                      <FormattedMessage
                        description="login eduid - other devices list item 1"
                        defaultMessage={`press the "Other device" button in the login form,`}
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        description="login eduid - other devices list item 2"
                        defaultMessage={`scan the presented QR-code with the other device where you have your login credentials, 
                    e.g. security key or saved password,`}
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        description="login eduid - other devices list item 3"
                        defaultMessage={`on that second device, review the device requesting to be logged in and use the 
                    presented code to login by entering it within the time shown, in the first device.`}
                      />
                    </li>
                  </ol>
                </article>
                <article>
                  <h5>
                    <FormattedMessage
                      description="login eduid - security key heading"
                      defaultMessage={`With security key`}
                    />
                  </h5>
                  <p>
                    <FormattedMessage
                      description="login eduid - security key list definition"
                      defaultMessage={`If you have added a security key for authentication under Security, it will be requested after the initial login form in an additional Security step:
                    `}
                    />
                  </p>
                  <ul className="bullets">
                    <li>
                      <FormattedMessage
                        description="login eduid - security key list item 1"
                        defaultMessage={`Press the "Use my security key" button and follow the instructions, which will vary depending on your key.`}
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        description="login eduid - security key list item 2"
                        defaultMessage={`Added security alternatives are listed in the "Other options" dropdown below the security key button, such as BankID and Freja+. `}
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        description="login eduid - security key list item 3"
                        defaultMessage={`If you don't wish to use a security key to log in unless required, set the "Always use a second factor (2FA) to log in to eduID" toggle control under Security to off.`}
                      />
                    </li>
                  </ul>
                  <p>
                    <FormattedMessage
                      description="login eduid - security key paragraph"
                      defaultMessage={`Note: you can read more about security keys in the "Enhancing the security level of eduID" help section."`}
                    />
                  </p>
                </article>
              </AccordionItemTemplate>
              <AccordionItemTemplate
                uuid="help-pw"
                title={
                  <FormattedMessage
                    description="login eduid - forgot pw handle"
                    defaultMessage="Regain access if forgotten password"
                  />
                }
                additionalInfo={null}
              >
                <ol className="numbers">
                  <li>
                    <FormattedMessage
                      description="login eduid - forgot pw list item 1"
                      defaultMessage={`press the "Forgot your password?" link below the login form,`}
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="login eduid - forgot pw list item 2"
                      defaultMessage={`press the "Send email" button to receive a code to the email address presented on the page,`}
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="login eduid - forgot pw list item 3"
                      defaultMessage={`follow the instructions in the email within 2 hours. The steps to verify your email address and selecting a new password are the same as when you created your eduID.`}
                    />
                  </li>
                </ol>
                <p>
                  <FormattedMessage
                    description="login eduid - forgot pw paragraph"
                    defaultMessage={`Note: depending on your previous settings you might need to re-verify your identity in eduID.`}
                  />
                </p>
              </AccordionItemTemplate>
              <AccordionItemTemplate
                uuid="help-relogin"
                title={
                  <FormattedMessage
                    description="login eduID - re-login handle"
                    defaultMessage="I'm already logged in, why do I need to log in again?"
                  />
                }
                additionalInfo={null}
              >
                <p>
                  <FormattedMessage
                    description="login eduID - re-login paragraph"
                    defaultMessage="In some situations that require added security you will be asked to log in again (with your security key if you are using one), if more than 5 minutes have passed since you logged in, e.g: "
                  />
                </p>
                <ul className="bullets">
                  <li>
                    <FormattedMessage
                      description="login eduid - re-login list item 1"
                      defaultMessage="changing your password,"
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="login eduid - re-login list item 2"
                      defaultMessage="toggling 2FA login requirement setting,"
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="login eduid - re-login list item 3"
                      defaultMessage="deleting your eduID account,"
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="login eduid - re-login list item 4"
                      defaultMessage="adding/removing a security key,"
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="login eduid - re-login list item 5"
                      defaultMessage="deleting your verified identity."
                    />
                  </li>
                </ul>
              </AccordionItemTemplate>
            </Accordion>

            <article>
              <h4>
                <FormattedMessage description="settings eduid - heading" defaultMessage="How do I update my account?" />
              </h4>
              <p>
                <FormattedMessage
                  description="settings eduid - intro definition"
                  defaultMessage={`When you log in to eduid.se the various settings are grouped into 4 views; Start, Identity, Security and Account, 
                    accessible from the drop down menu in the header by clicking on your username. Read more about the possible actions of each page below.`}
                />
              </p>
              <Accordion allowMultipleExpanded allowZeroExpanded id="eduid-settings">
                <AccordionItemTemplate
                  uuid="help-start"
                  title={<FormattedMessage description="settings eduid - start handle" defaultMessage="Start" />}
                  additionalInfo={null}
                >
                  <p>
                    <FormattedMessage
                      description="start eduid - list definition"
                      defaultMessage={`The Start page contains:`}
                    />
                  </p>
                  <ul className="bullets">
                    <li>
                      <FormattedMessage description="start eduid - list item 1" defaultMessage={`your name,`} />
                    </li>
                    <li>
                      <FormattedMessage
                        description="start eduid - list item 2"
                        defaultMessage={`your unique user ID,`}
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        description="start eduid - list item 3"
                        defaultMessage={`an overview of the status of your eduID with links to where it can be addressed in the site. These tasks strengthen and increase the use of your eduID:
                          `}
                      />
                      <ul className="nested">
                        <li>
                          <FormattedMessage
                            description="start eduid - list item 3-1"
                            defaultMessage={`confirmed account (confirmed email address and accepted terms of use),
                          `}
                          />
                        </li>
                        <li>
                          <FormattedMessage
                            description="start eduid - list item 3-2"
                            defaultMessage={`real identity verified,
                          `}
                          />
                        </li>
                        <li>
                          <FormattedMessage
                            description="start eduid - list item 3-3"
                            defaultMessage={`enhanced security (added a method used for multi factor login),
                          `}
                          />
                        </li>
                        <li>
                          <FormattedMessage
                            description="start eduid - list item 3-4"
                            defaultMessage={`a verified security key (bound your verified identity to your multi factor login).
                          `}
                          />
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <p>
                    <FormattedMessage
                      description="start eduid - paragraph"
                      defaultMessage={`Note: You can read about how the status correlates to connecting services in the help section "Assurance levels".`}
                    />
                  </p>
                </AccordionItemTemplate>
                <AccordionItemTemplate
                  uuid="help-identity"
                  title={<FormattedMessage description="settings eduid - identity handle" defaultMessage="Identity" />}
                  additionalInfo={null}
                >
                  <p>
                    <FormattedMessage
                      description="identity eduid - list definition"
                      defaultMessage={`The Identity page contains:`}
                    />
                  </p>
                  <ul className="bullets">
                    <li>
                      <FormattedMessage
                        description="identity eduid - list item 1"
                        defaultMessage={`A table presenting your verified identities if you have any,`}
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        description="identity eduid - list item 2"
                        defaultMessage={`options for identity verification if your real identity is not verified, or if your existing verification is not with a Swedish ID- or coordination number, depending on your situation:`}
                      />
                      <ul className="nested">
                        <li>
                          <FormattedMessage
                            description="identity eduid - list item 2-1"
                            defaultMessage={`with Swedish digital ID (Freja+/BankID) or by post,
                          `}
                          />
                        </li>
                        <li>
                          <FormattedMessage
                            description="identity eduid - list item 2-2"
                            defaultMessage={`with eIDAS electronic identification for EU citizens,
                          `}
                          />
                        </li>
                        <li>
                          <FormattedMessage
                            description="identity eduid - list item 2-3"
                            defaultMessage={`Freja eID for most nationalities.
                          `}
                          />
                        </li>
                      </ul>
                      <p>
                        <FormattedMessage
                          description="start eduid - paragraph"
                          defaultMessage={`Note: You can read more about these methods in the help section "Verification of identity".`}
                        />
                      </p>
                    </li>
                    <li>
                      <FormattedMessage
                        description="identity eduid - list item 3"
                        defaultMessage={`A form for updating name and display name by clicking on the link "edit", where available settings are dependant on wether your identity is verified.`}
                      />
                    </li>
                  </ul>
                </AccordionItemTemplate>{" "}
                <AccordionItemTemplate
                  uuid="help-security"
                  title={<FormattedMessage description="settings eduid - security handle" defaultMessage="Security" />}
                  additionalInfo={null}
                >
                  <p>
                    <FormattedMessage
                      description="security eduid - list definition"
                      defaultMessage={`The Security page contains:`}
                    />
                  </p>
                  <ul className="bullets">
                    <li>
                      <FormattedMessage
                        description="security eduid - list item 1"
                        defaultMessage={`Buttons to add Two-factor authentication to increase the security of your eduID by adding a layer 
                            called a security key to your login process besides password. By also verifying the security key it is bound to your identity, increasing the assurance level of your account.
                            You can add as many as you wish and depending on your device (computer, mobile, operating system etc.), the options to add a security key include:`}
                      />
                      <ul className="nested">
                        <li>
                          <FormattedMessage
                            description="security eduid - list item 1-1"
                            defaultMessage={`This device: built in passkeys including your biometrics,
                          `}
                          />
                        </li>
                        <li>
                          <FormattedMessage
                            description="security eduid - list item 1-2"
                            defaultMessage={`Security key: external device such as your USB security key,
                          `}
                          />
                        </li>
                      </ul>
                    </li>
                    <li>
                      <FormattedMessage
                        description="security eduid - list item 2"
                        defaultMessage={`Under "Manage your security keys" is a toggle control marked "Always use a second factor (2FA) to log in to eduID"
                           which can let you log in with your eduID account without using your added security key when allowed. Default setting is on.
                          `}
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        description="security eduid - list item 3"
                        defaultMessage={`A table displaying all your added security keys with the following information: 
                          `}
                      />
                      <ul className="nested">
                        <li>
                          <FormattedMessage
                            description="security eduid - list item 3-1"
                            defaultMessage={`the descriptive name given by you when created,
                          `}
                          />
                        </li>
                        <li>
                          <FormattedMessage
                            description="security eduid - list item 3-2"
                            defaultMessage={`dates of creation and latest use,
                          `}
                          />
                        </li>
                        <li>
                          <FormattedMessage
                            description="security eduid - list item 3-3"
                            defaultMessage={`verification status / verification options (Freja+/BankID),
                          `}
                          />
                        </li>
                        <li>
                          <FormattedMessage
                            description="security eduid - list item 3-4"
                            defaultMessage={`a bin icon which deletes the key when clicked.
                          `}
                          />
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <p>
                    <FormattedMessage
                      description="security eduid - paragraph"
                      defaultMessage={`Note: You can read more about security keys in the help section "Enhancing the security level of eduID".`}
                    />
                  </p>
                </AccordionItemTemplate>
                {/*
                <AccordionItemTemplate
                  uuid="help-Account"
                  title={<FormattedMessage description="settings eduid - account handle" defaultMessage="Account" />}
                  additionalInfo={null}
                >
                  <p>
                    <FormattedMessage
                      description="account eduid - list definition"
                      defaultMessage={`The Account page contains:`}
                    />
                  </p>
                  <ul className="bullets">
                    <li>
                      <em>
                        <FormattedMessage
                          description="account eduid - list item 1"
                          defaultMessage={`Content in progress.`}
                        />
                      </em>
                    </li>
                  </ul>
                </AccordionItemTemplate> */}
              </Accordion>
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
                  description="settings eduid - language heading"
                  defaultMessage="How do I change the default language in eduID?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="settings eduid - language paragraph"
                  defaultMessage={`The default language is based on the language 
                  setting that your browser uses. Available options are Swedish and English.`}
                />
              </p>
              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="settings eduid - re-login list item 1"
                    defaultMessage="To change the default language for eduID you can log in to eduID and select your 
                  preference using the Language radio buttons under Account. "
                  />
                </li>
                <li>
                  <FormattedMessage
                    description="settings eduid - re-login list item 2"
                    defaultMessage="You can also change the language for the displayed page in the footer of the 
                  webpage."
                  />
                </li>
              </ul>
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
                defaultMessage="Methods of verifying eduID for different user groups"
              />
            }
          >
            <article>
              <h4>
                <FormattedMessage
                  description="which verification methods - heading"
                  defaultMessage="What are the methods of verification for eduID?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="which verification methods - paragraph1"
                  defaultMessage={`The service is constantly being developed to better support the needs of our various 
                  users. At present the methods below are available, depending on your situation such as assurance 
                  level requirements, nationality and residence.`}
                />
              </p>
              <p>
                <FormattedMessage
                  description="which verification methods - paragraph2"
                  defaultMessage={`Note: you can remove a verified identity connected to your eduID in the Identity area.`}
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
                        description="swedish nin freja - heading"
                        defaultMessage="Freja+ (digital ID-card) - for Swedish personal identity or coordination number holders:"
                      />
                    </em>
                    &nbsp;
                    <FormattedMessage
                      description="verification methods - list item 3"
                      defaultMessage={` the user will be directed to the Freja eID website to
                      use their service. If you don't have Freja+ you have to create it separately before you can
                      complete verification of your eduID. Read more about Freja below.`}
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
                      description="method international - heading"
                      defaultMessage={`If you are not an EU citizen and without a Swedish personal identity number`}
                    />
                  </strong>
                  <FormattedMessage
                    description="method international - paragraph"
                    defaultMessage={`, you could use {emphasis} to verify your identity using your passport. 
                    Read more about Freja below.`}
                    values={{
                      emphasis: <em>Freja</em>,
                    }}
                  />
                </p>
                <p className="error-txt">
                  <FormattedMessage
                    description="freja - error"
                    defaultMessage={`Note: not all nationalities are yet supported by this solution but the work to substantially increase the range is in progress.`}
                  />
                </p>
              </section>
            </article>

            <Accordion allowMultipleExpanded allowZeroExpanded id="eduid-verification">
              <AccordionItemTemplate
                uuid="help-freja"
                title={
                  <FormattedMessage
                    description="about freja - handle"
                    defaultMessage="About Freja (with Swedish ID/COORD number)"
                  />
                }
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
                            <a className="text-link" href={FrejaAppURL} target="_blank">
                              <FormattedMessage description="use freja - link text" defaultMessage={`Freja app`} />
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
                        defaultMessage={`the BankID is obtained from your personal bank and installed on your device as an app or file. The process varies, so visit your bank's website and follow the instructions. You can read more about obtaining a BankID on {bankid},`}
                        values={{
                          bankid: (
                            <a className="text-link" href={BankIdURL} target="_blank">
                              BankID.com
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
                      simplify communication with Swedish authorities. Note: if you initially verify your identity with 
                      eIDAS and later receive a Swedish personal identity number you can add it in eduID and verify 
                      yourself again using it in the Identity area.`}
                    />
                  </p>
                </article>
              </AccordionItemTemplate>
              <AccordionItemTemplate
                uuid="help-international"
                title={
                  <FormattedMessage
                    description="about international - handle"
                    defaultMessage="About Freja (outside EU and without Swedish ID/COORD number)"
                  />
                }
                additionalInfo={null}
              >
                <article id="international">
                  <h4>
                    <FormattedMessage description="what is international - heading" defaultMessage="What is Freja?" />
                  </h4>
                  <p>
                    <FormattedMessage
                      description="what is international - paragraph 1"
                      defaultMessage={`Freja is an eID based on an identity verification platform using biometric passports, combined with the users mobile device to create a verified digital identity than can be used remotely.`}
                    />
                  </p>

                  <p>
                    <FormattedMessage
                      description="what is international - paragraph 2"
                      defaultMessage={`Current information on included nationalities can be found at: {FrejaList}`}
                      values={{
                        FrejaList: (
                          <a className="text-link" href={FrejaeIdURL} target="_blank">
                            Freja eID
                          </a>
                        ),
                      }}
                    />
                  </p>

                  <p>
                    <FormattedMessage
                      description="use international - list definition"
                      defaultMessage={`How to use Freja with eduID:`}
                    />
                  </p>
                  <ul className="bullets">
                    <li>
                      <FormattedMessage
                        description="use international - list item 1"
                        defaultMessage={`to verify your eduID using Freja you first need to get a Freja account with a verified
                         profile supported by your passport, by installing the {FrejaApp} on your mobile device (iOS or Android) and following the instructions,`}
                        values={{
                          FrejaApp: (
                            <a className="text-link" href={FrejaAppURL} target="_blank">
                              <FormattedMessage description="use freja - link text" defaultMessage={`Freja app`} />
                            </a>
                          ),
                        }}
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        description="use international - list item 2"
                        defaultMessage={`login to eduID and scan the QR code produced by Freja from the 'Other 
                        countries' section in the Identity area of eduID by following the instructions.`}
                      />
                    </li>
                  </ul>
                  <p>
                    <FormattedMessage
                      description="international if personal number - paragraph"
                      defaultMessage={`Note: holders of Swedish personal identity numbers or EU citizens are advised to use those supported methods instead.`}
                    />
                  </p>
                </article>
              </AccordionItemTemplate>
            </Accordion>
          </AccordionItemTemplate>

          <AccordionItemTemplate
            uuid="help-security-key"
            title={
              <FormattedMessage
                description="about security key - handle"
                defaultMessage="Enhancing the security level of eduID"
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
                  defaultMessage="Note: if you have added a security key to your eduID it must be used to log in to eduID, unless you turn off this feature under Two-factor Authentication (2FA) in Advanced settings. You might still need to use your security key if other connecting services require 2FA."
                />
              </p>
              <h4>
                <FormattedMessage
                  description="which type of security key - heading"
                  defaultMessage="Which type of security key can I use with eduID?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="which type of security key - paragraph"
                  defaultMessage={`We follow a standard as well as our own policy for which security keys are allowed to be used with the service. More information on the standard as well as an updated list of valid keys can be found below.`}
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
              {/* security key list */}
              {approvedSecurityKeys?.entries ? (
                <Accordion allowMultipleExpanded allowZeroExpanded id="eduid-security-keys-list">
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
                          defaultMessage={`This is a list of names of maker and models of external security keys that kan be used for eduID at present:`}
                          description="Security keys list - paragraph"
                        />
                      </p>
                      <form>
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
                </Accordion>
              ) : null}
            </article>
          </AccordionItemTemplate>

          <AccordionItemTemplate
            uuid="help-assurance-levels"
            title={<FormattedMessage description="about assurance levels - handle" defaultMessage="Assurance levels" />}
            additionalInfo={
              <FormattedMessage description="about assurance levels - info" defaultMessage="AL, LOA etc." />
            }
          >
            <article>
              <h4>
                <FormattedMessage
                  description="what are assurance levels - heading"
                  defaultMessage="What are assurance levels?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="what are assurance levels - paragraph"
                  defaultMessage={`Service providers need to rely on organisations to manage their users credentials according to certain assurance levels set by relevant authorities, depending on the type of information accessible. The levels range from unconfirmed, to confirmed, to verified users with additional authentication when logging in to a system.`}
                />
              </p>
              <h4>
                <FormattedMessage
                  description="At what level is your eduID - heading"
                  defaultMessage="At what level is your eduID?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="Assurance levels with your eduID - paragraph1"
                  defaultMessage={`At the logged in start page an overview of the status of your eduID is presented. This is what it typically indicates regarding your assurance level and the services you may authenticate against:`}
                />
              </p>

              <strong>
                <FormattedMessage
                  description="Assurance levels with your eduID - paragraph2strong"
                  defaultMessage={`Confirmed account:
`}
                />
              </strong>
              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="Assurance levels with your eduID - paragraph2"
                    defaultMessage={`services requiring a low level of assurance, often called {emphasis}.
`}
                    values={{
                      emphasis: <em>AL1 / RAF Low</em>,
                    }}
                  />
                </li>
              </ul>
              <strong>
                <FormattedMessage
                  description="Assurance levels with your eduID - paragraph3strong"
                  defaultMessage={`Verified identity:
`}
                />
              </strong>
              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="Assurance levels with your eduID - paragraph3"
                    defaultMessage={`services requiring a medium level of assurance, including many higher education institutions, often called {emphasis}.
`}
                    values={{
                      emphasis: <em>AL2 / RAF Medium</em>,
                    }}
                  />
                </li>
              </ul>

              <strong>
                <FormattedMessage
                  description="Assurance levels with your eduID - paragraph4strong"
                  defaultMessage={`Enhanced security:
`}
                />
              </strong>
              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="Assurance levels with your eduID - paragraph4"
                    defaultMessage={`services requiring you to log in using multi factor authentication, often called {emphasis}. 

`}
                    values={{
                      emphasis: <em>REFEDS MFA</em>,
                    }}
                  />
                </li>
              </ul>

              <strong>
                <FormattedMessage
                  description="Assurance levels with your eduID - paragraph5strong"
                  defaultMessage={`Verified security key:
`}
                />
              </strong>
              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="Assurance levels with your eduID - paragraph5"
                    defaultMessage={`services requiring a strong binding between your identity and your login, often called {emphasis}.
 

`}
                    values={{
                      emphasis: <em>AL3 / RAF High / LoA2</em>,
                    }}
                  />
                </li>
              </ul>

              <p>
                <FormattedMessage
                  description="Assurance levels with your eduID - paragraph7"
                  defaultMessage={`Note: this is a generalization and could change, complete information as to what is required of your eduID must be provided by the connecting services.

`}
                />
              </p>
              <p>
                <FormattedMessage
                  description="Assurance levels with your eduID - paragraph6"
                  defaultMessage={`As an exemple, with a verified Swedish identity and a verified security key the account is at a sufficient level for the purpose of e.g. Digital National Exams (DNP) and Nice.
`}
                />
              </p>
            </article>
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
            uuid="help-tou"
            title={<FormattedMessage description="about terms of use - handle" defaultMessage="Terms of use" />}
            additionalInfo={null}
          >
            <article>
              <h4>
                <FormattedMessage
                  description="what are eduIDs terms of use - heading"
                  defaultMessage="What are eduIDs terms of use?"
                />
              </h4>
              <p>
                <FormattedMessage
                  description="what are eduIDs terms of use - paragraph"
                  defaultMessage={`These terms are accepted by the user upon creating an eduID account. You may be asked to accept the terms again if you haven't used the service for a period of time.`}
                />
              </p>
              <CommonToU version="2016-v1" />
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
                  More information about SUNET is available at {sunet} (in Swedish).`}
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
              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="how to contact support - list item 1"
                    defaultMessage="Always let us know the email address you used when you logged in to eduID, and if you are logged in include your ‘eppn’ unique ID as presented in the logged in start page."
                  />
                </li>
                <li>
                  <strong>
                    <FormattedMessage
                      description="how to contact support - list item 2"
                      defaultMessage="Don't include confidential or sensitive information such as your personal identity number in the email!"
                    />
                  </strong>
                </li>
                <li>
                  <FormattedMessage
                    description="how to contact support - list item 3"
                    defaultMessage="If something went wrong, it is always a good idea to include screenshots with error messages to ease troubleshooting."
                  />
                </li>
              </ul>
              <p>
                <strong>
                  <FormattedMessage
                    description="how to contact support email - strong"
                    defaultMessage={`In order to get best possible support, we recommend that you send e-mail`}
                  />
                </strong>
                <FormattedMessage
                  description="how to contact support phone"
                  defaultMessage={`, but for simple matters you can also reach us on phone number `}
                />
                &nbsp;
                <a className="text-link" href="tel:+468-55521362">
                  08-555 213 62
                </a>
              </p>
              <p>
                <FormattedMessage description="opening hours - list definition" defaultMessage="Opening hours:" />
              </p>
              <ul className="bullets">
                <li>
                  <FormattedMessage
                    description="opening hours - list item 1"
                    defaultMessage="Monday - Friday 09:00 - 16:00"
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
