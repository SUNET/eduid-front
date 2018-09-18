import React, { Component } from 'react';
import PropTypes from 'prop-types';

import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import i18n from 'i18n-messages';


const textInput = (props) => {
    const {
        input,
        label,
        type,
        meta,
        selectOptions,
        componentClass,
        l10n,
        disabled,
        helpBlock,
        placeholder
    } = props;
    let validationState = null;
    if (meta.touched || meta.submitFailed) {
        validationState = meta.error && 'error' || 'success';
    }
    const errmsg = validationState === 'error' && l10n(meta.error) || '';
    let help, field;

    if (componentClass === 'select') {
        let options = [];
        if (selectOptions) {
            options = selectOptions.slice();
        }
        const children = options.map(opt => {
            return (<option key={opt[0]}
                            value={opt[0]}>
                      {opt[1]}
                    </option>);
        });
        field = (
            <FormControl componentClass={componentClass}
                         disabled={disabled}
                         placeholder={placeholder}
                         {...input}>
                {children}
            </FormControl>
        );
    } else {
        field = <FormControl componentClass={componentClass}
                             type={type}
                             disabled={disabled}
                             placeholder={placeholder}
                             {...input} /> ;
    }

    if (helpBlock === undefined) {
        help = [(<FormControl.Feedback key="0" />),
          (<div className="form-field-error-area" key="1">
            <HelpBlock>{errmsg}</HelpBlock>
          </div>)];
    } else {help = helpBlock}

    return (
        <FormGroup controlId={input.name}
                   validationState={validationState}>
          <ControlLabel>{label}</ControlLabel>
          {field }
          {help}
        </FormGroup>
    );
}

export default i18n(textInput);

