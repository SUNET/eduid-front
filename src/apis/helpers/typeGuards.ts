import type { PayloadAction } from "@reduxjs/toolkit";
import type { FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query/react";
import type { ApiError, ApiResponse } from "./types";

// type predicate to help identify rejected payloads from backend.
export function isFSA(action: unknown): action is PayloadAction<unknown> {
  try {
    return typeof action === "object" && action !== null && "type" in action && "payload" in action;
  } catch {
    return false;
  }
}

// FetchBaseQuery error
export function isErrorResult(result: unknown): result is { error: FetchBaseQueryError; meta?: FetchBaseQueryMeta } {
  return typeof result === "object" && result !== null && "error" in result;
}

export function isApiResponse<T>(data: unknown): data is ApiResponse<T> {
  return typeof data === "object" && data !== null && "payload" in data && "type" in data;
}

export function isApiError<T>(data: unknown): data is ApiError<T> {
  return typeof data === "object" && data !== null && "error" in data && data.error === true;
}

export function hasCsrfToken<T>(data: ApiResponse<T>): data is ApiResponse<T & { csrf_token?: string }> {
  return (
    typeof data.payload === "object" &&
    data.payload !== null &&
    "csrf_token" in data.payload &&
    typeof data.payload.csrf_token === "string"
  );
}
