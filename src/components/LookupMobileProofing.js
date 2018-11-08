
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EduIDButton from 'components/EduIDButton';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import 'style/LookupMobileProofing.scss';


class LookupMobileProofing extends Component {

  render () {
    let spinning = false;
    if (!this.props.disabled && this.props.is_fetching) spinning = true;

    return (
        <div>
          <form id="lookup-mobile-proofing-form"
                className="form-horizontal"
                role="form">
            <fieldset id="lookup-mobile-proofing">
              <EduIDButton bsStyle="primary"
                      spinning={spinning}
                      disabled={this.props.disabled}
                      onClick={this.props.handleLookupMobile}
                      block>
                    {this.props.l10n('lmp.confirm-lookup-mobile')}
              </EduIDButton>
              <HelpBlock>{this.props.l10n('lmp.initialize_proofing_help_text')}</HelpBlock>
            </fieldset>
          </form>
        </div>
    );
  }
}

LookupMobileProofing.propTypes = {
  is_fetching: PropTypes.bool,
  disabled: PropTypes.bool,
  handleLookupMobile: PropTypes.func
}

export default LookupMobileProofing;

