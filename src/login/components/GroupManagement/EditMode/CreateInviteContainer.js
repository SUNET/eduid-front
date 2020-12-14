import { connect } from "react-redux";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import CreateInvite from "./CreateInvite";

const mapStateToProps = (state, props) => {
  return {
    values: state.form.emails.values,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    createInvite: (email) => {
      const inviteEmail = email.email;
      console.log("this is inviteEmail:", inviteEmail);
      // dispatch(createInvite(inviteEmail));
    },
  };
};

const CreateInviteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateInvite);
export default i18n(CreateInviteContainer);
