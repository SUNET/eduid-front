import { connect } from "react-redux";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import * as getAllOutgoingActions from "../../../redux/actions/getOutgoingInvitesActions";
import InvitesDataPanel from "./InvitesParent";

const mapStateToProps = (state, props) => {
  console.log(
    "this is state.invites.invitesFromMe:",
    state.invites.invitesFromMe
  );
  // let groupsWithMembers;
  return {
    invitesFromMe: state.invites.invitesFromMe,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleGetAllOutgoingInvites: () => {
      dispatch(getAllOutgoingActions.getAllOutgoingInvites());
    },
    // handleRemoveOutgoingInvite: () => {
    //   console.log("your in handle remove in the container");
    // },
  };
};

const InvitesDataPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InvitesDataPanel);
export default i18n(InvitesDataPanelContainer);
