import urlsearch from "@ungap/url-search-params";

export function polyfillsInit() {
  // Polyfill for Element.closest for IE9+
  // see https://developer.mozilla.org/en-US/docs/Web/API/Element/closest

  if (!Element.prototype.matches)
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

  if (!Element.prototype.closest)
    Element.prototype.closest = function (s) {
      let el = this;
      if (!document.documentElement.contains(el)) return null;
      do {
        if (el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null);
      return null;
    };

  // Polyfill for URLSearchParams
  window.URLSearchParams = urlsearch;
}
