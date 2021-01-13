 /* eslint-disable */ 
 
import { connect } from "react-redux";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import InvitesList from "./InvitesList";

const mapStateToProps = (state, props) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleRemoveOutgoingInvite: () => {
      // console.log("you're in handleRemoveOutgoingInvite in the container");
      // TODO: write functionality to remove an item from temporary list 
    },
  };
};

const InvitesListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InvitesList);
export default i18n(InvitesListContainer);
