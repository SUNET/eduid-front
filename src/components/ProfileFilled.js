import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';

import 'style/ProfileFilled.scss';


class ProfileFilled extends Component{

  render(){
    const percent = Math.floor((this.props.cur * 100) / this.props.max);
    return(
      <li id="profile-filled-li">
        <div className="profile-filled profile-filled-large">
          <div className="title">
            {this.props.l10n('pfilled.completion')}: <span className="percentage"> {percent}%</span>
          </div>
          <div className="progress progress-striped">
            <div className="progress-bar profile-filled-progress-bar" style={{width: percent + '%'}} />
          </div>
        </div>
      </li>);
  }
}

ProfileFilled.propTypes = {
    max: PropTypes.number,
    cur: PropTypes.number,
}

export default ProfileFilled;
