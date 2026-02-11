import { NinIdentity } from "apis/eduidPersonalData";
import securityApi from "apis/eduidSecurity";
import EduIDButton from "components/Common/EduIDButton";
import { IDENTITY_PATH } from "components/IndexMain";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router";
import { ShowAndHideButton } from "./ShowAndHideButton";

interface NinDisplayProps {
  readonly nin?: NinIdentity; // the NIN to display - passed as a prop to make component more re-usable
  readonly allowDelete?: boolean; // show delete option, if applicable to this NIN
}

function RenderShowHideNin(props: NinDisplayProps): React.JSX.Element | null {
  const [showFullNin, setShowFullNin] = useState<boolean>(false); // show the last four digits of the NIN or not
  const [removeNin] = securityApi.useLazyRemoveNinQuery();

  if (!props.nin) {
    // NinDisplay won't render this component if nin is undefined, but we need to tell TypeScript that
    return null;
  }

  const handleDelete = function (): void {
    if (props.allowDelete && props.nin) {
      removeNin({ nin: props.nin.number });
    }
  };

  return (
    <div className="display-nin-show-hide">
      <div className={`display-data ${props.nin.verified ? "verified" : "unverified"}`}>
        {showFullNin ? props.nin.number : props.nin.number.replace(/.{4}$/, "****")}
      </div>
      <ShowAndHideButton isShown={showFullNin} onClick={() => setShowFullNin(!showFullNin)} />
      {props.allowDelete && !props.nin.verified && (
        // if allowDelete is true and NIN is not verified, button for deleting NIN will appear
        <EduIDButton buttonstyle="close sm" onClick={handleDelete}></EduIDButton>
      )}
    </div>
  );
}

export function NinDisplay(props: NinDisplayProps) {
  return (
    <div className="profile-grid-cell">
      {props.nin ? (
        <RenderShowHideNin {...props} />
      ) : (
        // if there is no NIN, render a link to verify-identity
        <Link to={IDENTITY_PATH} className="display-data unverified">
          <FormattedMessage defaultMessage="add id number" description="NIN display link text" />
        </Link>
      )}
    </div>
  );
}

export default NinDisplay;
