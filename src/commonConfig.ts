import { createAction } from "@reduxjs/toolkit";

// things not actually received from jsconfig backend
interface CommonConfig {
  error: boolean;
  is_configured: boolean;
}

interface CommonJsConfig {
  csrf_token?: string;
  dashboard_link?: string;
  debug: boolean;
  eduid_site_url?: string;
  environment?: "dev" | "staging" | "production";
  reset_password_service_url?: string;
  signup_link?: string;
}

// typing in the apis become too complicated if these are not shared in all configs,
// but the API:s should throw an error if used without an actual value present so they
// can all be optional
interface APIEndpoints {
  eidas_service_url?: string;
  emails_service_url?: string;
  ladok_service_url?: string;
  letter_proofing_url?: string;
  login_service_url?: string;
  lookup_mobile_proofing_service_url?: string;
  orcid_service_url?: string;
  personal_data_service_url?: string;
  phone_service_url?: string;
  security_service_url?: string;
  token_service_url?: string;
  svipe_service_url?: string;
}

// The apps have their separate config slices, but all config slices need to listen for this
// common event emitted when a new CSRF token is received in a response from the backend, and
// store it in the config (as csrf_token from CommonJsConfig).
export const storeCsrfToken = createAction<string>("storeCsrfToken");

export interface EduidJSAppCommonConfig extends CommonConfig, CommonJsConfig, APIEndpoints {}
