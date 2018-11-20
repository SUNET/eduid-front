import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FormText } from 'reactstrap';
import { FormGroup } from 'reactstrap';
import { Input } from 'reactstrap';
import { Label } from 'reactstrap';
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
    let validationState = '';
    if (meta.touched || meta.submitFailed) {
        validationState = meta.error && 'invalid' || 'valid';
    }
    const errmsg = validationState === 'invalid' && l10n(meta.error) || '';
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
            <Input type={componentClass}
                   disabled={disabled}
                   placeholder={placeholder}
                   {...validationState}
                   {...input}>
                {children}
            </Input>
        );
    } else {
        field = <Input type={componentClass}
                       disabled={disabled}
                       placeholder={placeholder}
                       {...validationState}
                       {...input} /> ;
    }

    if (helpBlock === undefined) {
        help = (<FormText>{errmsg}</FormText>);
    } else {help = helpBlock}

    return (
        <FormGroup id={input.name}>
          <Label>{label}</Label>
          {field }
          {help}
        </FormGroup>
    );
}

export default i18n(textInput);

