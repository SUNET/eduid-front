import { eidasGetStatus } from "apis/eduidEidas";
import { useDashboardAppDispatch } from "dashboard-hooks";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showNotification } from "reducers/Notifications";

// URL parameters passed to this component
interface LoginParams {
  app_name?: string;
  authn_id?: string;
}

export function ExternalReturnHandler(): JSX.Element {
  const dispatch = useDashboardAppDispatch();
  const navigate = useNavigate();
  const params = useParams() as LoginParams;

  async function fetchStatus(authn_id: string) {
    const response = await dispatch(eidasGetStatus({ authn_id: authn_id }));
    if (eidasGetStatus.fulfilled.match(response)) {
      const status = response.payload;
      if (status?.method) {
        // Status has been fetched

        if (status.status) {
          dispatch(showNotification({ message: status.status, level: status.error ? "error" : "info" }));
        }

        if (status.frontend_action) {
          // actionToRoute is a mapping from frontend_action values to where in the Dashboard application
          // the user should be returned to
          const actionToRoute: { [key: string]: string } = {
            eidasVerifyIdentity: "/profile/verify-identity/",
            eidasVerifyCredential: "/profile/settings/advanced-settings/",
          };
          const _path = actionToRoute[status.frontend_action];
          if (_path) {
            navigate(_path);
            return;
          }
        }

        navigate("/profile/"); // GOTO start
      }
    }
  }

  useEffect(() => {
    if (params.authn_id) {
      fetchStatus(params.authn_id);
    }
  }, [params]);

  return (
    <div>
      <p>app_name: {params.app_name}</p>
      <p>authn_id: {params.authn_id}</p>
    </div>
  );
}
