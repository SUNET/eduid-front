
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner'

import { FetchingContext } from "components/Main";

import 'style/EduIDButton.scss';


class EduIDButton extends Component {

  render () {
    return (
        <FetchingContext.Consumer>
            {fetching => {
                if (fetching) {
                    return (
        				<Button className="active has-spinner"
                                disabled={true}
                                {...this.props}>
            				{this.props.children}
							<div className="spin-holder">
								<FontAwesomeIcon icon={faSpinner} />
							</div>
        				</Button>
                    );
                } else {
					return (
						<Button className="has-spinner"
                                {...this.props}>
							{this.props.children}
						</Button>
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
