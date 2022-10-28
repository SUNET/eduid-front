import React from "react";
import EduIDButton from "components/EduIDButton";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import { translate } from "login/translation";
import { eidasMfaAuthenticate } from "apis/eduidEidas";
import { FormattedMessage } from "react-intl";

function FrejaeID(): JSX.Element | null {
  // compose external link
  const frejaUrlDomain = useAppSelector((state) => state.config.eidas_url);
  const ref = useAppSelector((state) => state.login.ref);
  const dispatch = useAppDispatch();

  if (!frejaUrlDomain) {
    return null;
  }

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
        <h4>
          <FormattedMessage defaultMessage={`Freja eID+`} />
        </h4>
        <EduIDButton buttonstyle="secondary" type="submit" onClick={handleOnClick} id="mfa-freja">
          <FormattedMessage
            defaultMessage={`Use my {freja_eidplus_verbatim}`}
            values={{ freja_eidplus_verbatim: <span className="verbatim">Freja&nbsp;eID+</span> }}
          />
        </EduIDButton>
      </div>
    </div>
  );
}

export default FrejaeID;
