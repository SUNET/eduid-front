// import content from other files
import * as login from "./defaultMessages/login";
import * as resetPassword from "./defaultMessages/resetPassword";
import * as ladok from "./defaultMessages/ladok";
import * as security from "./defaultMessages/security";
import * as signup from "./defaultMessages/signup";
import * as letterProofing from "./defaultMessages/letterProofing";
import * as common from "./defaultMessages/common";
import * as eidas from "./defaultMessages/eidas";
import * as email from "./defaultMessages/email";
import * as orcid from "./defaultMessages/orcid";
import * as bankid from "./defaultMessages/bankid";
import * as frejaeid from "./defaultMessages/frejaeid";
import * as navigatorCredentials from "./defaultMessages/navigatorCredentials";

export const formattedMessages = {
  ...common.proofing,
  ...common.apiResponse,
  ...common.validations,
  ...common.personalData,
  ...login.apiResponses,
  ...signup.apiResponses,
  ...ladok.apiResponses,
  ...eidas.apiResponses,
  ...email.apiResponses,
  ...orcid.apiResponses,
  ...security.apiResponses,
  ...letterProofing.apiResponses,
  ...resetPassword.apiResponses,
  ...bankid.apiResponses,
  ...frejaeid.apiResponses,
  ...navigatorCredentials.credentialErrors,
};
