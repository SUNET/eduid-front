
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from "js-cookie";


class CookieCHecker extends Component {

    render () {

        if (this.props.cookieName !== undefined) {
            const cookie = Cookies.get(this.props.cookieName);
            if (cookie) {
                const pattern = (this.props.cookiePattern !== undefined)? this.props.cookiePattern : '';
                const regex = new RegExp(pattern);
                if (regex.test(cookie)) {
                    return this.props.children;
                }
            }
        }
        return <div />;
    }
}

CookieCHecker.propTypes = {
    cookieName: PropTypes.string.isRequired,
    cookiePattern: PropTypes.string
};

export default CookieCHecker;
