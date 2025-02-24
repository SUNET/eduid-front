import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export function WizardLink({ previousLink, previousText, nextLink, nextText }: any) {
  return (
    <section className="wizard-link-wrapper">
      {previousLink ? (
        <Link className="text-link" to={previousLink}>
          <FontAwesomeIcon icon={faArrowLeft as IconProp} /> {previousText}
        </Link>
      ) : null}
      {nextLink ? (
        <Link className="text-link" to={nextLink}>
          {nextText} <FontAwesomeIcon icon={faArrowRight as IconProp} />
        </Link>
      ) : null}
    </section>
  );
}
