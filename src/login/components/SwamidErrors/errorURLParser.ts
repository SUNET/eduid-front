export type errorURLCode =
  | "AUTHENTICATION_FAILURE"
  | "AUTHORIZATION_FAILURE"
  | "IDENTIFICATION_FAILURE"
  | "OTHER_ERROR";

export interface errorURLData {
  code?: errorURLCode;
  ts?: string;
  rp?: string;
  tid?: string;
  ctx?: string;
  date?: Date;
}

/**
 * Parse query parameters according to https://refeds.org/specifications/errorurl-v1
 * @param query The query parameters
 * @returns errorURL data
 */
export function parseErrorURL(query: URLSearchParams): errorURLData {
  const code = query.get("errorurl_code");
  const ts = query.get("errorurl_ts");
  const rp = query.get("errorurl_rp");
  const tid = query.get("errorurl_tid");
  const ctx = query.get("errorurl_ctx");
  let parsedDate: Date | undefined;

  if (ts && ts !== "ERRORURL_TS") {
    // Convert unix time stamp to a Date object
    parsedDate = new Date(parseInt(ts) * 1000);
  }

  /* An SP that doesn't understand one or more of the parameters will leave them unchanged from the template
   * in the SWAMID metadata, which is why we check them all against the template values before returning them.
   */
  return {
    code: code && code !== "ERRORURL_CODE" ? (code as errorURLCode) : undefined,
    ts: ts && ts !== "ERRORURL_TS" ? ts : undefined,
    rp: rp && rp !== "ERRORURL_RP" ? rp : undefined,
    tid: tid && tid !== "ERRORURL_TID" ? tid : undefined,
    ctx: ctx && ctx !== "ERRORURL_CTX" ? ctx : undefined,
    date: parsedDate,
  };
}
