import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "eduid-hooks";

export function WizardLink() {
  const identities = useAppSelector((state) => state.personal_data?.response?.identities);
  const verifiedIdentities = identities?.nin?.verified;

  return (
    <section className="wizard-link-wrapper">
      <a className="text-link" href="#">
        <FontAwesomeIcon icon={faArrowLeft as IconProp} /> Start
      </a>
      {verifiedIdentities && (
        <a className="text-link" href="#">
          Security <FontAwesomeIcon icon={faArrowRight as IconProp} />
        </a>
      )}
    </section>
  );
}
