import { eduIDApi } from "./common";
import { FetchIdentitiesResponse, UserIdentities } from "./eduidPersonalData";
import type { ApiResponse } from "./helpers/types";

export interface UpdateOfficialUserDataResponse {
  message: string;
}

export interface PostDeleteAccountResponse {
  location: string;
}

export interface RemoveWebauthnTokensRequest {
  credential_key: string;
}

export interface CredentialType {
  created_ts: string;
  credential_type: string;
  description: string | null;
  key: string;
  success_ts: string;
  used_for_login: boolean;
  verified: boolean;
}

export interface SecurityResponse {
  credentials: CredentialType[];
}

export interface RegisterWebAuthnRequest {
  webauthn_attestation: PublicKeyCredentialJSON;
  description: string;
}

export interface BeginRegisterWebauthnRequest {
  authenticator: string;
}

export interface BeginRegisterWebauthnResponse {
  registration_data: {
    publicKey: PublicKeyCredentialCreationOptionsJSON;
  };
}

export interface SuggestedPasswordResponse {
  suggested_password: string;
}

export interface ChangePasswordPayload {
  new_password: string;
}

export interface ChangePasswordResponse {
  message?: string;
}

export interface NinPayload {
  nin: string;
}

export interface SecurityKeysResponse {
  next_update: string; // currently unused
  entries: string[];
}

interface IdentityRequest {
  identity_type: string;
}

interface IdentitiesResponse {
  message: string;
  identities: UserIdentities;
}

export enum ActionStatus {
  OK = "ok",
  NOT_FOUND = "not-found",
  CONSUMED = "consumed",
  STALE = "stale",
  WRONG_ACCR = "wrong-accr",
  NO_MFA = "no-mfa",
  CREDENTIAL_NOT_RECENTLY_USED = "credential-not-recently-used",
}

export interface AuthnActionStatusResponse {
  authn_status: ActionStatus;
}

export interface AuthnActionStatusRequest {
  frontend_action: string;
  credential_id?: string;
}

export interface CheckAuthnStatusResponse {
  asserted_authn_ctx: string;
  authn_instant: string;
  consumed: boolean;
  created: string;
  credential_id: string;
  error: boolean;
  frontend_action: string;
  method: string;
  req_authn_ctx: string[];
}

export const securityApi = eduIDApi.injectEndpoints({
  endpoints: (builder) => ({
    updateOfficialUserData: builder.query<ApiResponse<UpdateOfficialUserDataResponse>, void>({
      query: () => ({
        url: "refresh-official-user-data",
        body: {},
      }),
      extraOptions: { service: "security" },
    }),
    postDeleteAccount: builder.query<ApiResponse<PostDeleteAccountResponse>, void>({
      query: () => ({
        url: "terminate-account",
        body: {},
      }),
      extraOptions: { service: "security" },
    }),
    removeWebauthnToken: builder.query<ApiResponse<SecurityResponse>, RemoveWebauthnTokensRequest>({
      query: (body) => ({
        url: "webauthn/remove",
        body,
      }),
      extraOptions: { service: "security" },
    }),
    requestCredentials: builder.query<ApiResponse<SecurityResponse>, void>({
      query: () => ({
        url: "credentials",
      }),
      extraOptions: { service: "security" },
    }),
    registerWebauthn: builder.query<ApiResponse<SecurityResponse>, RegisterWebAuthnRequest>({
      query: (body) => ({
        url: "webauthn/register/complete",
        body: {
          response: body.webauthn_attestation,
          description: body.description,
        },
      }),
      extraOptions: { service: "security" },
    }),
    beginRegisterWebauthn: builder.query<ApiResponse<BeginRegisterWebauthnResponse>, BeginRegisterWebauthnRequest>({
      query: (body) => ({
        url: "webauthn/register/begin",
        body,
      }),
      extraOptions: { service: "security" },
    }),
    fetchSuggestedPassword: builder.query<ApiResponse<SuggestedPasswordResponse>, void>({
      query: () => ({
        url: "change-password/suggested-password",
      }),
      extraOptions: { service: "security" },
    }),
    changePassword: builder.query<ApiResponse<ChangePasswordResponse>, ChangePasswordPayload>({
      query: (body) => ({
        url: "change-password/set-password",
        body,
      }),
      extraOptions: { service: "security" },
    }),
    addNin: builder.query<ApiResponse<FetchIdentitiesResponse>, NinPayload>({
      query: (body) => ({
        url: "add-nin",
        body,
      }),
      extraOptions: { service: "security" },
    }),
    removeNin: builder.query<ApiResponse<FetchIdentitiesResponse>, NinPayload>({
      query: (body) => ({
        url: "remove-nin",
        body,
      }),
      extraOptions: { service: "security" },
    }),
    fetchApprovedSecurityKeys: builder.query<ApiResponse<SecurityKeysResponse>, void>({
      query: () => ({
        url: "webauthn/approved-security-keys",
      }),
      extraOptions: { service: "security" },
    }),
    removeIdentity: builder.query<ApiResponse<IdentitiesResponse>, IdentityRequest>({
      query: (body) => ({
        url: "remove-identity",
        body,
      }),
      extraOptions: { service: "security" },
    }),
    getAuthnStatus: builder.query<ApiResponse<AuthnActionStatusResponse>, AuthnActionStatusRequest>({
      query: (body) => ({
        url: "authn-status",
        body,
      }),
      extraOptions: { service: "security" },
    }),
    checkAuthnStatus: builder.query<ApiResponse<CheckAuthnStatusResponse>, void>({
      query: () => ({
        url: "authn-status",
      }),
      extraOptions: { service: "security" },
    }),
  }),
});

export default securityApi;
