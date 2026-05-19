import { bankIDApi } from "apis/eduidBankid";
import { eidasApi } from "apis/eduidEidas";
import { frejaeIDApi } from "apis/eduidFrejaeID";
import { signupApi } from "apis/eduidSignup";
import { useAppSelector } from "eduid-hooks";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

interface SignupCallbackParams {
  app_name?: string;
  authn_id?: string;
}

export function SignupExternalReturnHandler() {
  const navigate = useNavigate();
  const params = useParams() as SignupCallbackParams;
  const [externalMfaRegister] = signupApi.useLazyExternalMfaRegisterQuery();
  const [frejaeIDGetStatus] = frejaeIDApi.useLazyFrejaeIDGetStatusQuery();
  const [bankIDGetStatus] = bankIDApi.useLazyBankIDGetStatusQuery();
  const [eidasGetStatus] = eidasApi.useLazyEidasGetStatusQuery();
  const is_configured = useAppSelector((state) => state.config.is_configured);

  const handleCallback = useCallback(async () => {
    if (!params.authn_id || !params.app_name || !is_configured) return;

    const response = await externalMfaRegister({
      app_name: params.app_name,
      authn_id: params.authn_id,
    });
    console.log("response:", response);
    navigate("/register");
  }, [params, externalMfaRegister, navigate]);

  useEffect(() => {
    handleCallback().catch(console.error);
  }, [handleCallback]);

  return null;
}
