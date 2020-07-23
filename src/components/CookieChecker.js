import React, { Component } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

class CookieChecker extends Component {
  render() {
    // console.log(this.props.cookieName)
    // if cookieName prop (determined by you around the hidden component) is not undefined
    if (this.props.cookieName !== undefined) {
      // get 'value' from cookie (using the cookieName you determined)
      const cookie = Cookies.get(this.props.cookieName);
      // if value (only a proof that a cookie with your determined props.cookieName is present)
      if (cookie) {
        // check if there is a cookiePattern (Y: use it, N: leave it blank)
        const pattern =
          this.props.cookiePattern !== undefined
            ? this.props.cookiePattern
            : "";
        // dset a regex to match for your pattern
        const regex = new RegExp(pattern);
        // test against the pattern
        if (regex.test(cookie)) {
          return this.props.children;
        }
      }
    }
    return <div />;
  }
}

CookieChecker.propTypes = {
  cookieName: PropTypes.string.isRequired,
  cookiePattern: PropTypes.string,
};

export default CookieChecker;
