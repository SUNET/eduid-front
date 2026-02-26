import { AccordionItemTemplate } from "components/Common/AccordionItemTemplate";
import { FormattedMessage } from "react-intl";

export function ContactSupport(): React.JSX.Element {
  return (
    <AccordionItemTemplate
      uuid="help-contact"
      title={
        <FormattedMessage description="about contact support - handle" defaultMessage="Contacting eduID support" />
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
  );
}
