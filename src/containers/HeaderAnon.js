
import { connect } from 'react-redux';

import i18n from 'i18n-messages';
import Header from 'components/HeaderAnon';

const mapStateToProps = (state, props) => {
    return {
        dashboard_url: state.main.dashboard_url,
        students_link: state.main.students_link,
        technicians_link: state.main.technicians_link,
        staff_link: state.main.staff_link,
        faq_link: state.main.faq_link,
        size: state.main.window_size
    }
};


const mapDispatchToProps = (dispatch, props) => {
    return {
        gotoSignup: function (e) {
            e.preventDefault();
            document.location.href = '/';
        },
        gotoSignin: function (e) {
            e.preventDefault();
            const dataNode = e.target.closest("div"),
                  url = dataNode.dataset.dashboard_url;
            document.location.href = url;
        },
    }
};

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default i18n(HeaderContainer);
