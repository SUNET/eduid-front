import { eidasMfaAuthenticate } from "apis/eduidEidas";
import EduIDButton from "components//Common/EduIDButton";
import { useAppDispatch, useAppSelector } from "hooks";
import { FormattedMessage } from "react-intl";

export function FrejaeID(): JSX.Element {
  const authn_options = useAppSelector((state) => state.login.authn_options);
  const ref = useAppSelector((state) => state.login.ref);
  const dispatch = useAppDispatch();
  const notAvailable = !authn_options.freja_eidplus;

  async function handleOnClick() {
    const response = await dispatch(
      eidasMfaAuthenticate({ method: "freja", frontend_action: "loginMfaAuthn", frontend_state: ref })
    );
    if (eidasMfaAuthenticate.fulfilled.match(response)) {
      if (response.payload.location) {
        window.location.assign(response.payload.location);
      }
    }
  }

  return (
    <div className="option-wrapper">
      <div className="option">
        <h3>
          <FormattedMessage defaultMessage={`Freja eID+`} />
        </h3>

        {notAvailable && (
          <p className="help-text">
            <FormattedMessage
              description="MFA Freja help text"
              defaultMessage="Requires a confirmed Swedish national identity number."
            />
          </p>
        )}

        <EduIDButton
          buttonstyle="secondary"
          type="submit"
          onClick={handleOnClick}
          id="mfa-freja"
          disabled={notAvailable}
        >
          <FormattedMessage
            defaultMessage={`Use my {freja_eidplus_verbatim}`}
            values={{ freja_eidplus_verbatim: <span className="verbatim">Freja&nbsp;eID+</span> }}
          />
        </EduIDButton>
      </div>
    </div>
  );
}
