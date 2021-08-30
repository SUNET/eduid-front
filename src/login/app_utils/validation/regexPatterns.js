// Naming of regex patterns refer to matching long (UUID format) and short (10 characters) codes. This aligns with naming used in the backend
// UUID format source from: https://en.wikipedia.org/wiki/Universally_unique_identifier#Format
// longCodePattern is used to verify an added email address
export const longCodePattern = /^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$/;
// shortCodePattern is used to verify an added phone number and vetting via letter and phone
export const shortCodePattern = /^[A-Za-z0-9]{10}$/;
// securityKeyPattern is used to verify user's entered descriptions for security keys
export const securityKeyPattern = /^.{1,50}$/;
// matches empty strings
export const emptyStringPattern = /^\s+$/;
// matches email strings
export const emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

