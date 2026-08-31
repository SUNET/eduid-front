import { Accordion, AccordionItemTemplate } from "components/Common/AccordionItemTemplate";
import { useAppSelector } from "eduid-hooks";
import { FormattedMessage } from "react-intl";

export function UsingEduID() {
  const signup_link = useAppSelector((state) => state.config.signup_link);
  const dashboard_link = useAppSelector((state) => state.config.dashboard_link);

  return (
    <AccordionItemTemplate
      uuid="help-using-eduid"
      title={
        <FormattedMessage
          id="usingEduID.usingHandle"
          description="about using eduid - handle"
          defaultMessage="Using eduID"
        />
      }
      additionalInfo={
        <FormattedMessage
          id="usingEduID.info"
          description="about using eduid - info"
          defaultMessage="Create and login with account"
        />
      }
    >
      <h4>
        <FormattedMessage
          id="usingEduID.createHeading"
          description="create eduid - heading"
          defaultMessage="How do I get an account?"
        />
      </h4>
      <Accordion id="eduid-create">
        <AccordionItemTemplate
          uuid="help-create"
          title={
            <FormattedMessage
              id="usingEduID.createHandle"
              description="how create eduid - handle"
              defaultMessage="Create an eduID"
            />
          }
          additionalInfo={null}
        >
          <p>
            <FormattedMessage
              id="usingEduID.create"
              description="create eduid - list definition"
              defaultMessage="How to register your new eduID account at {eduidRegisterLink}:"
              values={{
                eduidRegisterLink: (
                  <a href={signup_link} target="_blank" rel="noreferrer">
                    eduid.se/register
                  </a>
                ),
              }}
            />
          </p>
          <ol className="numbers">
            <li>
              <FormattedMessage
                id="usingEduID.create1"
                description="create eduid - list item 1"
                defaultMessage="Enter your first name, last name and email address in the form and press the ”Create eduID” button."
              />
            </li>
            <li>
              <FormattedMessage
                id="usingEduID.create2"
                description="create eduid - list item 2"
                defaultMessage="Confirm that you are human using CAPTCHA by entering the displayed/read out code and press the ”Continue” button."
              />
            </li>
            <li>
              <FormattedMessage
                id="usingEduID.create3"
                description="create eduid - list item 3"
                defaultMessage="Read and approve the eduID terms of use by pressing the ”I Accept” button."
              />
            </li>
            <li>
              <FormattedMessage
                id="usingEduID.create4"
                description="create eduid - list item 4"
                defaultMessage="Verify your email address by entering the code emailed to you in the website form and press the ”Ok” button."
              />
            </li>
            <li>
              <FormattedMessage
                id="usingEduID.create5"
                description="create eduid - list item 5"
                defaultMessage="Choose using the radio buttons between a suggested (automatically generated) password or one you create."
              />
            </li>
            <li>
              <FormattedMessage
                id="usingEduID.create6"
                description="create eduid - list item 6"
                defaultMessage="When validated for strength, repeat the password in the corresponding field and press the ”Save” button."
              />
            </li>
            <li>
              <FormattedMessage
                id="usingEduID.create7"
                description="create eduid - list item 7"
                defaultMessage="Take careful note of your login details (used email address and password)!"
              />
            </li>
            <li>
              <FormattedMessage
                id="usingEduID.create8"
                description="create eduid - list item 8"
                defaultMessage="You can now log in with your eduID."
              />
            </li>
          </ol>
        </AccordionItemTemplate>
      </Accordion>

      <h4>
        <FormattedMessage
          id="usingEduID.heading"
          description="login eduid - heading"
          defaultMessage="How do I log in with my account?"
        />
      </h4>
      <Accordion id="eduid-login">
        <AccordionItemTemplate
          uuid="help-login"
          title={
            <FormattedMessage
              id="usingEduID.loginHandle"
              description="login eduid - handle"
              defaultMessage="Log in with eduID"
            />
          }
          additionalInfo={null}
        >
          <dl className="link-list">
            <dt className="text-bold">
              <FormattedMessage
                id="usingEduID.loginEduidLogin"
                description="login eduid - login list definition"
                defaultMessage="Login alternatives:"
              />
            </dt>
            <dd>
              <a href="#loginUsernameHeading">
                <FormattedMessage
                  id="usingEduID.loginEduidUsername"
                  description="login eduid - username heading"
                  defaultMessage="With username and password"
                />
              </a>
            </dd>
            <dd>
              <a href="#loginSavedHeading">
                <FormattedMessage
                  id="usingEduID.loginHeading"
                  description="login eduid - remember me heading"
                  defaultMessage="With saved credentials"
                />
              </a>
            </dd>
            <dd>
              <a href="#loginSecurityKeyHeading">
                <FormattedMessage
                  id="usingEduID.loginEduidHeading"
                  description="login eduid - security key heading"
                  defaultMessage={`With security key`}
                />
              </a>
            </dd>
            <dd>
              <a href="#loginPasskeyHeading">
                <FormattedMessage
                  id="usingEduID.loginEduidPasskey"
                  description="login eduid - passkey heading"
                  defaultMessage={`With Passkey`}
                />
              </a>
            </dd>
            <dd>
              <a href="#loginOtherDeviceHeading">
                <FormattedMessage
                  id="usingEduID.login"
                  description="login eduid - other device heading"
                  defaultMessage="With another device"
                />
              </a>
            </dd>
          </dl>
          <article>
            <h5 id="loginUsernameHeading">
              <FormattedMessage
                id="usingEduID.loginEduidUsername"
                description="login eduid - username heading"
                defaultMessage="With username and password"
              />
            </h5>
            <p>
              <FormattedMessage
                id="usingEduID.loginEduid"
                description="login eduid - username list definition"
                defaultMessage={`If you have an eduID account, enter your credentials in the form at {eduidLoginLink} 
                  and press the button "Log in". Your username can be`}
                values={{
                  eduidLoginLink: (
                    <a href={dashboard_link} target="_blank" rel="noreferrer">
                      eduid.se
                    </a>
                  ),
                }}
              />
            </p>
            <ul className="bullets">
              <li>
                <FormattedMessage
                  id="usingEduID.loginEduidUsername1"
                  description="login eduid - username list item 1"
                  defaultMessage="any email address you have entered and confirmed in eduID under Account"
                />
              </li>
              <li>
                <FormattedMessage
                  id="usingEduID.loginEduid2"
                  description="login eduid - username list item 2"
                  defaultMessage="your unique ID, shown on the logged in start page and under Account."
                />
              </li>
            </ul>
          </article>
          <article>
            <h5 id="loginSavedHeading">
              <FormattedMessage
                id="usingEduID.loginHeading"
                description="login eduid - remember me heading"
                defaultMessage="With saved credentials"
              />
            </h5>
            <p>
              <FormattedMessage
                id="usingEduID.loginEduidParagraph"
                description="login eduid - remember me paragraph"
                defaultMessage={`Underneath the login form there is a toggle control called "Remember me on this device". 
                    If this is switched on the web browser will attempt to fill in your username and hidden password in the form. For a different account or on a shared device, set this to off.`}
              />
            </p>
          </article>
          <article>
            <h5 id="loginSecurityKeyHeading">
              <FormattedMessage
                id="usingEduID.loginEduidHeading"
                description="login eduid - security key heading"
                defaultMessage={`With security key`}
              />
            </h5>
            <p>
              <FormattedMessage
                id="usingEduID.loginEduidSecurity"
                description="login eduid - security key list definition"
                defaultMessage={`If you have added a security key for authentication under Security, it will be requested 
                  after the initial login form in an additional Security step:`}
              />
            </p>
            <ul className="bullets">
              <li>
                <FormattedMessage
                  id="usingEduID.loginEduidSecurity1"
                  description="login eduid - security key list item 1"
                  defaultMessage={`Press the "Use my security key" button and follow the instructions, which will vary depending on your key.`}
                />
              </li>
              <li>
                <FormattedMessage
                  id="usingEduID.login2"
                  description="login eduid - security key list item 2"
                  defaultMessage={`Added security alternatives are listed in the "Other options" dropdown below the 
                    security key button, such as BankID, Freja+, eIDAS or Freja eID, depending on what applies to your verified identity. `}
                />
              </li>
              <li>
                <FormattedMessage
                  id="usingEduID.loginEduidSecurity3"
                  description="login eduid - security key list item 3"
                  defaultMessage={`If you don't wish to use a security key to log in unless required, set the "Always use 
                    a second factor (MFA) to log in to eduID" toggle control under Security to off.`}
                />
              </li>
            </ul>
            <p>
              <FormattedMessage
                id="usingEduID.paragraph"
                description="login eduid - security key paragraph"
                defaultMessage={`Note: you can read more about security keys in the "Enhancing the security level of eduID" help section."`}
              />
            </p>
          </article>
          <article>
            <h5 id="loginPasskeyHeading">
              <FormattedMessage
                id="usingEduID.loginEduidPasskey"
                description="login eduid - passkey heading"
                defaultMessage={`With Passkey`}
              />
            </h5>
            <p>
              <FormattedMessage
                id="usingEduID.paragraph1"
                description="login eduid - passkey paragraph 1"
                defaultMessage={`A passkey added to your eduID account can either be used to log in following username and password or by itself. For passwordless login using only your passkey, you need to have registered a supported passkey (sometimes called a "discoverable passkey") after October 2025, when eduID included support of this functionality, as they were not fully considered passkeys before.`}
              />
            </p>
            <p>
              <FormattedMessage
                id="usingEduID.loginParagraph2"
                description="login eduid - passkey paragraph 2"
                defaultMessage={`When using a passkey credential, the access, presentation and required steps will vary depending on your device, browser and type of key:`}
              />
            </p>

            <ol className="numbers">
              <li>
                <FormattedMessage
                  id="usingEduID.loginEduid1"
                  description="login eduid - passkey list item 1"
                  defaultMessage={`Focus the username field, or you may need to press the "Log in with passkey" button in the login form. (If first setting the "Remember me.." toggle below you could directly use your key at your next login.)`}
                />
              </li>
              <li>
                <FormattedMessage
                  id="usingEduID.loginEduidPasskey2"
                  description="login eduid - passkey list item 2"
                  defaultMessage={`If any applicable passkeys exist, select the key you wish to use from the list presented.`}
                />
              </li>
              <li>
                <FormattedMessage
                  id="usingEduID.login3"
                  description="login eduid - passkey list item 3"
                  defaultMessage={`Follow the instructions; e.g. scan your face, fingerprint or enter PIN code. (eduID does not retain this information as passkeys are stored locally on your own device or credential manager.)`}
                />
              </li>
            </ol>

            <section>
              <p>
                <FormattedMessage
                  id="usingEduID.error1"
                  description="login eduid - passkey paragraph - error 1"
                  defaultMessage={`Definition and support of passkeys continually evolve. If login fails with your selected key it could be because of the key not supporting {discoverable}, 
                    which you can check with your passkey provider.`}
                  values={{
                    discoverable: (
                      <strong>
                        <FormattedMessage
                          id="usingEduID.strongError"
                          description="error strong - discoverable"
                          defaultMessage={`discoverable passkeys`}
                        />
                      </strong>
                    ),
                  }}
                />
              </p>
              <p>
                <FormattedMessage
                  id="usingEduID.error2"
                  description="login eduid - passkey paragraph - error 2"
                  defaultMessage={`It could also be due to it being registered {implementation} of this feature, 
                    so will need to be readded in the Security section of eduID.se after logging in using another method, to get the full advantage of using your passkey.`}
                  values={{
                    implementation: (
                      <strong>
                        <FormattedMessage
                          id="usingEduID.error"
                          description="error strong - implementation"
                          defaultMessage={`prior to the implementation`}
                        />
                      </strong>
                    ),
                  }}
                />
              </p>
            </section>
            <p>
              <FormattedMessage
                id="usingEduID.note"
                description="login eduid - passkey paragraph - note"
                defaultMessage={`Note: you can read more about passkeys and how to add them in the "Enhancing the security level of eduID" help section.`}
              />
            </p>
          </article>
          <article>
            <h5 id="loginOtherDeviceHeading">
              <FormattedMessage
                id="usingEduID.login"
                description="login eduid - other device heading"
                defaultMessage="With another device"
              />
            </h5>
            <p>
              <FormattedMessage
                id="usingEduID.loginEduidOther"
                description="login eduid - other device list definition"
                defaultMessage="Use your credentials from another device than you wish to access eduID with:"
              />
            </p>
            <ol className="numbers">
              <li>
                <FormattedMessage
                  id="usingEduID.loginEduidOther1"
                  description="login eduid - other devices list item 1"
                  defaultMessage={`Press the "Other device" button in the login form.`}
                />
              </li>
              <li>
                <FormattedMessage
                  id="usingEduID.loginEduidOther2"
                  description="login eduid - other devices list item 2"
                  defaultMessage={`Scan the presented QR-code with the other device where you have your login credentials, 
                    e.g. security key or saved password.`}
                />
              </li>
              <li>
                <FormattedMessage
                  id="usingEduID.loginEduid3"
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
              id="usingEduID.loginEduidHandle"
              description="login eduid - forgot pw handle"
              defaultMessage="Regain access if forgotten password"
            />
          }
          additionalInfo={null}
        >
          <ol className="numbers">
            <li>
              <FormattedMessage
                id="usingEduID.loginEduidForgot1"
                description="login eduid - forgot pw list item 1"
                defaultMessage={`Press the "Forgot your password?" link below the login form.`}
              />
            </li>
            <li>
              <FormattedMessage
                id="usingEduID.loginEduidForgot2"
                description="login eduid - forgot pw list item 2"
                defaultMessage={`Press the "Send email" button to receive a code to the email address presented on the page.`}
              />
            </li>
            <li>
              <FormattedMessage
                id="usingEduID.loginEduidForgot3"
                description="login eduid - forgot pw list item 3"
                defaultMessage={`Follow the instructions in the email within 2 hours. The steps to verify your email address 
                  and selecting a new password are the same as when you created your eduID.`}
              />
            </li>
          </ol>
          <p>
            <FormattedMessage
              id="usingEduID.loginEduidForgot"
              description="login eduid - forgot pw paragraph"
              defaultMessage="Note: depending on your previous settings you might need to re-verify your identity in eduID."
            />
          </p>
        </AccordionItemTemplate>
        <AccordionItemTemplate
          uuid="help-relogin"
          title={
            <FormattedMessage
              id="usingEduID.handle"
              description="login eduID - re-login handle"
              defaultMessage="I'm already logged in, why do I need to log in again?"
            />
          }
          additionalInfo={null}
        >
          <p>
            <FormattedMessage
              id="usingEduID.loginParagraph"
              description="login eduID - re-login paragraph"
              defaultMessage="In some situations that require added security you will be asked to log in again (with your security key if you are using one), if more than 5 minutes have passed since you logged in, e.g: "
            />
          </p>
          <ul className="bullets">
            <li>
              <FormattedMessage
                id="usingEduID.login1"
                description="login eduid - re-login list item 1"
                defaultMessage="Changing your password."
              />
            </li>
            <li>
              <FormattedMessage
                id="usingEduID.loginEduidRe2"
                description="login eduid - re-login list item 2"
                defaultMessage="Toggling MFA login requirement setting."
              />
            </li>
            <li>
              <FormattedMessage
                id="usingEduID.loginEduidRe3"
                description="login eduid - re-login list item 3"
                defaultMessage="Deleting your eduID account."
              />
            </li>
            <li>
              <FormattedMessage
                id="usingEduID.login4"
                description="login eduid - re-login list item 4"
                defaultMessage="Adding/removing a security key."
              />
            </li>
            <li>
              <FormattedMessage
                id="usingEduID.login5"
                description="login eduid - re-login list item 5"
                defaultMessage="Deleting your verified identity."
              />
            </li>
          </ul>
          <p>
            <FormattedMessage
              id="usingEduID.paragraph2"
              description="login eduID - re-login paragraph 2"
              defaultMessage='These settings are also marked with a "i" icon, with additional information on hover.'
            />
          </p>
        </AccordionItemTemplate>
      </Accordion>
    </AccordionItemTemplate>
  );
}
