import { getWebauthnAssertion, cancelWebauthnAssertion } from "../../../redux/actions/getWebauthnAssertionActions";

export const assertionFromAuthenticator = async (
  webauthn_challenge,
  dispatch
) => {
  const webauthnAssertion = await navigator.credentials
    .get(webauthn_challenge)
    .then()
    .catch(() => {
      return dispatch(cancelWebauthnAssertion());
    });
  if(webauthnAssertion !== undefined) {
    return dispatch(getWebauthnAssertion(webauthnAssertion));
  }
};
