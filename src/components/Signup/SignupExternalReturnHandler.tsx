import { bankIDApi } from "apis/eduidBankid";
import { eidasApi, GetStatusResponse } from "apis/eduidEidas";
import { frejaeIDApi } from "apis/eduidFrejaeID";
import signupApi from "apis/eduidSignup";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { clearNotifications, showNotification } from "slices/Notifications";
import { signupSlice } from "slices/Signup";

// URL parameters passed to this component
interface SignupCallbackParams {
  app_name?: string;
  authn_id?: string;
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

  const processStatus = useCallback(
    async (response: GetStatusResponse, app_name: string, authn_id: string) => {
      if (response.status) {
        dispatch(showNotification({ message: response.status, level: response.error ? "error" : "info" }));
      }
      if (response.frontend_action) {
        const result = await externalMfaRegister({
          app_name,
          authn_id,
        });
        if (result.error) {
          const error = result.error as { payload?: { message?: string } };
          if (error.payload?.message === "signup.identity-already-registered") {
            dispatch(clearNotifications());
            dispatch(signupSlice.actions.setIdentityCollision({ app_name, authn_id }));
          }
        }
        navigate("/register");
      }
    },
    [externalMfaRegister, navigate, dispatch],
  );

  const fetchEidasStatus = useCallback(
    async (authn_id: string, app_name: string) => {
      const response = await eidasGetStatus({ authn_id: authn_id });
      if (response.isSuccess) {
        processStatus(response.data.payload, app_name, authn_id);
      }
    },
    [eidasGetStatus, processStatus],
  );

  const fetchFrejaeIDStatus = useCallback(
    async (authn_id: string, app_name: string) => {
      const response = await frejaeIDGetStatus({ authn_id: authn_id });
      if (response.isSuccess) {
        processStatus(response.data.payload, app_name, authn_id);
      }
    },
    [frejaeIDGetStatus, processStatus],
  );

  const fetchBankIDStatus = useCallback(
    async (authn_id: string, app_name: string) => {
      const response = await bankIDGetStatus({ authn_id: authn_id });
      if (response.isSuccess) {
        processStatus(response.data.payload, app_name, authn_id);
      }
    },
    [bankIDGetStatus, processStatus],
  );

  useEffect(() => {
    if (is_configured && params.authn_id && params.app_name) {
      if (params.app_name === "eidas") {
        fetchEidasStatus(params.authn_id, params.app_name).catch(console.error);
      }
      if (params.app_name === "freja_eid") {
        fetchFrejaeIDStatus(params.authn_id, params.app_name).catch(console.error);
      }
      if (params.app_name === "bankid") {
        fetchBankIDStatus(params.authn_id, params.app_name).catch(console.error);
      }
    }
  }, [params, is_configured, fetchEidasStatus, fetchFrejaeIDStatus, fetchBankIDStatus]);

  return null;
}
