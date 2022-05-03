import { removeNin } from "apis/eduidSecurity";
import EduIDButton from "components/EduIDButton";
import { useDashboardAppDispatch } from "dashboard-hooks";
import { translate } from "login/translation";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { NinInfo } from "reducers/Nins";

interface NinDisplayProps {
  nin?: NinInfo; // the NIN to display - passed as a prop to make component more re-usable
  allowDelete?: boolean; // show delete option, if applicable to this NIN
}

function RenderShowHideNin(props: NinDisplayProps): JSX.Element | null {
  const [showFullNin, setShowFullNin] = useState(false); // show the last four digits of the NIN or not
  const dispatch = useDashboardAppDispatch();

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
      <div id="nin-number" className={`display-data ${props.nin.verified ? "verified" : "unverified"}`}>
        {showFullNin ? props.nin.number : props.nin.number.replace(/.{4}$/, "****")}
      </div>
      <EduIDButton
        id="show-hide-button"
        buttonstyle="link"
        size="sm"
        onClick={() => {
          setShowFullNin(!showFullNin);
        }}
      >
        {showFullNin ? (
          <FormattedMessage defaultMessage="HIDE" description="nin/password button label" />
        ) : (
          <FormattedMessage defaultMessage="SHOW" description="nin/password button label" />
        )}
      </EduIDButton>
      {props.allowDelete && !props.nin.verified && (
        // if allowDelete is true and NIN is not verified, button for deleting NIN will appear
        <EduIDButton buttonstyle="close" size="sm" onClick={handleDelete}></EduIDButton>
      )}
    </div>
  );
}

export function NinDisplay(props: NinDisplayProps) {
  return (
    <div className="profile-grid-cell">
      <label key="0">{translate("nin_display.profile.main_title")}</label>
      {props.nin ? (
        <RenderShowHideNin {...props} />
      ) : (
        // if there is no NIN, render a link to verify-identity
        <Link to={`/profile/verify-identity/`} className="display-data unverified">
          <FormattedMessage defaultMessage="add id number" description="NIN display link text" />
        </Link>
      )}
    </div>
  );
}

export default NinDisplay;
