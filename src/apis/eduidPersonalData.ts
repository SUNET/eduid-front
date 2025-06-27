import { ApiResponse, eduIDApi } from "./common";
import { EmailInfo } from "./eduidEmail";
import { LadokData } from "./eduidLadok";
import { OrcidInfo } from "./eduidOrcid";


/*
 * Code and data structures for talking to the eduid-personal_data backend microservice.
 */

export interface PreferencesData {
  always_use_security_key: boolean;
}

export interface PersonalDataRequest {
  given_name?: string;
  surname?: string;
  chosen_given_name?: string;
  language?: string;
  preferences?: PreferencesData;
}

export interface UserNameRequest {
  given_name: string;
  surname: string;
  chosen_given_name?: string;
  legal_name?: string;
}

export interface UserLanguageRequest {
  language: string;
}

export interface AllUserData {
  chosen_given_name?: string;
  emails: EmailInfo[];
  eppn: string;
  given_name?: string;
  language?: string;
  identities: UserIdentities;
  surname?: string;
  orcid?: OrcidInfo;
  ladok?: LadokData;
}

/*********************************************************************************************************************/
export interface NinIdentity {
  number: string;
  verified: boolean;
}

export interface EidasIdentity {
  prid: string;
  prid_persistence: "A" | "B" | "C";
  date_of_birth: string;
  country_code: string;
  verified: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FrejaeIDIdentity extends EidasIdentity {}

export interface UserIdentities {
  nin?: NinIdentity;
  eidas?: EidasIdentity;
  freja?: FrejaeIDIdentity;
  is_verified: boolean;
}

export interface FetchIdentitiesResponse {
  identities: UserIdentities;
}

export const personalDataApi = eduIDApi.injectEndpoints({
  endpoints: (builder) => ({
    postUserName: builder.mutation<ApiResponse<UserNameRequest>, UserNameRequest>({
      query: (args) => ({
        url: "user/name",
        body: {
          given_name: args.given_name,
          chosen_given_name: args.chosen_given_name,
          surname: args.surname,
          legal_name: args.legal_name,
        }
      }),
      extraOptions: { service: 'personalData' },
    }),
    postUserLanguage: builder.mutation<ApiResponse<UserLanguageRequest>, UserLanguageRequest>({
      query: (args) => ({
        url: "user/language",
        body: {
          language: args.language,
        }
    }),
      extraOptions: { service: 'personalData' },
    }),
    requestAllPersonalData: builder.query<ApiResponse<AllUserData>, void>({
      query: () => ({
        url: "all-user-data",
      }),
      extraOptions: { service: 'personalData' },
    }),
    postSecurityKeyPreference: builder.mutation<ApiResponse<PreferencesData>, PreferencesData>({
      query: (args) => ({
        url: "preferences",
        body: {
          always_use_security_key: args.always_use_security_key
        }
      }),
      extraOptions: { service: 'personalData' },
    })
  })
})

export default personalDataApi
