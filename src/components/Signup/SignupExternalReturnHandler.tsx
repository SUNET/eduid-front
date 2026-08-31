import { bankIDApi } from "apis/eduidBankid";
import { eidasApi, GetStatusResponse } from "apis/eduidEidas";
import { frejaeIDApi } from "apis/eduidFrejaeID";
import signupApi from "apis/eduidSignup";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { clearNotifications, showNotification } from "slices/Notifications";
import { signupSlice } from "slices/Signup";

interface SignupCallbackParams {
  app_name?: string;
  authn_id?: string;
}

const statusActions: Record<string, "eidas" | "bankid" | "freja_eid"> = {
  eidas: "eidas",
  bankid: "bankid",
  freja_eid: "freja_eid",
};

function handleIdentityCollision(
  result: { error?: unknown },
  dispatch: ReturnType<typeof useAppDispatch>,
  app_name: string,
  authn_id: string,
) {
  if (!result.error) return;
  const error = result.error as { payload?: { message?: string } };
  if (error.payload?.message === "signup.identity-already-registered") {
    dispatch(clearNotifications());
    dispatch(signupSlice.actions.setIdentityCollision({ app_name, authn_id }));
  }
}

export function SignupExternalReturnHandler() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams() as SignupCallbackParams;
  const is_configured = useAppSelector((state) => state.config.is_configured);
  const [externalMfaRegister] = signupApi.useLazyExternalMfaRegisterQuery();
  const [bankIDGetStatus] = bankIDApi.useLazyBankIDGetStatusQuery();
  const [eidasGetStatus] = eidasApi.useLazyEidasGetStatusQuery();
  const [frejaeIDGetStatus] = frejaeIDApi.useLazyFrejaeIDGetStatusQuery();

  const getStatusAction = useCallback(
    (app_name: string) => {
      const actions = { eidas: eidasGetStatus, bankid: bankIDGetStatus, freja_eid: frejaeIDGetStatus };
      return actions[app_name as keyof typeof actions];
    },
    [eidasGetStatus, bankIDGetStatus, frejaeIDGetStatus],
  );

  const processStatus = useCallback(
    async (status: GetStatusResponse, app_name: string, authn_id: string) => {
      if (status.status) {
        dispatch(showNotification({ message: status.status, level: status.error ? "error" : "info" }));
      }

      if (!status.frontend_action) return;

      const result = await externalMfaRegister({ app_name, authn_id });
      handleIdentityCollision(result, dispatch, app_name, authn_id);
      navigate("/register");
    },
    [externalMfaRegister, dispatch, navigate],
  );

  const fetchStatus = useCallback(
    async (authn_id: string) => {
      if (!params.app_name || !statusActions[params.app_name]) return;

      const action = getStatusAction(params.app_name);
      if (!action) return;

      const response = await action({ authn_id });
      if (response.isSuccess) {
        await processStatus(response.data.payload as GetStatusResponse, params.app_name, authn_id);
      }
    },
    [params.app_name, getStatusAction, processStatus],
  );

  useEffect(() => {
    if (is_configured && params.authn_id) {
      fetchStatus(params.authn_id);
    }
  }, [params, is_configured, fetchStatus]);

  return null;
}
