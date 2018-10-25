
import { connect } from 'react-redux';
import ProfileFilled from 'components/ProfileFilled';
import i18n from 'i18n-messages';


const mapStateToProps = (state, props) => {
  return {
      max: state.profile.max,
      cur: state.profile.cur
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
  }
};

const ProfileFilledContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileFilled);

export default i18n(ProfileFilledContainer);
