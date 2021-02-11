import { connect } from "react-redux";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import InvitesList from "./InvitesList";

const mapStateToProps = (state, props) => {
  let allInvitesFromMe = [];
  if (state.invites.invitesFromMe !== undefined) {
    allInvitesFromMe = state.invites.invitesFromMe;
  }

  return {
    allInvitesFromMe,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

const InvitesListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InvitesList);
export default i18n(InvitesListContainer);
