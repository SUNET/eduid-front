import { webauthnAttestation } from "helperFunctions/navigatorCredential";
import { ApiResponse, eduIDApi } from "./common";
import { FetchIdentitiesResponse, UserIdentities } from "./eduidPersonalData";

interface UpdateOfficialUserDataResponse {
    message: string
}

interface PostDeleteAccountResponse {
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

interface RegisterWebAuthnRequest {
    webauthn_attestation: webauthnAttestation
    description: string;
}

interface BeginRegisterWebAuthnRequest {
    authenticator: string;
}

interface BeginRegisterWebauthnResponse {
    registration_data: string
}

interface SuggestedPasswordResponse {
  suggested_password: string;
}

interface ChangePasswordPayload {
  new_password: string;
}

interface ChangePasswordResponse {
  message?: string;
}

interface NinPayload {
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
    identities: UserIdentities
}

export enum ActionStatus {
  OK = "ok",
  NOT_FOUND = "not-found",
  CONSUMED = "consumed",
  STALE = "stale",
  WRONG_ACCR = "wrong-accr",
  NO_MFA = "no-mfa",
  CREDENTIAL_NOT_RECENTLY_USED = "credential-not-recently-used"
}

interface AuthnActionStatusResponse {
  authn_status: ActionStatus;
}

interface AuthnActionStatusRequest {
  frontend_action: string;
  credential_id?: string;
}


export const securityApi = eduIDApi.injectEndpoints({
    endpoints: (builder) => ({
        updateOfficialUserData: builder.query<ApiResponse<UpdateOfficialUserDataResponse>, void>({
            query: () => ({
                url: "refresh-official-user-data",
                body: {}
            }),
            extraOptions: { service: "security" }
        }),
        postDeleteAccount: builder.query<ApiResponse<PostDeleteAccountResponse>, void>({
            query: () => ({
                url: "terminate-account",
                body: {}
            }),
            extraOptions: { service: "security" }
        }),
        removeWebauthnToken: builder.query<ApiResponse<SecurityResponse>, RemoveWebauthnTokensRequest>({
            query: (args) => ({
                url: "webauthn/remove",
                body: {
                    credential_key: args.credential_key
                }
            }),
            extraOptions: { service: "security" }
        }),
        requestCredentials: builder.query<ApiResponse<SecurityResponse>, void>({
            query: () => ({
                url: "credentials"
            }),
            extraOptions: { service: "security" }
        }),
        registerWebauthn: builder.query<ApiResponse<SecurityResponse>, RegisterWebAuthnRequest>({
            query: (args) => ({
                url: "webauthn/register/complete",
                body: {
                    attestationObject: args.webauthn_attestation.attestationObject,
                    clientDataJSON: args.webauthn_attestation.clientDataJSON,
                    credentialId: args.webauthn_attestation.credentialId,
                    description: args.description
                }
            }),
            extraOptions: { service: "security" }
        }),
        beginRegisterWebauthn: builder.query<ApiResponse<BeginRegisterWebauthnResponse>, BeginRegisterWebAuthnRequest>({
            query: (args) => ({
                url: "webauthn/register/begin",
                body: {
                    authenticator: args.authenticator
                }
            }),
            extraOptions: { service: "security" }
        }),
        fetchSuggestedPassword: builder.query<ApiResponse<SuggestedPasswordResponse>,void>({
            query: () => ({
                url: "change-password/suggested-password"
            }),
            extraOptions: { service: "security" }
        }),
        changePassword: builder.query<ApiResponse<ChangePasswordResponse>, ChangePasswordPayload>({
            query: (args) => ({
                url: "change-password/set-password",
                body: {
                    new_password: args.new_password
                }
            }),
            extraOptions: { service: "security" }
        }),
        addNin: builder.query<ApiResponse<FetchIdentitiesResponse>, NinPayload>({
            query: (args) => ({
                url: "add-nin",
                body: {
                    nin: args.nin
                }
            }),
            extraOptions: { service: "security" }
        }),
        removeNin: builder.query<ApiResponse<FetchIdentitiesResponse>, NinPayload>({
            query: (args) => ({
                url: "remove-nin",
                body: {
                    nin: args.nin
                }
            }),
            extraOptions: { service: "security" }
        }),
        fetchApprovedSecurityKeys: builder.query<ApiResponse<SecurityKeysResponse>, void>({
            query: () => ({
                url: "webauthn/approved-security-keys"
            }),
            extraOptions: { service: "security" }
        }),
        removeIdentity: builder.query<ApiResponse<IdentitiesResponse>, IdentityRequest>({
            query: (args) => ({
                url: "remove-identity",
                body: {
                    identity_type: args.identity_type
                }
            }),
            extraOptions: { service: "security" }
        }),
        getAuthnStatus: builder.query<ApiResponse<AuthnActionStatusResponse>, AuthnActionStatusRequest>({
            query: (args) => ({
                url: "authn-status",
                body: {
                    frontend_action: args.frontend_action,
                    credential_id: args.credential_id
                }
            }),
            extraOptions: { service: "security" }
        })
    })
})

export default securityApi;
