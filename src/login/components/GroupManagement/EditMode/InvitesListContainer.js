import { connect } from "react-redux";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import * as getAllOutgoingActions from "../../../redux/actions/getOutgoingInvitesActions";
import InvitesList from "./InvitesList";

const mapStateToProps = (state, props) => {
  return {
    invitesFromMe: state.invites.invitesFromMe,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleGetAllInvites: () => {
      dispatch(getAllOutgoingActions.getAllOutgoingInvites());
    },
  };
};

const InvitesListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InvitesList);
export default i18n(InvitesListContainer);
