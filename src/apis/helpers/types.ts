import type { EduidJSAppCommonConfig } from "commonConfig";

export interface ApiResponse<T> {
  error?: boolean;
  payload: T;
  type: string;
}

export type ApiError<T> = ApiResponse<T> & {
  error: true;
  payload: T & { error?: { csrf_token?: string[]; nin?: string[] }; message?: string };
};

export interface StateWithCommonConfig {
  config: EduidJSAppCommonConfig;
}
