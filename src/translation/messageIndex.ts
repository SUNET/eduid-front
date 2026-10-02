import * as bankid from "./defaultMessages/bankid";
import * as common from "./defaultMessages/common";
import * as eidas from "./defaultMessages/eidas";
import * as email from "./defaultMessages/email";
import * as frejaeid from "./defaultMessages/frejaeid";
import * as ladok from "./defaultMessages/ladok";
import * as letterProofing from "./defaultMessages/letterProofing";
import * as login from "./defaultMessages/login";
import * as navigatorCredentials from "./defaultMessages/navigatorCredentials";
import * as orcid from "./defaultMessages/orcid";
import * as resetPassword from "./defaultMessages/resetPassword";
import * as samleid from "./defaultMessages/samleid";
import * as security from "./defaultMessages/security";
import * as signup from "./defaultMessages/signup";

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
  ...samleid.apiResponses,
};
