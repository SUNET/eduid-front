import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Splash from "components/Splash";
import { useEffect, useRef, useState } from "react";
import { Field as FinalField, Form as FinalForm } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import EduIDButton from "../../../../components/EduIDButton";
import { useAppDispatch, useAppSelector } from "../../../app_init/hooks";
import { emptyStringPattern } from "../../../app_utils/validation/regexPatterns";
import resetPasswordSlice, { ExtraSecurityType } from "../../../redux/slices/resetPasswordSlice";
import CustomInput from "../../Inputs/CustomInput";

const newPasswordFormId = "new-password-form";

interface NewPasswordFormData {
  "new-password"?: string;
}

interface NewPasswordFormProps {
  extra_security?: ExtraSecurityType;
  suggested_password: string | undefined;
}

function NewPasswordForm(props: NewPasswordFormProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selected_option = useAppSelector((state) => state.resetPassword.selected_option);

  function validateNewPassword(values: NewPasswordFormData) {
    const newPassword = values["new-password"];
    const errors: NewPasswordFormData = {};

    if (!newPassword || emptyStringPattern.test(newPassword)) {
      errors["new-password"] = "required";
    } else if (newPassword !== props.suggested_password) {
      errors["new-password"] = "chpass.different-repeat";
    }
    return errors;
  }

  function submitNewPasswordForm(values: NewPasswordFormData) {
    const newPassword = values["new-password"];

    if (!newPassword) {
      return;
    }

    dispatch(resetPasswordSlice.actions.storeNewPassword(newPassword));
    if (!selected_option || selected_option === "without") {
      dispatch(resetPasswordSlice.actions.setNewPassword());
    } else if (selected_option === "phoneCode") {
      dispatch(resetPasswordSlice.actions.setNewPasswordExtraSecurityPhone());
    } else if (selected_option === "securityKey") {
      dispatch(resetPasswordSlice.actions.setNewPasswordExtraSecurityToken());
    } else if (selected_option === "freja") {
      dispatch(resetPasswordSlice.actions.setNewPasswordExtraSecurityExternalMfa());
    }
  }

  return (
    <FinalForm<NewPasswordFormData>
      onSubmit={submitNewPasswordForm}
      validate={validateNewPassword}
      render={(formProps) => {
        return (
          <form id={newPasswordFormId} onSubmit={formProps.handleSubmit}>
            <input
              autoComplete="new-password"
              type="password"
              name="display-none-new-password"
              id="display-none-new-password"
              defaultValue={formProps.values["new-password"] && formProps.values["new-password"]}
            />
            <FinalField
              id="new-password"
              type="text"
              name="new-password"
              component={CustomInput}
              required={true}
              label={<FormattedMessage defaultMessage="Repeat new password" description="Set new password" />}
              placeholder="xxxx xxxx xxxx"
              autoFocus={true}
            />

            <div className="buttons">
              {props.extra_security && Object.keys(props.extra_security).length > 0 && (
                <EduIDButton
                  buttonstyle="secondary"
                  id="go-back-button"
                  onClick={() => navigate("/reset-password/extra-security")}
                >
                  <FormattedMessage defaultMessage="go back" description="Set new password (go back to eduID button)" />
                </EduIDButton>
              )}
              <EduIDButton buttonstyle="primary" id="new-password-button" disabled={formProps.invalid}>
                <FormattedMessage defaultMessage="accept password" description="Set new password (accept button)" />
              </EduIDButton>
            </div>
          </form>
        );
      }}
    />
  );
}

function SetNewPassword(): JSX.Element {
  const navigate = useNavigate();
  const suggested_password = useAppSelector((state) => state.resetPassword.suggested_password);
  const selected_option = useAppSelector((state) => state.resetPassword.selected_option);
  const extra_security = useAppSelector((state) => state.resetPassword.extra_security);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [tooltipCopied, setTooltipCopied] = useState(false); // say "Copy to clipboard" or "Copied!" in tooltip

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPassword(suggested_password);
  }, [suggested_password]);

  // Change path to extra-security without selected option on reload
  useEffect(() => {
    if (selected_option === undefined) {
      navigate("/reset-password/extra-security");
    }
  }, [selected_option]);

  const copyToClipboard = () => {
    if (ref && ref.current) {
      ref.current.select();
      document.execCommand("copy");
      setTooltipCopied(true);
      (document.getElementById("icon-copy") as HTMLInputElement).style.display = "none";
      (document.getElementById("icon-check") as HTMLInputElement).style.display = "inline";
      setTimeout(() => {
        (document.getElementById("icon-copy") as HTMLInputElement).style.display = "inline";
        (document.getElementById("icon-check") as HTMLInputElement).style.display = "none";
        setTooltipCopied(false);
      }, 1000);
    }
  };

  return (
    <Splash showChildren={!!password}>
      <h2>
        <FormattedMessage defaultMessage="Set your new password" description="Set new password" />
      </h2>
      <p>
        <FormattedMessage
          defaultMessage={`A strong password has been generated for you. To proceed you will need to repeat copy the
                          password in to the Repeat new password field and click Accept Password.`}
          description="Set new password"
        />
      </p>

      <div className="reset-password-input">
        <label htmlFor="copy-new-password">
          <FormattedMessage defaultMessage="New password" description="Set new password" />
        </label>
        <input
          name="copy-new-password"
          id="copy-new-password"
          ref={ref}
          defaultValue={password && password}
          readOnly={true}
        />
        <button id="clipboard" className="icon-only copybutton" onClick={copyToClipboard}>
          <FontAwesomeIcon id={"icon-copy"} icon={faCopy as IconProp} />
          <FontAwesomeIcon id={"icon-check"} icon={faCheck as IconProp} />
          <div className="tool-tip-text" id="tool-tip">
            {tooltipCopied ? (
              <FormattedMessage defaultMessage="Copied!" description="Reset password copy password tooltip" />
            ) : (
              <FormattedMessage defaultMessage="Copy to clipboard" description="Reset password copy password tooltip" />
            )}
          </div>
        </button>
      </div>

      <NewPasswordForm suggested_password={suggested_password} extra_security={extra_security} />
    </Splash>
  );
}

export default SetNewPassword;
