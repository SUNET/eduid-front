
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from "reactstrap";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner'

import { FetchingContext } from "components/Main";

import 'style/EduIDButton.scss';


class EduIDButton extends Component {

  render () {
    return (
        <FetchingContext.Consumer>
            {({fetching, toggleFetching}) => {
                if (fetching) {
                    const classes = `${this.props.className} eduid-button has-spinner`;
                    return (
                      <button {...this.props}
                              disabled={true}
                              className={classes}>
                          {this.props.children}
                        <div className="spin-holder">
                          <FontAwesomeIcon icon={faSpinner} />
                        </div>
                      </button>
                    );
                } else {
                    const classes = `${this.props.className} eduid-button`;
                    return (
                      <button {...this.props}
                              className={classes}>
                        {this.props.children}
                      </button>
                    );
                }
            }}
        </FetchingContext.Consumer>
    );
  }
}

EduIDButton.propTypes = {
}

export default EduIDButton;
