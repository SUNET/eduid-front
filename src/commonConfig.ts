import { createAction } from "@reduxjs/toolkit";

// things not actually received from jsconfig backend
interface CommonConfig {
  error: boolean;
  is_configured: boolean;
}

interface CommonJsConfig {
  available_languages: string[][];
  csrf_token?: string;
  debug: boolean;
  environment?: "dev" | "staging" | "production";
  eduid_site_url?: string;
  signup_url?: string;
  reset_password_url?: string;
  dashboard_url?: string;
}

// typing in the apis become too complicated if these are not shared in all configs,
// but the API:s should throw an error if used without an actual value present so they
// can all be optional
interface APIEndpoints {
  security_url?: string;
  letter_proofing_url?: string;
  personal_data_url?: string;
  ladok_url?: string;
  emails_url?: string;
  base_url?: string; // TODO: This is the login app base URL, rename to login_base_url?
}

// The apps have their separate config slices, but all config slices need to listen for this
// common event emitted when a new CSRF token is received in a response from the backend, and
// store it in the config (as csrf_token from CommonJsConfig).
export const storeCsrfToken = createAction<string>("storeCsrfToken");

export interface EduidJSAppCommonConfig extends CommonConfig, CommonJsConfig, APIEndpoints {}
