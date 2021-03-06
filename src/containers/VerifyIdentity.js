import { connect } from "react-redux";
import VerifyIdentity from "components/VerifyIdentity";
import i18n from "../login/translation/InjectIntl_HOC_factory";

const mapStateToProps = (state) => {
  let verifiedNinStatus = "";
  const nins = state.nins.nins.filter(nin => nin.verified);
  nins.length >= 1 ? (verifiedNinStatus = true) : (verifiedNinStatus = false);
  const verifiedSwePhone = state.phones.phones.some(phone => phone.verified && phone.number.includes(+46));
  return {
    nins: state.nins.nins,
    verifiedNin: nins,
    verifiedSwePhone: verifiedSwePhone,
    verifiedNinStatus: verifiedNinStatus,
    is_configured: state.config.is_configured,
    letter_verification: state.letter_proofing.confirmingLetter,
    proofing_methods: state.config.proofing_methods,
    message: state.nins.message
  };
};

const mapDispatchToProps = () => {
  return {};
};

const VerifyIdentityContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyIdentity);

export default i18n(VerifyIdentityContainer);
