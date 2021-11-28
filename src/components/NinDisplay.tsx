import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import EduIDButton from "components/EduIDButton";
import ninsSlice, { NinInfo } from "reducers/Nins";
import { connect } from "react-redux";
import { DashboardAppDispatch, DashboardRootState } from "dashboard-init-app";
import { translate } from "login/translation";

interface NinDisplayProps {
  nins: NinInfo[]; // all nins
  verifiedNinStatus: boolean; // is the added nin verified?
  verifiedNin: NinInfo[]; // all verified nins
  showNinAtProfile: boolean; // show last four digits or not
  showNinAtIdentity: boolean; // show last four digits or not
  toggleShowNinAtProfile(): void;
  toggleShowNinAtIdentity(): void;
  handleDelete: (e: React.MouseEvent<HTMLElement>) => void;
  delete?: boolean; // probable BUG: don't know where this comes from
}

const RenderShowHideNin = (props: NinDisplayProps): JSX.Element => {
  const url = props.history.location.pathname;
  let toggleShowNin,
    showNin,
    nin = "";

  if (props.verifiedNinStatus)
    //if nin is verified, verifiedNin[0]number will be present
    nin = props.verifiedNin[0].number;
  //else nin is not verified, nins[0].number will be present
  else nin = props.nins[0].number;

  if (url === "/profile/") {
    (toggleShowNin = props.toggleShowNinAtProfile), (showNin = props.showNinAtProfile);
  } else {
    (toggleShowNin = props.toggleShowNinAtIdentity), (showNin = props.showNinAtIdentity);
  }

  return (
    <div data-ninnumber={nin} className={`${props.delete ? "data-with-delete" : "display-nin-show-hide"}`}>
      <p id="nin-number" className={`display-data ${props.verifiedNinStatus ? "verified" : "unverified"}`}>
        {showNin ? nin : nin.replace(/\d{4}$/, "****")}
      </p>
      <button className="show-hide-button" onClick={toggleShowNin}>
        {showNin ? translate("nin_hide_last_four_digits") : translate("nin_show_last_four_digits")}
      </button>
      {url === "/profile/verify-identity/" && !props.verifiedNinStatus && (
        // if location path name is "/profile/verify-identity/" and nin is not verified, button for deleting of nin number will appear
        <EduIDButton className="icon-button" onClick={props.handleDelete}>
          <svg
            key="0"
            className="remove"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 0h2v16H7z" />
            <path d="M0 9V7h16v2z" />
          </svg>
        </EduIDButton>
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

const mapStateToProps = (state: DashboardRootState) => {
  return {
    showNinAtProfile: state.nins.showNinAtProfile,
    showNinAtIdentity: state.nins.showNinAtIdentity,
  };
};

const mapDispatchToProps = (dispatch: DashboardAppDispatch) => {
  return {
    handleDelete: function (e: React.MouseEvent<HTMLElement>): void {
      const target = e.target as HTMLElement;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cell = target.closest(".profile-grid-cell") as unknown as any;
      if (cell) {
        // TODO: investigate proper type for cell.children[1], ts says it has no 'dataset'
        const ninNumber = cell.children[1].dataset.ninnumber;
        dispatch(ninsSlice.actions.startRemove(ninNumber));
      }
    },
    toggleShowNinAtProfile: function () {
      dispatch(ninsSlice.actions.showNinAtProfile());
    },
    toggleShowNinAtIdentity: function () {
      dispatch(ninsSlice.actions.showNinAtIdentity());
    },
  };
};

connect(mapStateToProps, mapDispatchToProps)(NinDisplay);

export default withRouter(NinDisplay);
