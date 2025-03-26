import { AcceptToUArgs, AcceptToURequest, CaptchaRequest, CreateUserRequest, GetCaptchaResponse, RegisterEmailRequest, SignupStatusResponse, VerifyEmailRequest } from "apis/eduidSignup";
import { eduIDApi } from "./api";

interface ApiResponse<T> {
    payload: T,
    type: string
}

export const signupApi = eduIDApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchState: builder.query<ApiResponse<SignupStatusResponse>, void>({
            query: (): { url: string } => ({
                url: 'state'
            }),
            extraOptions: { service: 'signup' }
        }),
        getCaptcha: builder.query<ApiResponse<GetCaptchaResponse>,void>({
            query: (): { url: string; body: {} } => ({
                url: 'get-captcha',
                body: {}
            }),
            extraOptions: { service: 'signup' }
        }),
        sendCaptchaResponse: builder.query<ApiResponse<SignupStatusResponse>, CaptchaRequest>({
            query: (captcha): { url: string; body: CaptchaRequest } => ({
                url: 'captcha',
                body: {
                    internal_response: captcha.internal_response,
                    recaptcha_response: captcha.recaptcha_response
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
            query: (): { url: string; body: {} } => ({
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