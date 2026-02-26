import { AccordionItemTemplate } from "components/Common/AccordionItemTemplate";
import { FormattedMessage } from "react-intl";

export function ConnectingAccountOrcid(): React.JSX.Element {
  return (
    <AccordionItemTemplate
      uuid="help-orcid-ladok"
      title={
        <FormattedMessage
          description="about orcid ladok - handle"
          defaultMessage="Connecting account with ORCID / Ladok"
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
          <FormattedMessage description="use orcid - list definition" defaultMessage="How to link ORCID with eduID:" />
        </p>
        <ul className="bullets">
          <li>
            <FormattedMessage
              description="use orcid - list item 1"
              defaultMessage="read more and register for an ORCID at {orcid},"
              values={{
                orcid: (
                  <a className="text-link" href="https://orcid.org" target="_blank" rel="noreferrer">
                    orcid.org
                  </a>
                ),
              }}
            />
          </li>
          <li>
            <FormattedMessage
              description="use orcid - list item 2"
              defaultMessage="click the 'Add ORCID account' button in the Account area of eduID,"
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
          <FormattedMessage description="use ladok - list definition" defaultMessage="How to link Ladok with eduID:" />
        </p>

        <ul className="bullets">
          <li>
            <FormattedMessage
              description="use ladok - list item 1"
              defaultMessage="in the Account area of eduID, toggle the ESI control,"
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
  );
}
