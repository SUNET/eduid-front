import { Accordion, AccordionItemTemplate } from "components/Common/AccordionItemTemplate";
import { FormattedMessage } from "react-intl";

export function ManageEduIDSettings(): React.JSX.Element {
  return (
    <AccordionItemTemplate
      uuid="help-using-eduid"
      title={<FormattedMessage description="about eduid settings - handle" defaultMessage="Managing eduID settings" />}
      additionalInfo={
        <FormattedMessage
          description="about eduid settings - info"
          defaultMessage="editing, enhancing and blocking/deleting your account"
        />
      }
    >
      <article>
        <h4>
          <FormattedMessage description="settings eduid - heading" defaultMessage="How do I update my account?" />
        </h4>
        <p>
          <FormattedMessage
            description="settings eduid - intro definition"
            defaultMessage={`When you log in to eduid.se the various settings are grouped into 4 views; Start, Identity, Security and Account, 
                    accessible from the header with a horizontal menu for larger screens or drop down menu by clicking on your username on smaller screens. Read more about the possible actions of each page below.`}
          />
        </p>
        <Accordion id="eduid-settings">
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
                <FormattedMessage description="start eduid - list item 1" defaultMessage={`your name`} />
              </li>
              <li>
                <FormattedMessage
                  description="start eduid - list item 2"
                  defaultMessage={`your unique user ID - part of what is sometimes referred to as EPPN.`}
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
                      defaultMessage={`confirmed account (confirmed email address and accepted terms of use)
                          `}
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="start eduid - list item 3-2"
                      defaultMessage={`real identity verified
                          `}
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="start eduid - list item 3-3"
                      defaultMessage={`enhanced security (added a method used for multi factor login)
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
                  defaultMessage={`A table presenting your verified identities if you have any.`}
                />
              </li>
              <li>
                <FormattedMessage
                  description="identity eduid - list item 2"
                  defaultMessage={`Options for identity verification if your real identity is not verified, or if your existing verification is not with a Swedish ID- or coordination number, depending on your situation:`}
                />
                <ul className="nested">
                  <li>
                    <FormattedMessage
                      description="identity eduid - list item 2-1"
                      defaultMessage={`With Swedish digital ID (Freja+/BankID) or by post.
                          `}
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="identity eduid - list item 2-2"
                      defaultMessage={`With eIDAS electronic identification for EU citizens.
                          `}
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="identity eduid - list item 2-3"
                      defaultMessage={`With Freja eID for most nationalities.
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
          </AccordionItemTemplate>
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
                  defaultMessage={`Buttons to add multi-factor authentication to increase the security of your eduID by adding a layer 
                            called a security key to your login process besides password. By also verifying the security key it is bound to your identity, increasing the assurance level of your account.
                            You can add as many as you wish and depending on your device (computer, mobile, operating system etc.), the options to add a security key include:`}
                />
                <ul className="nested">
                  <li>
                    <FormattedMessage
                      description="security eduid - list item 1-1"
                      defaultMessage={`This device: built in security key in mobile or laptop, e.g. a passkey, including your biometrics.
                          `}
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="security eduid - list item 1-2"
                      defaultMessage={`Security key: external device such as your USB security key.
                          `}
                    />
                  </li>
                </ul>
              </li>
              <li>
                <FormattedMessage
                  description="security eduid - list item 2"
                  defaultMessage={`Under "Manage your security keys" is a toggle control marked "Always use a second factor (MFA) to log in to eduID"
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
                      description="security eduid - list item 3-0"
                      defaultMessage={`corresponding icon for built in or separate security key
                          `}
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="security eduid - list item 3-1"
                      defaultMessage={`the descriptive name given by you when created
                          `}
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="security eduid - list item 3-2"
                      defaultMessage={`dates of creation and latest use
                          `}
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="security eduid - list item 3-3"
                      defaultMessage={`verification status / verification options (Freja+/BankID/eIDAS/Freja eID)
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
                <strong>
                  <FormattedMessage description="account eduid - list item 0-heading" defaultMessage={`Unique ID: `} />
                </strong>
                &nbsp;
                <FormattedMessage
                  description="account eduid - list item 0"
                  defaultMessage={` A unique username for your eduID that is generated for you when creating the account.`}
                />
              </li>
              <li>
                <strong>
                  <FormattedMessage
                    description="account eduid - list item 1-heading"
                    defaultMessage={`Email addresses: `}
                  />
                </strong>
                &nbsp;
                <FormattedMessage
                  description="account eduid - list item 1"
                  defaultMessage={` You can add as many as you wish, but need to have at least one email address that you have confirmed access to. You can log in with all confirmed addresses but the primary one will be used for communication with you. They are listed in a table with the following options:`}
                />
                <ul className="nested">
                  <li>
                    <FormattedMessage
                      description="account eduid - list item 1-1"
                      defaultMessage={`Add by clicking on the "+ add more" link and remove by clicking on the bin icon.`}
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="account eduid - list item 1-2"
                      defaultMessage={`Confirm an address by clicking on the link "Confirm" and enter the code that is emailed to that address into the website form.`}
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="account eduid - list item 1-3"
                      defaultMessage={`Make one email address your primary address by clicking on the link "Make primary".`}
                    />
                  </li>
                </ul>
              </li>
              <li>
                <strong>
                  <FormattedMessage description="account eduid - list item 2-heading" defaultMessage={`Language:  `} />
                </strong>
                &nbsp;
                <FormattedMessage
                  description="account eduid - list item 2"
                  defaultMessage={` The default language is based on the language 
                  setting that your browser uses. Available options are Swedish and English.`}
                />
                <ul className="nested">
                  <li>
                    <FormattedMessage
                      description="settings eduid - list item 2-1"
                      defaultMessage="To change the default language for eduID you can log in to eduID and select your 
                  preference using the Language radio buttons under Account. "
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="settings eduid - list item 2-2"
                      defaultMessage="You can also change the language for the displayed page in the footer of the 
                  webpage."
                    />
                  </li>
                </ul>
              </li>
              <li>
                <strong>
                  <FormattedMessage
                    description="account eduid - list item 3-heading"
                    defaultMessage={`Change password: `}
                  />
                </strong>
                &nbsp;
                <FormattedMessage
                  description="account eduid - list item 3"
                  defaultMessage={`Always change your password if you believe someone else has access to it. `}
                />
                <ul className="nested">
                  <li>
                    <FormattedMessage
                      description="account eduid - list item 3-1"
                      defaultMessage={`Clicking on the link 
                        "Change password" will take you through the steps for changing your password. As when you created your eduID, 
                        there is a choice between a suggested (automatically generated) password or one you create.`}
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="account eduid - list item 3-2"
                      defaultMessage={`A randomly created suggested password is generally considered safest and you can use a third party or browser built in Password Manager tool to help you keep track of your password.`}
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      description="account eduid - list item 3-3"
                      defaultMessage={`If you are using a passkey for your login, don't save it on the same key chain as your password.`}
                    />
                  </li>
                </ul>
              </li>
              <li>
                <strong>
                  <FormattedMessage
                    description="account eduid - list item 4-heading"
                    defaultMessage={`ORCID account: `}
                  />
                </strong>
                &nbsp;
                <FormattedMessage
                  description="account eduid - list item 4"
                  defaultMessage={`A button connecting your eduID with your existing ORCID iD.`}
                />
              </li>
              <li>
                <strong>
                  <FormattedMessage
                    description="account eduid - list item 5-heading"
                    defaultMessage={`ESI information: `}
                  />
                </strong>
                &nbsp;
                <FormattedMessage
                  description="account eduid - list item 5"
                  defaultMessage={`A toggle control and select box connecting your eduID to ESI, if enabled by your institution.`}
                />
              </li>
              <li>
                <strong>
                  <FormattedMessage
                    description="account eduid - list item 6-heading"
                    defaultMessage={`Blocking and deleting eduID: `}
                  />
                </strong>
                &nbsp;
                <FormattedMessage
                  description="account eduid - list item 6"
                  defaultMessage={`Clicking on the link "delete eduID" will open a modal confirming removal of your account.`}
                />
              </li>
            </ul>
            <p>
              <FormattedMessage
                description="login eduid - security key paragraph"
                defaultMessage={`Note: you can read more about ORCID iD and Ladok and ESI settings in the "Connecting account with Orcid / ESI" help section."`}
              />
            </p>
          </AccordionItemTemplate>
        </Accordion>
        <h4>
          <FormattedMessage
            description="delete eduid - heading"
            defaultMessage="How do I block and delete my account?"
          />
        </h4>
        <p>
          <FormattedMessage
            description="delete eduid - paragraph"
            defaultMessage={`If you wish to block access to your account you have the option to remove it under Blocking and deleting eduID in the Account page. If you decide you want to keep the account then reset your password within one week.`}
          />
        </p>
      </article>
    </AccordionItemTemplate>
  );
}
