// import { connect } from "react-redux";

// import i18n from "i18n-messages";
// import Header from "components/HeaderAnon";

// const mapStateToProps = (state, props) => {
//   return {
//     dashboard_url: state.config.dashboard_url,
//     students_link: state.config.students_link,
//     technicians_link: state.config.technicians_link,
//     staff_link: state.config.staff_link,
//     faq_link: state.config.faq_link
//     // size: state.config.window_size
//   };
// };

// const mapDispatchToProps = (dispatch, props) => {
//   return {
//     gotoSignup: function(e) {
//       e.preventDefault();
//       document.location.href = "/";
//     },
//     gotoSignin: function(e) {
//       e.preventDefault();
//       const dataNode = e.target.closest("div"),
//         url = dataNode.dataset.dashboard_url;
//       document.location.href = url;
//     }
//   };
// };

// const HeaderContainer = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Header);

// export default i18n(HeaderContainer);
