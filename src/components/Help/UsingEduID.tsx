import { Accordion, AccordionItemTemplate } from "components/Common/AccordionItemTemplate";
import { useAppSelector } from "eduid-hooks";
import { FormattedMessage } from "react-intl";

export function UsingEduID(): React.JSX.Element {
  const signup_link = useAppSelector((state) => state.config.signup_link);
  const dashboard_link = useAppSelector((state) => state.config.dashboard_link);

  return (
    <AccordionItemTemplate
      uuid="help-using-eduid"
      title={<FormattedMessage description="about using eduid - handle" defaultMessage="Using eduID" />}
      additionalInfo={
        <FormattedMessage description="about using eduid - info" defaultMessage="Create and login with account" />
      }
    >
      <h4>
        <FormattedMessage description="create eduid - heading" defaultMessage="How do I get an account?" />
      </h4>
      <Accordion id="eduid-create">
        <AccordionItemTemplate
          uuid="help-create"
          title={<FormattedMessage description="how create eduid - handle" defaultMessage="Create an eduID" />}
          additionalInfo={null}
        >
          <p>
            <FormattedMessage
              description="create eduid - list definition"
              defaultMessage="How to register your new eduID account at {eduidRegisterLink}:"
              values={{
                eduidRegisterLink: (
                  <a className="text-link" href={signup_link} target="_blank" rel="noreferrer">
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
                defaultMessage="Enter your first name, last name and email address in the form and press the ”Create eduID” button."
              />
            </li>
            <li>
              <FormattedMessage
                description="create eduid - list item 2"
                defaultMessage="Confirm that you are human using CAPTCHA by entering the displayed/read out code and press the ”Continue” button."
              />
            </li>
            <li>
              <FormattedMessage
                description="create eduid - list item 3"
                defaultMessage="Read and approve the eduID terms of use by pressing the ”I Accept” button."
              />
            </li>
            <li>
              <FormattedMessage
                description="create eduid - list item 4"
                defaultMessage="Verify your email address by entering the code emailed to you in the website form and press the ”Ok” button."
              />
            </li>
            <li>
              <FormattedMessage
                description="create eduid - list item 5"
                defaultMessage="Choose using the radio buttons between a suggested (automatically generated) password or one you create."
              />
            </li>
            <li>
              <FormattedMessage
                description="create eduid - list item 6"
                defaultMessage="When validated for strength, repeat the password in the corresponding field and press the ”Save” button."
              />
            </li>
            <li>
              <FormattedMessage
                description="create eduid - list item 7"
                defaultMessage="Take careful note of your login details (used email address and password)!"
              />
            </li>
            <li>
              <FormattedMessage
                description="create eduid - list item 8"
                defaultMessage="You can now log in with your eduID."
              />
            </li>
          </ol>
        </AccordionItemTemplate>
      </Accordion>

      <h4>
        <FormattedMessage description="login eduid - heading" defaultMessage="How do I log in with my account?" />
      </h4>
      <Accordion id="eduid-login">
        <AccordionItemTemplate
          uuid="help-login"
          title={<FormattedMessage description="login eduid - handle" defaultMessage="Log in with eduID" />}
          additionalInfo={null}
        >
          <article>
            <h5>
              <FormattedMessage
                description="login eduid - username heading"
                defaultMessage="With username and password"
              />
            </h5>
            <p>
              <FormattedMessage
                description="login eduid - username list definition"
                defaultMessage={`If you have an eduID account, enter your credentials in the form at {eduidLoginLink} 
                  and press the button "Log in". Your username can be`}
                values={{
                  eduidLoginLink: (
                    <a className="text-link" href={dashboard_link} target="_blank" rel="noreferrer">
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
                  defaultMessage="any email address you have entered and confirmed in eduID under Account"
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
                defaultMessage="With saved credentials"
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
              <FormattedMessage description="login eduid - security key heading" defaultMessage={`With security key`} />
            </h5>
            <p>
              <FormattedMessage
                description="login eduid - security key list definition"
                defaultMessage={`If you have added a security key for authentication under Security, it will be requested 
                  after the initial login form in an additional Security step:`}
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
                  defaultMessage={`Added security alternatives are listed in the "Other options" dropdown below the 
                    security key button, such as BankID, Freja+, eIDAS or Freja eID, depending on what applies to your verified identity. `}
                />
              </li>
              <li>
                <FormattedMessage
                  description="login eduid - security key list item 3"
                  defaultMessage={`If you don't wish to use a security key to log in unless required, set the "Always use 
                    a second factor (MFA) to log in to eduID" toggle control under Security to off.`}
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
          <article>
            <h5>
              <FormattedMessage description="login eduid - passkey heading" defaultMessage={`With passkey`} />
            </h5>
            <p>
              <FormattedMessage
                description="login eduid - passkey paragraph"
                defaultMessage={`When using a device passkey credential added to eduid.se the access, presentation and required steps will vary depending on your device, browser and type of passkey:`}
              />
            </p>

            <ol className="numbers">
              <li>
                <FormattedMessage
                  description="login eduid - passkey list item 1"
                  defaultMessage={`Focus the username field or you may need to press the "Log in with passkey" button in the login form (if you set the "Remember me.." toggle below you will go straight to using your key next time you log in).`}
                />
              </li>
              <li>
                <FormattedMessage
                  description="login eduid - passkey list item 2"
                  defaultMessage={`If any registered passkeys exist, select the key you wish to use from the list presented.`}
                />
              </li>
              <li>
                <FormattedMessage
                  description="login eduid - passkey list item 3"
                  defaultMessage={`Follow the instructions, e.g. scan your face, fingerprint or enter PIN code (eduID does not retain this information, passkeys are stored locally on your own device).`}
                />
              </li>
            </ol>
            <p>
              <FormattedMessage
                description="login eduid - passkey paragraph"
                defaultMessage={`Note: you can read more about passkeys in the "Enhancing the security level of eduID" help section."`}
              />
            </p>
            <p>
              <FormattedMessage
                description="login eduid - passkey paragraph"
                defaultMessage={`Note: general definition and support for passkeys is continually updated, if you are unable to use a security key 
                  previously added to eduID for your direct passkey login, it might need to be removed and added again in the Security section of eduID.se"`}
              />
            </p>
            <p>
              <FormattedMessage
                description="login eduid - passkey paragraph"
                defaultMessage={`You can read more about passkeys in the "Enhancing the security level of eduID" help section."`}
              />
            </p>
          </article>
          <article>
            <h5>
              <FormattedMessage description="login eduid - other device heading" defaultMessage="With another device" />
            </h5>
            <p>
              <FormattedMessage
                description="login eduid - other device list definition"
                defaultMessage="Use your credentials from another device than you wish to access eduID with:"
              />
            </p>
            <ol className="numbers">
              <li>
                <FormattedMessage
                  description="login eduid - other devices list item 1"
                  defaultMessage={`Press the "Other device" button in the login form.`}
                />
              </li>
              <li>
                <FormattedMessage
                  description="login eduid - other devices list item 2"
                  defaultMessage={`Scan the presented QR-code with the other device where you have your login credentials, 
                    e.g. security key or saved password.`}
                />
              </li>
              <li>
                <FormattedMessage
                  description="login eduid - other devices list item 3"
                  defaultMessage={`On that second device, review the device requesting to be logged in and use the 
                    presented code to login by entering it within the time shown, in the first device.`}
                />
              </li>
            </ol>
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
                defaultMessage={`Press the "Forgot your password?" link below the login form.`}
              />
            </li>
            <li>
              <FormattedMessage
                description="login eduid - forgot pw list item 2"
                defaultMessage={`Press the "Send email" button to receive a code to the email address presented on the page.`}
              />
            </li>
            <li>
              <FormattedMessage
                description="login eduid - forgot pw list item 3"
                defaultMessage={`Follow the instructions in the email within 2 hours. The steps to verify your email address 
                  and selecting a new password are the same as when you created your eduID.`}
              />
            </li>
          </ol>
          <p>
            <FormattedMessage
              description="login eduid - forgot pw paragraph"
              defaultMessage="Note: depending on your previous settings you might need to re-verify your identity in eduID."
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
                defaultMessage="Changing your password."
              />
            </li>
            <li>
              <FormattedMessage
                description="login eduid - re-login list item 2"
                defaultMessage="Toggling MFA login requirement setting."
              />
            </li>
            <li>
              <FormattedMessage
                description="login eduid - re-login list item 3"
                defaultMessage="Deleting your eduID account."
              />
            </li>
            <li>
              <FormattedMessage
                description="login eduid - re-login list item 4"
                defaultMessage="Adding/removing a security key."
              />
            </li>
            <li>
              <FormattedMessage
                description="login eduid - re-login list item 5"
                defaultMessage="Deleting your verified identity."
              />
            </li>
          </ul>
          <p>
            <FormattedMessage
              description="login eduID - re-login paragraph 2"
              defaultMessage='These settings are also marked with a "i" icon, with additional information on hover.'
            />
          </p>
        </AccordionItemTemplate>
      </Accordion>
    </AccordionItemTemplate>
  );
}
