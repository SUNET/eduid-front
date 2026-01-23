import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

interface WizardLinkTypes {
  readonly previousLink: string;
  readonly previousText: string;
  readonly nextLink?: string;
  readonly nextText?: string;
}

export function WizardLink({ previousLink, previousText, nextLink, nextText }: WizardLinkTypes) {
  return (
    <section className="wizard-link-wrapper">
      <Link className="text-link left" to={previousLink} aria-label={previousText}>
        <FontAwesomeIcon icon={faArrowLeft as IconProp} /> <span>{previousText}</span>
      </Link>
      {nextLink ? (
        <Link className="text-link right" to={nextLink} aria-label={nextText}>
          <span>{nextText}</span> <FontAwesomeIcon icon={faArrowRight as IconProp} />
        </Link>
      ) : null}
    </section>
  );
}
