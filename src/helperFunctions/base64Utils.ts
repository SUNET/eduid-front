/**
 * Base64 "urlencode" an ArrayBuffer into a string.
 */
export const safeEncode = (data: ArrayBuffer): string => {
  const buf = new Uint8Array(data);
  const ascii = String.fromCharCode.apply(null, buf as unknown as number[]); // cast to unknown to number[] to avoid ts(2352)
  const b64str = window.btoa(ascii);
  // "urlencode", replacing slashes with underscore, plus with hyphen and stripping any padding from the end
  // Safe replacement function to avoid backtracking
  const safeReplace = (match: string) => {
    switch (match) {
      case "/":
        return "_";
      case "+":
        return "-";
      default:
        return "";
    }
  };

  // Use a single regex with the safeReplace function as a callback
  return b64str.replace(/[\/+]=*$/g, safeReplace);
};

/**
 * Base64 "urldecode" an ArrayBuffer.
 */
export const safeDecode = (b64str: string): Uint8Array => {
  // "urldecode", restoring underscores to slashes and hyphens to plus
  const restored = b64str.replace(/_/g, "/").replace(/-/g, "+");
  const data = window.atob(restored);
  return Uint8Array.from(data, (c) => c.charCodeAt(0));
};
