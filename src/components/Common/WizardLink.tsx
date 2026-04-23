import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import EduIDButton from "./EduIDButton";

interface WizardLinkTypes {
  previousLink?: string;
  previousText?: string;
  previousOnClick?: () => void;
  nextLink?: string;
  nextText?: string;
  nextOnClick?: () => void;
}

function PreviousLink({
  previousLink,
  previousText,
  previousOnClick,
}: Readonly<Pick<WizardLinkTypes, "previousLink" | "previousText" | "previousOnClick">>) {
  if (previousLink) {
    return (
      <Link className="left" to={previousLink} aria-label={previousText}>
        <FontAwesomeIcon icon={faArrowLeft as IconProp} /> <span>{previousText}</span>
      </Link>
    );
  }

  if (previousOnClick) {
    return (
      <EduIDButton buttonstyle="link normal-case" className="left" onClick={previousOnClick} aria-label={previousText}>
        <FontAwesomeIcon icon={faArrowLeft as IconProp} /> <span>{previousText}</span>
      </EduIDButton>
    );
  }

  return null;
}

function NextLink({
  nextLink,
  nextText,
  nextOnClick,
}: Readonly<Pick<WizardLinkTypes, "nextLink" | "nextText" | "nextOnClick">>) {
  if (nextLink) {
    return (
      <Link className="right" to={nextLink} aria-label={nextText}>
        <span>{nextText}</span> <FontAwesomeIcon icon={faArrowRight as IconProp} />
      </Link>
    );
  }

  if (nextOnClick) {
    return (
      <EduIDButton buttonstyle="link normal-case" className="right" onClick={nextOnClick} aria-label={nextText}>
        <span>{nextText}</span> <FontAwesomeIcon icon={faArrowRight as IconProp} />
      </EduIDButton>
    );
  }

  return null;
}

export function WizardLink({
  previousLink,
  previousText,
  previousOnClick,
  nextLink,
  nextText,
  nextOnClick,
}: Readonly<WizardLinkTypes>) {
  return (
    <section className="wizard-link-wrapper">
      <PreviousLink previousLink={previousLink} previousText={previousText} previousOnClick={previousOnClick} />
      <NextLink nextLink={nextLink} nextText={nextText} nextOnClick={nextOnClick} />
    </section>
  );
}
