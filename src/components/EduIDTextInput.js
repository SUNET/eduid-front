import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FormText } from 'reactstrap';
import { FormGroup } from 'reactstrap';
import { FormFeedback } from 'reactstrap';
import { Input } from 'reactstrap';
import { Label } from 'reactstrap';
import i18n from 'i18n-messages';


const textInput = (props) => {
    const {
        input,
        label,
        name,
        meta,
        selectOptions,
        componentClass,
        l10n,
        disabled,
        helpBlock,
        placeholder
    } = props;
    let valid = false,
	invalid = false;
    if (meta.touched || meta.submitFailed) {
	if (meta.error) {
	    invalid = true;
	} else {
	    valid = true;
	}
    }
    const errmsg = invalid && l10n(meta.error) || '';
    let feedback = '',
	help;
    if (errmsg !== '') {
        feedback = <span className="eduid-field-error">{errmsg}</span>;
        help = <FormText>{feedback} | {helpBlock}</FormText>;
    } else {
        help = <FormText>{helpBlock}</FormText>;
    }

    let field;

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
	           id={name}
                   valid={valid}
	           invalid={invalid}
                   {...input}>
                {children}
            </Input>
        );
    } else {
        field = <Input type={componentClass}
                       disabled={disabled}
                       placeholder={placeholder}
	               id={name}
		       valid={valid}
		       invalid={invalid}
                       {...input} /> ;
    }

    return (
        <FormGroup id={input.name}>
          <Label for={name}>{label}</Label>
          {field }
	  {help}
        </FormGroup>
    );
}

export default i18n(textInput);

