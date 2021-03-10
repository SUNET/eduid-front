import { connect } from "react-redux";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import InvitesParent from "./InvitesParent";

const mapStateToProps = (state) => {
  let groupIdsArray = [];
  let allInvitesFromMe = [];
  if (state.invites.invitesFromMe !== undefined) {
    allInvitesFromMe = state.invites.invitesFromMe;
    groupIdsArray = allInvitesFromMe.map((group) => group.group_identifier);
  }
  return {
    allInvitesFromMe,
    groupsWithInvites: groupIdsArray,
  };
};

const mapDispatchToProps = () => {
  return {};
};

const InvitesParentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InvitesParent);
export default i18n(InvitesParentContainer);
