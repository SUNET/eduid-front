import { NinIdentity } from "apis/eduidPersonalData";
import { removeNin } from "apis/eduidSecurity";
import EduIDButton from "components/Common/EduIDButton";
import { IDENTITY_PATH } from "components/IndexMain";
import { useAppDispatch } from "eduid-hooks";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router";

interface NinDisplayProps {
  nin?: NinIdentity; // the NIN to display - passed as a prop to make component more re-usable
  allowDelete?: boolean; // show delete option, if applicable to this NIN
  name?: string;
}

function RenderShowHideNin(props: NinDisplayProps): JSX.Element | null {
  const [showFullNin, setShowFullNin] = useState<boolean>(false); // show the last four digits of the NIN or not
  const dispatch = useAppDispatch();

  if (!props.nin) {
    // NinDisplay won't render this component if nin is undefined, but we need to tell TypeScript that
    return null;
  }

  const handleDelete = function (): void {
    if (props.allowDelete && props.nin) {
      dispatch(removeNin(props.nin.number));
    }
  };

  return (
    <div data-ninnumber={props.nin.number} className="display-nin-show-hide">
      <div className={`display-data ${props.nin.verified ? "verified" : "unverified"}`}>
        {showFullNin ? props.nin.number : props.nin.number.replace(/.{4}$/, "****")}
      </div>
      <EduIDButton
        id={`${props.name + "-show-hide-button"}`}
        buttonstyle="link sm"
        onClick={() => {
          setShowFullNin(!showFullNin);
        }}
      >
        {!showFullNin ? (
          <FormattedMessage defaultMessage="SHOW" description="nin/password button label" />
        ) : (
          <FormattedMessage defaultMessage="HIDE" description="nin/password button label" />
        )}
      </EduIDButton>
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
      {!props.nin ? (
        // if there is no NIN, render a link to verify-identity
        <Link to={IDENTITY_PATH} className="display-data unverified">
          <FormattedMessage defaultMessage="add id number" description="NIN display link text" />
        </Link>
      ) : (
        <RenderShowHideNin {...props} />
      )}
    </div>
  );
}

export default NinDisplay;
