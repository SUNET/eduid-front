import { connect } from "react-redux";
import Header from "./Header";
import { startLogout } from "./Header_actions";
import i18n from "i18n-messages";

const mapStateToProps = (state, props) => {
  let confirmed;
  return {
    dashboard_url: state.config.dashboard_url,
    confirmed: confirmed,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleLogout: function (e) {
      dispatch(startLogout());
    },
    gotoSignin: function (e) {
      e.preventDefault();
      const dataNode = e.target.closest("div"),
        url = dataNode.dataset.dashboard_url;
      document.location.href = url;
    }
  };
};

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default i18n(HeaderContainer);

