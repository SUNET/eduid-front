
import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
                    return (
        				<button className="eduid-button active has-spinner"
                                disabled={true}
                                {...this.props}>
            				{this.props.children}
							<div className="spin-holder">
								<FontAwesomeIcon icon={faSpinner} />
							</div>
        				</button>
                    );
                } else {
					return (
						<button className="has-spinner"
                                {...this.props}>
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
