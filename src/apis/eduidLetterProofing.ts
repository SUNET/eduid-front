import { ApiResponse, eduIDApi } from "./common";

interface LetterProofingRequest {
    nin: string
}

interface LetterProofingConfirmation {
    code: string
}

export interface LetterProofingResponse {
  letter_expired?: boolean;
  letter_expires?: string;
  letter_expires_in_days?: number;
  letter_sent?: string;
  letter_sent_days_ago?: number;
  message?: string;
}

export const letterProofingApi = eduIDApi.injectEndpoints({
    endpoints: (builder) => ({
        letterProfingState: builder.query<ApiResponse<LetterProofingResponse>, void>({
            query: () => ({
                url: "proofing"
            }),
            extraOptions: { service: "letterProofing" }
        }),
        requestLetter: builder.query<ApiResponse<LetterProofingResponse>, LetterProofingRequest>({
            query: (args) => ({
                url: "proofing",
                body: {
                    nin: args.nin
                }
            }),
            extraOptions: { service: "letterProofing" }
        }),
        confirmLetterCode: builder.query<ApiResponse<LetterProofingRequest>, LetterProofingConfirmation>({
            query: (args) => ({
                url: "verify-code",
                body: {
                    code: args.code
                }
            }),
            extraOptions: { service: "letterProofing" }
        })
    })
})

