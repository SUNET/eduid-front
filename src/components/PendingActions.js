import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/lib/Alert';

import 'style/PendingActions.scss';


class PendingActions extends Component {

  render () {
    let pdataMissing = true,
        toShow = this.props.pending.map( (missing, index) => {
        if (['given_name', 'surname', 'display_name', 'language'].indexOf(missing) >= 0) {
            if (pdataMissing) {
                pdataMissing = false;
                return (
                  <li key={index} className="pending-action-item">
                    <a href="/profile/personaldata">
                      {this.props.l10n('pending.pdata')}
                    </a>
                  </li>);
            }
        } else {
            return (
                <li key={index} className="pending-action-item">
                  <a onClick={this.props.handleGoToPending(missing).bind(this)}>
                   {this.props.l10n('pending.' + missing)}
                  </a>
                </li>
            );
        }
    }),
    toConfirm = this.props.pending_confirm.map((missing, index) => {
        return (
            <li key={index} className="pending-action-item">
              <a onClick={this.props.handleGoToPending(missing).bind(this)}>
               {this.props.l10n('pending_confirm.' + missing)}
              </a>
            </li>
        );
    });

    return (
        <ul className="list-unstyled pending-actions">
          {toShow}
          {toConfirm}
        </ul>
    );
  }
}

PendingActions.propTypes = {
    pending: PropTypes.array
}

export default PendingActions;
