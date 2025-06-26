import { ApiResponse, eduIDApi } from "./common";

export interface EmailInfo {
  email: string;
  verified: boolean;
  primary: boolean;
}

export interface EmailsResponse {
  emails: EmailInfo[];
}

interface EmailRequest {
    email: string;
}

interface VerifyEmailRequest extends EmailRequest {
    code: string
}

export const emailApi = eduIDApi.injectEndpoints({
    endpoints: (builder) => ({
        makePrimaryEmail: builder.query<ApiResponse<EmailsResponse>, EmailRequest>({
            query: (args) => ({
                url: "primary",
                body: {
                    email: args.email
                }
            }),
            extraOptions: { service: "email" }
        }),
        verifyEmail: builder.query<ApiResponse<EmailsResponse>, VerifyEmailRequest>({
            query: (args) => ({
                url: "verify",
                body: {
                    code: args.code,
                    email: args.email
                }
            }),
            extraOptions: { service: "email" }
        }),
        resendEmailCode: builder.query<ApiResponse<EmailsResponse>, EmailRequest>({
            query: (args) => ({
                url: "resend-code",
                body: {
                    email: args.email
                }
            }),
            extraOptions: { service: "email" }
        }),
        newEmail: builder.query<ApiResponse<EmailsResponse>, EmailRequest>({
            query: (args) => ({
                url: "new",
                body: {
                    email: args.email,
                    verified: false,
                    primary: false
                }
            }),
            extraOptions: { service: "email" }
        }),
        removeEmail: builder.query<ApiResponse<EmailsResponse>, EmailRequest>({
            query: (args) => ({
                url: "remove",
                body: {
                    email: args.email
                }
            }),
            extraOptions: { service: "email" }
        })
    })
})
