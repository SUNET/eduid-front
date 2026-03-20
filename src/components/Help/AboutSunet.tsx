import { AccordionItemTemplate } from "components/Common/AccordionItemTemplate";
import { FormattedMessage } from "react-intl";

export function AboutSunet(): React.JSX.Element {
  return (
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
                <a href="https://www.sunet.se" target="_blank" rel="noreferrer">
                  www.sunet.se
                </a>
              ),
            }}
          />
        </p>
      </article>
    </AccordionItemTemplate>
  );
}
