import { connect } from "react-redux";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import * as getAllOutgoingActions from "../../../redux/actions/getOutgoingInvitesActions";
import InvitesParent from "./InvitesParent";

const mapStateToProps = (state) => {
  let groupIdsArray = [];
  if (state.invites.invitesFromMe !== undefined) {
    groupIdsArray = state.invites.invitesFromMe.map(
      (group) => group.group_identifier
    );
  }
  return {
    groupsWithInvites: groupIdsArray,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetAllOutgoingInvites: () => {
      dispatch(getAllOutgoingActions.getAllOutgoingInvites());
    },
  };
};

const InvitesParentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InvitesParent);
export default i18n(InvitesParentContainer);
