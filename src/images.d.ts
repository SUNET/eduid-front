declare module "*.gif";
declare module "*.jpg";
declare module "*.png";
declare module "*.svg";
declare module "*.scss";
declare module "*.css";

// PublicKeyCredentialJSON was removed from the DOM lib in TypeScript 6.0,
// replaced by the more specific RegistrationResponseJSON | AuthenticationResponseJSON.
type PublicKeyCredentialJSON = RegistrationResponseJSON | AuthenticationResponseJSON;
