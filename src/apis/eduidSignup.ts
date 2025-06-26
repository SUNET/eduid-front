import { ApiResponse, eduIDApi } from "./common";

export interface SignupState {
    already_signed_up: boolean;
    email: {
        completed: boolean;
        address?: string;
        expires_time_left?: number;
        expires_time_max?: number;
        sent_at?: string;
        throttle_time_left?: number;
        throttle_time_max?: number;
        bad_attempts?: number;
        bad_attempts_max?: number;
    };
    invite: {
        user?: { given_name?: string; surname?: string; email?: string; };
        code?: string;
        completed: boolean;
        finish_url?: string;
        initiated_signup: boolean;
        is_logged_in: boolean;
    };
    name: {
        given_name?: string;
        surname?: string;
    };
    tou: { completed: boolean; version?: string; };
    captcha: { completed: boolean; };
    credentials: {
        completed?: boolean;
        generated_password?: string;
        use_suggested_password?: string;
        custom_password?: string;
    };
    user_created: boolean;
}

export interface SignupStatusResponse {
    state: SignupState;
}

export interface GetCaptchaResponse {
    captcha_img?: string;
    captcha_audio?: string;
}
export interface CaptchaRequest {
    internal_response?: string;
}

export interface AcceptToURequest {
    tou_accepted: boolean;
    tou_version: string;
}

export interface AcceptToUArgs {
    version: string;
}
export interface RegisterEmailRequest {
    email: string;
    given_name: string;
    surname: string;
}
export interface VerifyEmailRequest {
    verification_code: string;
}
export interface CreateUserRequest {
    use_suggested_password?: boolean;
    use_webauthn?: boolean;
    custom_password?: string;
}

type EmptyObj = Record<PropertyKey, never>;

export const signupApi = eduIDApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchState: builder.query<ApiResponse<SignupStatusResponse>, void>({
            query: (): { url: string } => ({
                url: 'state'
            }),
            extraOptions: { service: 'signup' }
        }),
        getSignupCaptchaRequest: builder.query<ApiResponse<GetCaptchaResponse>,void>({
            query: (): { url: string; body: EmptyObj } => ({
                url: 'get-captcha',
                body: {}
            }),
            extraOptions: { service: 'signup' }
        }),
        sendSignupCaptchaResponse: builder.query<ApiResponse<SignupStatusResponse>, CaptchaRequest>({
            query: (captcha): { url: string; body: CaptchaRequest } => ({
                url: 'captcha',
                body: {
                    internal_response: captcha.internal_response,
                }
            }),
            extraOptions: { service: 'signup' }
        }),
        acceptToURequest: builder.query<ApiResponse<SignupStatusResponse>, AcceptToUArgs>({
            query: (args): { url: string; body: AcceptToURequest } => ({
                url: 'accept-tou',
                body: {
                    tou_accepted: true,
                    tou_version: args.version
                },
            }),
            extraOptions: { service: 'signup' }
        }),
        registerEmailRequest: builder.query<ApiResponse<SignupStatusResponse>, RegisterEmailRequest>({
            query: (args: RegisterEmailRequest): { url: string; body: RegisterEmailRequest } => ({
                url: 'register-email',
                body: args
            }),
            extraOptions: { service: 'signup' }
        }),
        verifyEmailRequest: builder.query<ApiResponse<SignupStatusResponse>, VerifyEmailRequest>({
            query: (args: VerifyEmailRequest): { url: string; body: VerifyEmailRequest } => ({
                url: 'verify-email',
                body: args
            }),
            extraOptions: { service: 'signup' }
        }),
        getPasswordRequest: builder.query<ApiResponse<SignupStatusResponse>,void>({
            query: (): { url: string; body: EmptyObj } => ({
                url: 'get-password',
                body: {}
            }),
            extraOptions: { service: 'signup' }
        }),
        createUserRequest: builder.query<ApiResponse<SignupStatusResponse>, CreateUserRequest>({
            query: (args): { url: string; body: CreateUserRequest } => ({
                url: 'create-user',
                body: {
                    custom_password: args.custom_password,
                    use_suggested_password: Boolean(args.use_suggested_password),
                    use_webauthn: Boolean(args.use_webauthn)
                }
            }),
            extraOptions: { service: 'signup' }
        })
    })
})

export default signupApi;