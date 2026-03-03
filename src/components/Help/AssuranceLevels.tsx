import { AccordionItemTemplate } from "components/Common/AccordionItemTemplate";
import { FormattedMessage } from "react-intl";

export function AssuranceLevels(): React.JSX.Element {
  return (
    <AccordionItemTemplate
      uuid="help-assurance-levels"
      title={<FormattedMessage description="about assurance levels - handle" defaultMessage="Assurance levels" />}
      additionalInfo={<FormattedMessage description="about assurance levels - info" defaultMessage="AL, LOA etc." />}
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
            defaultMessage={`Service providers need to rely on organisations to manage their users credentials 
              according to certain assurance levels set by relevant authorities, depending on the type of information accessible. The levels range from unconfirmed, to confirmed, to verified users with additional authentication when logging in to a system.`}
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
            defaultMessage={`At the logged in start page an overview of the status of your eduID is presented. 
              This is what it typically indicates regarding your assurance level and the services you may 
              authenticate against:`}
          />
        </p>

        <h5>
          <FormattedMessage
            description="Assurance levels with your eduID - paragraph2strong"
            defaultMessage="Confirmed account:"
          />
        </h5>
        <ul className="bullets">
          <li>
            <FormattedMessage
              description="Assurance levels with your eduID - paragraph2"
              defaultMessage="services requiring a low level of assurance, often called {emphasis}."
              values={{
                emphasis: (
                  <em>
                    <FormattedMessage
                      description="Assurance levels with your eduID - paragraph2em"
                      defaultMessage="AL1 (unconfirmed user) / RAF Low"
                    />
                  </em>
                ),
              }}
            />
          </li>
        </ul>
        <h5>
          <FormattedMessage
            description="Assurance levels with your eduID - paragraph3strong"
            defaultMessage="Verified identity:"
          />
        </h5>
        <ul className="bullets">
          <li>
            <FormattedMessage
              description="Assurance levels with your eduID - paragraph3"
              defaultMessage={`services requiring a medium level of assurance, including many higher education institutions, 
                often called {emphasis}.`}
              values={{
                emphasis: (
                  <em>
                    <FormattedMessage
                      description="Assurance levels with your eduID - paragraph3em"
                      defaultMessage="AL2 (confirmed user) / RAF Medium"
                    />
                  </em>
                ),
              }}
            />
          </li>
        </ul>

        <h5>
          <FormattedMessage
            description="Assurance levels with your eduID - paragraph4strong"
            defaultMessage="Enhanced security:"
          />
        </h5>
        <ul className="bullets">
          <li>
            <FormattedMessage
              description="Assurance levels with your eduID - paragraph4"
              defaultMessage="services requiring you to log in using multi factor authentication, often called {emphasis}."
              values={{
                emphasis: <em>REFEDS MFA</em>,
              }}
            />
          </li>
        </ul>

        <h5>
          <FormattedMessage
            description="Assurance levels with your eduID - paragraph5strong"
            defaultMessage="Verified security key:"
          />
        </h5>
        <ul className="bullets">
          <li>
            <FormattedMessage
              description="Assurance levels with your eduID - paragraph5"
              defaultMessage="services requiring a strong binding between your identity and your login, often called {emphasis}."
              values={{
                emphasis: (
                  <em>
                    <em>
                      <FormattedMessage
                        description="Assurance levels with your eduID - paragraph5em"
                        defaultMessage={`AL3 (verified user) / RAF High / LoA2`}
                      />
                    </em>
                  </em>
                ),
              }}
            />
          </li>
        </ul>

        <p>
          <FormattedMessage
            description="Assurance levels with your eduID - paragraph7"
            defaultMessage={`Note: this is a generalization and could change, complete information as to what is required 
              of your eduID must be provided by the connecting services.`}
          />
        </p>
        <p>
          <FormattedMessage
            description="Assurance levels with your eduID - paragraph6"
            defaultMessage={`As an example, with a verified Swedish identity and a verified security key the account is 
              at a sufficient level for the purpose of e.g. Digital National Exams (DNP) and Nice.`}
          />
        </p>
      </article>
    </AccordionItemTemplate>
  );
}
