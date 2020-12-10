import React, { Component } from "react";
import PropTypes from "prop-types";
import { Spinner } from "spin.js";

import "../login/styles/index.scss";

const spinnerOpts = {
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  fps: 20 // Frames per second when using setTimeout() as a fallback in IE 9
};

class Splash extends Component {
  componentDidMount() {
    if (!this.props.is_app_loaded) {
      const splash = this.refs.eduidSplash;
      const spinner = new Spinner(spinnerOpts).spin();
      splash.appendChild(spinner.el);
    }
  }

  render() {
    const comp = this.props.is_app_loaded ? (
      ""
    ) : (
      <div ref="eduidSplash" id="eduid-splash-screen" />
    );
    return comp;
  }
}

Splash.propTypes = {
  is_app_loaded: PropTypes.bool
};

export default Splash;
