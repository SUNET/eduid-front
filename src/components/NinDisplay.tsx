import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import EduIDButton from "components/EduIDButton";
import ninsSlice, { NinInfo } from "reducers/Nins";
import { translate } from "login/translation";
import { useDashboardAppDispatch } from "dashboard-hooks";
import { FormattedMessage } from "react-intl";

interface NinDisplayProps {
  nins: NinInfo[]; // all nins
  verifiedNin: NinInfo[]; // all verified nins
  handleDelete: (e: React.MouseEvent<HTMLElement>) => void;
  delete?: boolean; // probable BUG: don't know where this comes from
  showDeleteButton: boolean;
}

const RenderShowHideNin = (props: NinDisplayProps): JSX.Element => {
  const [showFullNin, setShowFullNin] = useState(false); // show the last four digits of the NIN or not
  const dispatch = useDashboardAppDispatch();
  const verifiedNins = props.nins.filter((nin) => nin.verified);
  const nin = verifiedNins[0] || props.nins[0];

  const handleDelete = function (e: React.MouseEvent<HTMLElement>): void {
    // TODO: We should be able to just use 'nin.number' from the enclosing function, right? Why go digging after it in the HTML?
    const target = e.target as HTMLElement;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cell = target.closest(".profile-grid-cell") as unknown as any;
    if (cell) {
      // TODO: investigate proper type for cell.children[1], ts says it has no 'dataset'
      const ninNumber = cell.children[1].dataset.ninnumber;
      dispatch(ninsSlice.actions.startRemove(ninNumber));
    }
  };

  return (
    <div data-ninnumber={nin.number} className={`${props.delete ? "data-with-delete" : "display-nin-show-hide"}`}>
      <p id="nin-number" className={`display-data ${nin.verified ? "verified" : "unverified"}`}>
        {showFullNin ? nin.number : nin.number.replace(/.{4}$/, "****")}
      </p>
      <EduIDButton
        id="show-hide-button"
        buttonStyle="link"
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
      {props.showDeleteButton && !nin.verified && (
        // if showDeleteButton is true and nin is not verified, button for deleting of nin number will appear
        <EduIDButton buttonStyle="close" size="sm" onClick={handleDelete}></EduIDButton>
      )}
    </div>
  );
};

export class NinDisplay extends Component<NinDisplayProps> {
  render() {
    return (
      <div className="profile-grid-cell">
        <label key="0">{translate("nin_display.profile.main_title")}</label>
        {this.props.nins.length === 0 ? (
          // if nins is not added, user is able to navigate to identity
          <Link to={`/profile/verify-identity/`} className="display-data unverified">
            {translate("nin_display.profile.no_nin")}
          </Link>
        ) : (
          <RenderShowHideNin {...this.props} />
        )}
      </div>
    );
  }
}

export default NinDisplay;
