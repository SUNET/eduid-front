import { ApiResponse, eduIDApi } from "./common";

interface LetterProofingRequest {
  nin: string;
}

interface LetterProofingConfirmation {
  code: string;
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
    letterProofingState: builder.query<ApiResponse<LetterProofingResponse>, void>({
      query: () => ({
        url: "proofing",
      }),
      extraOptions: { service: "letterProofing" },
    }),
    requestLetter: builder.query<ApiResponse<LetterProofingResponse>, LetterProofingRequest>({
      query: (body) => ({
        url: "proofing",
        body,
      }),
      extraOptions: { service: "letterProofing" },
    }),
    confirmLetterCode: builder.query<ApiResponse<LetterProofingRequest>, LetterProofingConfirmation>({
      query: (body) => ({
        url: "verify-code",
        body,
      }),
      extraOptions: { service: "letterProofing" },
    }),
  }),
});
