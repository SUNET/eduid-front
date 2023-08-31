import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function InformationContainer(props: {
  heading: JSX.Element;
  paragraph: JSX.Element;
  toggleOption?: JSX.Element;
}) {
  return (
    <figure className="status information">
      <FontAwesomeIcon icon={faCircleInfo as IconProp} />
      <div>
        <h3>{props.heading}</h3>
        <p className="information__content">{props.paragraph}</p>
        {props.toggleOption}
      </div>
    </figure>
  );
}
