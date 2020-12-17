import { connect } from "react-redux";
import Header from "./Header";
import { startLogout } from "./Header_actions";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";

const mapStateToProps = (state) => {
  let confirmed;
  return {
    dashboard_url: state.config.dashboard_url,
    confirmed: confirmed
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogout: function() {
      dispatch(startLogout());
    },
    gotoSignin: function(e) {
      e.preventDefault();
      const dataNode = e.target.closest("div"),
        url = dataNode.dataset.dashboard_url;
      document.location.href = url;
    }
  };
};

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default InjectIntl(HeaderContainer);
