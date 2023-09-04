import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function InformationContainer(props: { heading: JSX.Element; paragraph: JSX.Element; buttons?: JSX.Element }) {
  return (
    <figure className="status information">
      <div className="information-icon-container">
        <FontAwesomeIcon icon={faCircleInfo as IconProp} />
        <h3>{props.heading}</h3>
      </div>
      <p className="information__content">{props.paragraph}</p>
      {props.buttons}
    </figure>
  );
}
