
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { ButtonGroup } from 'reactstrap';
import TextInput from 'components/EduIDTextInput';
import EduIDButton from 'components/EduIDButton';
import vettingRegistry from "vetting-registry";

import 'style/Nins.scss';


const validate = values => {
  let value = values.norEduPersonNin;
  // accept only digits
  if (/[^0-9]+/.test(value)) return {norEduPersonNin: 'nins.illegal_chars'};
  if (value.length !== 12) return {norEduPersonNin: 'nins.wrong_length'};

  // The Luhn Algorithm. It's so pretty.
  // taken from https://gist.github.com/DiegoSalazar/4075533/
  let nCheck = 0, bEven = false;
  value = value.slice(2);  // To pass the Luhn check only use the 10 last digits
  for (let n = value.length - 1; n >= 0; n--) {
    let cDigit = value.charAt(n),
      nDigit = parseInt(cDigit, 10);
    if (bEven) {
      if ((nDigit *= 2) > 9) nDigit -= 9;
    }
    nCheck += nDigit;
    bEven = !bEven;
  }
  if ((nCheck % 10) !== 0) {
    return {norEduPersonNin: 'nins.invalid_nin'};
  }
  return {}
}


let NinForm = props => {
    return [(
      <form id="nins-form"
            role="form"
            key="1">
        <fieldset id="nins-form" className="tabpane">
          <Field component={TextInput}
                 componentClass="input"
                 type="text"
                 name="norEduPersonNin"
                 id="norEduPersonNin-input"
                 className="nin-proofing-input"
                 placeholder={props.l10n('nins.input_placeholder')}
                 helpBlock={props.l10n('nins.input_help_text')} />
        </fieldset>
      </form>),
      (<ButtonGroup vertical={true} id="nins-btn-group" key="2">
        {props.buttons}
      </ButtonGroup>)
    ]
};

NinForm = reduxForm({
  form: 'nins',
  validate
})(NinForm)

NinForm = connect(
  state => ({
    initialValues: {norEduPersonNin: state.nins.nin},
    enableReinitialize: true
  })
)(NinForm)


class Nins extends Component {

  render () {
    let ninStatus = 'nonin',
        credsTable = '',
        vettingButtons = '',
        ninInput = '',
        verifiedNin = '';
    if (this.props.is_configured) {
        const vettingBtns = vettingRegistry(!this.props.valid_nin);
        vettingButtons = this.props.proofing_methods.map((key, index) => {
          return (<div key={index}>{vettingBtns[key]}</div>);
        });
    }
    if (this.props.nins.length) {
        ninStatus = 'unverified';
        const nins = this.props.nins.filter((nin) => nin.verified);
        if (nins.length === 1) {
            ninStatus = 'verified';
            verifiedNin = nins[0].number;
        }
    }
    if (ninStatus === 'nonin') {
        ninInput = ([
            <div key="1">{this.props.l10n('nins.help_text')}</div>,
            <div key="2" className="proofing-buttons">
              <NinForm buttons={vettingButtons} {...this.props} />
            </div>
        ]);
    } else if (ninStatus === 'unverified') {
        const ninList = (this.props.nins.map( (nin, index) => {
            return (
               <div className="nin-holder" id="eduid-unconfirmed-nin" key={index} data-ninnumber={nin.number}>
                  <strong>{nin.number}</strong>
                  <EduIDButton className="btn-danger"
                               id={'button-rm-nin-'+nin.number}
                               className="btn-sm"
                               onClick={this.props.handleDelete}>
                      {this.props.l10n('nins.button_delete')}
                  </EduIDButton>
               </div>
            );
        }));
        credsTable = (
            <div>
              <p><strong>{this.props.l10n('nins.unconfirmed_nin')}</strong></p>
              {ninList}
            </div>
        );
        if (this.props.nins.length > 1) {
            ninInput = this.props.l10n('nins.only_one_to_verify');
        } else {
            ninInput = vettingButtons;
        }

    } else if (ninStatus === 'verified') {
        credsTable = (
            <div>
              <p><strong>{this.props.l10n('nins.confirmed_nin')}</strong></p>
              <p>
                <span>{verifiedNin}</span>
              </p>
            </div>
        );
    }

    return (
        <div>
          <div className="intro">
              <h4>{this.props.l10n('nins.main_title')}</h4>
                <p>{this.props.l10n('nins.justification')}</p>
                <p>{this.props.l10n('faq_link')} <a href="https://www.eduid.se/faq.html">FAQ</a></p>
                {credsTable}
          </div>
          {ninInput}
        </div>
    );
  }
}

Nins.propTypes = {
  nin: PropTypes.string,
  nins: PropTypes.array,
  validateNin: PropTypes.func,
  handleDelete: PropTypes.func,
  proofing_methods: PropTypes.array
}

export default Nins;
