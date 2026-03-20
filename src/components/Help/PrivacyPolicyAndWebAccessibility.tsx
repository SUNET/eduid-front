import { AccordionItemTemplate } from "components/Common/AccordionItemTemplate";
import { FormattedMessage } from "react-intl";

export function PrivacyPolicyAndWebAccessibility(): React.JSX.Element {
  return (
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
                  href="https://sunet.se/om-sunet/behandling-av-personuppgifter-i-eduid"
                  target="_blank"
                  rel="noreferrer"
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
                <a href="https://sunet.se/om-sunet/tillganglighet-for-eduid-se" target="_blank" rel="noreferrer">
                  <FormattedMessage description="accessibility report - link" defaultMessage="Accessibility report" />
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
      <article>
        <h4>
          <FormattedMessage
            description="how change appearance - heading"
            defaultMessage="How can I change the appearance of eduID?"
          />
        </h4>
        <p>
          <FormattedMessage
            description="how change appearance - paragraph"
            defaultMessage={`The color mode of eduID.se is available in light or dark mode to adapt to user preference and will display according to your system settings. This can be overridden at any time by using the "Appearance" toggle control in the page footer. If no preference is set it defaults to a light theme.`}
          />
        </p>
      </article>
    </AccordionItemTemplate>
  );
}
