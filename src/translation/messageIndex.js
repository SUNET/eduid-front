// import content from other files
import * as login from "./defaultMessages/login";
import * as resetPassword from "./defaultMessages/resetPassword";
import * as ladok from "./defaultMessages/ladok";
import * as security from "./defaultMessages/security";
import * as signup from "./defaultMessages/signup";
import * as lookupMobileProofing from "./defaultMessages/lookupMobileProofing";
import * as letterProofing from "./defaultMessages/letterProofing";
import * as common from "./defaultMessages/common";
import * as eidas from "./defaultMessages/eidas";
import * as email from "./defaultMessages/email";
import * as orcid from "./defaultMessages/orcid";
import * as phone from "./defaultMessages/phone";
import * as bankid from "./defaultMessages/bankid";
import * as svipe from "./defaultMessages/svipe";

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
  ...phone.apiResponses,
  ...security.apiResponses,
  ...letterProofing.apiResponses,
  ...resetPassword.apiResponses,
  ...lookupMobileProofing.apiResponses,
  ...bankid.apiResponses,
  ...svipe.apiResponses,
};
