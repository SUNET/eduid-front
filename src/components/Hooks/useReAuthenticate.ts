import { ActionStatus, securityApi } from "apis/eduidSecurity";
import { useAppDispatch } from "eduid-hooks";
import { useCallback } from "react";
import authnSlice from "slices/Authn";

export function useReAuthenticate() {
  const dispatch = useAppDispatch();
  const [getAuthnStatus] = securityApi.useLazyGetAuthnStatusQuery();

  const checkAuthnStatus = useCallback(
    async (frontend_action: string, frontend_state?: string): Promise<boolean> => {
      dispatch(
        authnSlice.actions.setFrontendActionAndState({
          frontend_action,
          frontend_state,
        }),
      );

      const response = await getAuthnStatus({ frontend_action });

      if (response.isSuccess && response.data.payload.authn_status === ActionStatus.OK) {
        return true;
      }

      dispatch(authnSlice.actions.setReAuthenticate(true));
      return false;
    },
    [dispatch, getAuthnStatus],
  );

  const resetAuthn = useCallback(() => {
    dispatch(authnSlice.actions.setAuthnFrontendReset());
  }, [dispatch]);

  return { checkAuthnStatus, resetAuthn };
}
