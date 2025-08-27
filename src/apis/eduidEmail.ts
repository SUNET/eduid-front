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
      query: (body) => ({
        url: "primary",
        body
      }),
      extraOptions: { service: "email" }
    }),
    verifyEmail: builder.query<ApiResponse<EmailsResponse>, VerifyEmailRequest>({
      query: (body) => ({
        url: "verify",
        body
      }),
      extraOptions: { service: "email" }
    }),
    resendEmailCode: builder.query<ApiResponse<EmailsResponse>, EmailRequest>({
      query: (body) => ({
        url: "resend-code",
        body
      }),
      extraOptions: { service: "email" }
    }),
    newEmail: builder.query<ApiResponse<EmailsResponse>, EmailRequest>({
      query: (body) => ({
        url: "new",
        body: {
          ...body,
          verified: false,
          primary: false
        }
      }),
      extraOptions: { service: "email" }
    }),
    removeEmail: builder.query<ApiResponse<EmailsResponse>, EmailRequest>({
      query: (body) => ({
        url: "remove",
        body
      }),
      extraOptions: { service: "email" }
    })
  })
})
