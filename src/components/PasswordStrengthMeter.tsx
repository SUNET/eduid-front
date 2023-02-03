import { useDashboardAppSelector } from "dashboard-hooks";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { FormText } from "reactstrap";
import zxcvbn from "zxcvbn";

interface PasswordStrengthMeterProps {
  password?: string;
  passStateUp: (data: PasswordStrengthData) => void;
}

// Data passed UP from this component to the parent (using the passStateUp callback)
export interface PasswordStrengthData {
  score?: number;
  isTooWeak?: boolean;
}

function PasswordStrengthMeter(props: PasswordStrengthMeterProps) {
  const minRequiredEntropy = useDashboardAppSelector((state) => state.config.password_entropy);
  const pdata = useDashboardAppSelector((state) => state.personal_data);
  const emails = useDashboardAppSelector((state) => state.emails.emails);
  const [pwScore, setPwScore] = useState(0);
  const intl = useIntl();

  const pwStrengthMessages = ["pwfield.terrible", "pwfield.bad", "pwfield.weak", "pwfield.good", "pwfield.strong"];

  useEffect(() => {
    let userInput: string[] = [];
    if (pdata.given_name) userInput.push(pdata.given_name);
    if (pdata.surname) userInput.push(pdata.surname);
    if (pdata.display_name) userInput.push(pdata.display_name);
    userInput = userInput.concat(emails.map((x) => x.email));

    if (!minRequiredEntropy) {
      return;
    }

    let score = 0,
      minEntropy = minRequiredEntropy / 5,
      entropy = 0;
    const stepEntropy = minEntropy;
    const result = zxcvbn(props.password || "", userInput);
    entropy = Math.log(result.guesses);
    for (let n = 0; n < 5 && entropy > minEntropy; n++) {
      score = n;
      minEntropy += stepEntropy;
    }
    setPwScore(score);
    // Pass score up to the component above. We want it to reach the validate() function for the form.
    const data: PasswordStrengthData = { score: score, isTooWeak: entropy < minRequiredEntropy };
    props.passStateUp(data);
  }, [pdata, emails, minRequiredEntropy, props.password]);

  return (
    <React.Fragment>
      <meter max="4" value={pwScore} id="password-strength-meter" key="0" />
      <div className="form-field-error-area" key="1">
        <FormText>{intl.formatMessage({ id: pwStrengthMessages[pwScore] })}</FormText>
      </div>
    </React.Fragment>
  );
}

export default PasswordStrengthMeter;
