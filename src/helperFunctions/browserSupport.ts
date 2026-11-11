/**
 * Capability detection for the browser features eduID relies on.
 *
 * Deliberately tests for features rather than browser names or versions: each probe is something the app
 * ships untranspiled (or calls directly), so whichever browser lacks it is the one that will have trouble.
 * The polyfills for the WebAuthn JSON methods (parseOptionsFromJSON.ts, publicKeyCredentialToJSON.ts) mean
 * those methods are not probed here.
 */

export interface BrowserSupport {
  /** The browser lacks something the app needs to render or run correctly */
  unsupported: boolean;
  /** The browser has no WebAuthn at all, so security keys and passkeys can't be used */
  noWebauthn: boolean;
}

/**
 * Relaxed CSS nesting: a bare type selector inside a rule (inputs.css has `label { }` inside a rule).
 * Browsers without it drop the nested rule, so the rule list of the outer rule stays empty.
 */
function supportsRelaxedCssNesting(): boolean {
  const style = document.createElement("style");
  try {
    style.textContent = ".x{b{color:red}}";
    document.head.appendChild(style);
    const rule = style.sheet?.cssRules[0] as CSSStyleRule | undefined;
    return rule?.cssRules?.length === 1;
  } catch {
    return false;
  } finally {
    style.remove();
  }
}

function supportsHasSelector(): boolean {
  // :has() is used in Header.css and buttons.css
  return typeof CSS !== "undefined" && typeof CSS.supports === "function" && CSS.supports("selector(:has(a))");
}

export function detectBrowserSupport(): BrowserSupport {
  const unsupported =
    !supportsRelaxedCssNesting() ||
    !supportsHasSelector() ||
    typeof String.prototype.replaceAll !== "function" ||
    typeof Array.prototype.at !== "function" ||
    typeof Intl?.DisplayNames !== "function";

  return { unsupported, noWebauthn: globalThis.PublicKeyCredential === undefined };
}
