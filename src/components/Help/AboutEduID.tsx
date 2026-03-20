import { AccordionItemTemplate } from "components/Common/AccordionItemTemplate";
import { useAppSelector } from "eduid-hooks";
import { FormattedMessage } from "react-intl";

export function AboutEduID(): React.JSX.Element {
  const locale = useAppSelector((state) => state.intl.locale);
  const UniversityAdmissionURL =
    locale === "en" ? "https://www.universityadmissions.se/intl/start" : "https://www.antagning.se";

  return (
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
                <a href={UniversityAdmissionURL} target="_blank" rel="noreferrer">
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
              defaultMessage="administrate students taking the Digital national exam,"
            />
          </li>
          <li>
            <FormattedMessage
              description="when use eduID - list item 6"
              defaultMessage="electronically sign documents with eduSign, read more at {edusignLink}."
              values={{
                edusignLink: (
                  <a href={"https://edusign.sunet.se/"} target="_blank" rel="noreferrer">
                    edusign.sunet.se
                  </a>
                ),
              }}
            />
          </li>
        </ul>
      </article>
    </AccordionItemTemplate>
  );
}
