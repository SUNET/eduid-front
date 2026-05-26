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
  const is_configured = useAppSelector((state) => state.config.is_configured);

  const handleCallback = useCallback(async () => {
    if (!params.authn_id || !params.app_name || !is_configured) return;

    await externalMfaRegister({
      app_name: params.app_name,
      authn_id: params.authn_id,
    });
    navigate("/register");
  }, [params, externalMfaRegister, navigate, is_configured]);

  useEffect(() => {
    handleCallback().catch(console.error);
  }, [handleCallback]);

  return null;
}
