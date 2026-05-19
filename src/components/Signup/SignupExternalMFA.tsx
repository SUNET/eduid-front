import { bankIDApi } from "apis/eduidBankid";
import { eidasApi } from "apis/eduidEidas";
import { frejaeIDApi } from "apis/eduidFrejaeID";
import EduIDButton from "components/Common/EduIDButton";
import { WizardLink } from "components/Common/WizardLink";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { FormattedMessage, useIntl } from "react-intl";
import { Fragment } from "react/jsx-runtime";
import { signupSlice } from "slices/Signup";

export function SignupExternalMFA(): React.JSX.Element {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const [bankIDMfaRegister] = bankIDApi.useLazyBankIDMfaRegisterQuery();
  const [eidasMfaRegister] = eidasApi.useLazyEidasMfaRegisterQuery();
  const [frejaMfaRegister] = frejaeIDApi.useLazyFrejaeIDMfaRegisterQuery();
  const loginRef = useAppSelector((state) => state.login.ref);

  const handleExternalMfa = async (method: "bankid" | "freja_eid" | "eidas") => {
    const authenticateMap = {
      bankid: bankIDMfaRegister,
      freja_eid: frejaMfaRegister,
      eidas: eidasMfaRegister,
    };

    const response = await authenticateMap[method]();
    if (response.isSuccess && response.data.payload.location) {
      globalThis.location.assign(response.data.payload.location);
    }
  };

  return (
    <Fragment>
      <section className="intro">
        <h1>
          <FormattedMessage
            defaultMessage="Create eduID: Verify your identity"
            description="Signup external MFA title"
          />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              defaultMessage="Use your digital ID to verify your identity. This is the fastest way to create your eduID account."
              description="Signup external MFA lead text"
            />
          </p>
        </div>
      </section>
      <div className="external-mfa-options">
        <EduIDButton buttonstyle="primary" id="signup-bankid" onClick={() => handleExternalMfa("bankid")}>
          BankID
        </EduIDButton>
        <EduIDButton buttonstyle="primary" id="signup-freja" onClick={() => handleExternalMfa("freja_eid")}>
          Freja eID
        </EduIDButton>
        <EduIDButton buttonstyle="primary" id="signup-eidas" onClick={() => handleExternalMfa("eidas")}>
          eIDAS
        </EduIDButton>
      </div>
      <WizardLink
        nextText={intl.formatMessage({
          id: "wizard link signup with email and name",
          defaultMessage: "Sign up with email and name",
        })}
        nextOnClick={() => dispatch(signupSlice.actions.setNextPage("SIGNUP_EMAIL_FORM"))}
      />
    </Fragment>
  );
}
