import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EduIDLink from "./EduIDLink";

interface WizardLinkTypes {
  readonly previousLink: string;
  readonly previousText: string;
  readonly nextLink?: string;
  readonly nextText?: string;
}

export function WizardLink({ previousLink, previousText, nextLink, nextText }: WizardLinkTypes) {
  return (
    <section className="wizard-link-wrapper">
      <EduIDLink className="left" to={previousLink} aria-label={previousText}>
        <FontAwesomeIcon icon={faArrowLeft as IconProp} /> <span>{previousText}</span>
      </EduIDLink>
      {nextLink ? (
        <EduIDLink className="right" to={nextLink} aria-label={nextText}>
          <span>{nextText}</span> <FontAwesomeIcon icon={faArrowRight as IconProp} />
        </EduIDLink>
      ) : null}
    </section>
  );
}
