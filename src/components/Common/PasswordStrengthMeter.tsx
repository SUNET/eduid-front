import { useAppSelector } from "eduid-hooks";
import React, { useEffect, useMemo } from "react";
import { useIntl } from "react-intl";
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
  const minRequiredEntropy = useAppSelector((state) => state.config.password_entropy);
  const pdata = useAppSelector((state) => state.personal_data);
  const emails = useAppSelector((state) => state.emails.emails);
  const intl = useIntl();
  const pwStrengthMessages = ["pwfield.terrible", "pwfield.bad", "pwfield.weak", "pwfield.good", "pwfield.strong"];

  // Calculate password score directly during render
  const { pwScore, data } = useMemo(() => {
    let userInput: string[] = [];
    if (pdata.response?.given_name) userInput.push(pdata.response?.given_name);
    if (pdata.response?.surname) userInput.push(pdata.response?.surname);
    if (pdata.response?.chosen_given_name) userInput.push(pdata.response?.chosen_given_name);
    userInput = userInput.concat(emails.map((x) => x.email));

    if (!minRequiredEntropy) {
      return { pwScore: 0, data: { score: 0, isTooWeak: false } };
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

    const data: PasswordStrengthData = { score: score, isTooWeak: entropy < minRequiredEntropy };
    return { pwScore: score, data };
  }, [pdata, emails, minRequiredEntropy, props.password]);

  // Pass score up to parent component when it changes
  useEffect(() => {
    props.passStateUp(data);
  }, [data, props]);

  return (
    <React.Fragment>
      <code className={`form-field-error-area ${pwScore >= 3 ? "success" : ""}`} key="1">
        {props.password !== undefined && (
          <div className="form-group">{intl.formatMessage({ id: pwStrengthMessages[pwScore] })}</div>
        )}
      </code>
      <div className="meter-wrapper">
        <meter max="4" value={pwScore} id="password-strength-meter" key="0" />
      </div>
    </React.Fragment>
  );
}

export default PasswordStrengthMeter;
