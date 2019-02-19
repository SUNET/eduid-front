
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import EduIDButton from 'components/EduIDButton';
import DeleteModal from 'components/DeleteModal';
import GenericConfirmModal from 'components/GenericConfirmModal';
import ConfirmModal from 'components/ConfirmModal';

import 'style/Security.scss';


class Security extends Component {

  render () {
    if (this.props.redirect_to !== '') {
        window.location.href = this.props.redirect_to;
        return null
    }
    if (this.props.deleted) {
        window.location.href = 'https://eduid.se';
        return null
    }
    let creds_table = this.props.credentials.map((cred, index) => {
            let btnRemove = '';
            let btnVerify = '';
            if (cred.credential_type === 'security.webauthn_credential_type') {
                btnRemove = (<div className="btn-group btn-group-sm" role="group">
                              <button className="btn btn-link btn-remove-webauthn"
                                   onClick={this.props.handleRemoveWebauthnToken}>
                              {this.props.l10n('security.remove')}
                              </button>
                            </div>);
                if (cred.verified) {
                  btnVerify = (<div className="btn-group btn-group-sm" role="group">
                                <button className="btn btn-link btn-verified-webauthn" disabled>
                                {this.props.l10n('security.verified')}
                                </button>
                              </div>);
                } else if (cred.used_for_login && !cred.verified) {
                  btnVerify = (<div className="btn-group btn-group-sm" role="group">
                           <button className="btn btn-link btn-verify-webauthn"
                                   onClick={this.props.handleVerifyWebauthnToken}>
                             {this.props.l10n('security.verify')}
                           </button>
                         </div>);
                }
            }
            const date_created = new Date(cred.created_ts).toISOString().split('T')[0];
            let date_success = '';
            if (cred.success_ts) {
                date_success = new Date(cred.success_ts).toISOString().split('T')[0];
            }
            return (<tr key={index} className="webauthn-token-holder" data-token={cred.key}>
                        <td>{this.props.l10n(cred.credential_type)}</td>
                        <td data-toggle="tooltip" data-placement="top" title={new Date(cred.created_ts).toString()}>{date_created}</td>
                        <td data-toggle="tooltip" data-placement="top" title={new Date(cred.success_ts).toString()}>{date_success}</td>
                        <td>{cred.description}</td>
                        <td>{btnVerify}</td>
                        <td>{btnRemove}</td>
                    </tr>
            );
        }, this);

    return (
        <div>
          <div className="intro">
              <h4>{this.props.l10n('security.main_title')}</h4>
              <p>{this.props.l10n('security.long_description')}</p>
          </div>
          <table className="table table-bordered table-form passwords">
              <tbody>
                <tr>
                    <th>{this.props.l10n('security.credential')}</th>
                    <th>{this.props.l10n('security.creation_date')}</th>
                    <th>{this.props.l10n('security.last_used')}</th>
                    <th>{this.props.l10n('security.description')}</th>
                    <th>{this.props.l10n('security.verify')}</th>
                    <th>{this.props.l10n('security.remove')}</th>
                </tr>
                {creds_table}
              </tbody>
          </table>
          <div id="change-password">
            <EduIDButton className="btn-primary"
                        id="security-change-button"
                        onClick={this.props.handleStartConfirmationPassword}>
                      {this.props.l10n('security.change_password')}
            </EduIDButton>
          </div>
          <div id="add-webauthn-token">
            <EduIDButton className="btn-primary"
                        id="security-webauthn-button"
                        onClick={this.props.handleStartAskingWebauthnDescription}>
                      {this.props.l10n('security.add_webauthn_token')}
            </EduIDButton>
          </div>
          <div className="second-block">
              <div className="intro">
                 <h4>{this.props.l10n('security.account_title')}</h4>
                 <p>{this.props.l10n('security.account_description')}</p>
              </div>
              <EduIDButton className="btn btn-danger"
                           id="delete-button"
                           onClick={this.props.handleStartConfirmationDeletion}>
                        {this.props.l10n('security.delete_account')}
              </EduIDButton>
          </div>
          <GenericConfirmModal
                modalId="securityConfirmDialog"
                title={this.props.l10n('security.confirm_title_chpass')}
                mainText={this.props.l10n('security.change_info')}
                showModal={this.props.confirming_change}
                closeModal={this.props.handleStopConfirmationPassword}
                acceptModal={this.props.handleConfirmationPassword}
          />
          <DeleteModal
                title={this.props.l10n('security.confirm_title_deletion')}
                showModal={this.props.confirming_deletion}
                closeModal={this.props.handleStopConfirmationDeletion}
                handleConfirm={this.props.handleConfirmationDeletion}
          />
          <ConfirmModal
              modalId="describeWebauthnTokenDialog"
              controlId="describeWebauthnTokenDialogControl"
              title={this.props.l10n('security.webauthn-describe-title')}
              resendLabel=""
              resendHelp=""
              resendText=""
              placeholder=""
              with_resend_link={false}
              showModal={Boolean(this.props.webauthn_asking_description)}
              closeModal={this.props.handleStopAskingWebauthnDescription}
              handleConfirm={this.props.handleStartWebauthnRegistration} />

        </div>
    );
  }
}

Security.propTypes = {
  credentials: PropTypes.array,
  creation_date: PropTypes.string,
  last_used: PropTypes.string,
  langs: PropTypes.array,
  confirming_change: PropTypes.bool,
  deleted: PropTypes.bool,
  handleStartConfirmationPassword: PropTypes.func,
  handleStopConfirmationPassword: PropTypes.func,
  handleConfirmationPassword: PropTypes.func,
  confirming_deletion: PropTypes.bool,
  handleStartConfirmationDeletion: PropTypes.func,
  handleStopConfirmationDeletion: PropTypes.func,
  handleConfirmationDeletion: PropTypes.func,
  handleStartWebauthnRegistration: PropTypes.func,
  handleCloseWebauthnModal: PropTypes.func
}

export default Security;
