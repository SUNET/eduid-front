/*********************************************************************************************************************/

export interface GetStatusRequest {
  authn_id: string;
}

export interface GetStatusResponse {
  authn_id: string;
  frontend_action: string;
  frontend_state?: string;
  method: string;
  error?: boolean;
  status?: string;
}
