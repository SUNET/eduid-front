import { getWebauthnAssertion, cancelWebauthnAssertion } from "../../../redux/actions/getWebauthnAssertionActions";

export const assertionFromAuthenticator = async (
  webauthn_challenge,
  dispatch
) => {
  const webauthnAssertion = await navigator.credentials
    .get(webauthn_challenge)
    .then()
    .catch(() => {
      dispatch(cancelWebauthnAssertion());
    });
  if(webauthnAssertion !== undefined) {
    dispatch(getWebauthnAssertion(webauthnAssertion));
  }
};
