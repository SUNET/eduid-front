import { useAppSelector } from "eduid-hooks";
import { signalAllAcceptedCredentials } from "helperFunctions/webauthnSignals";
import { useEffect } from "react";

/**
 * Tell the browser which passkeys the user still has, when the list of credentials is loaded or changes (after a key
 * is added or removed here, and after a removal made somewhere else, when the page is shown). Best effort, see
 * webauthnSignals.ts. Nothing is sent until the credentials have been loaded from a backend that knows the data.
 */
export function useSignalAcceptedCredentials() {
  const credentials = useAppSelector((state) => state.security.credentials);
  const rpId = useAppSelector((state) => state.security.rp_id);
  const userHandle = useAppSelector((state) => state.security.webauthn_user_handle);

  useEffect(() => {
    // best effort: errors are handled inside, and nothing waits for the result
    void signalAllAcceptedCredentials(rpId, userHandle, credentials);
  }, [rpId, userHandle, credentials]);
}
