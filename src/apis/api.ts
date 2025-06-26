import { createAction } from '@reduxjs/toolkit';
import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StateWithCommonConfig } from 'apis/common';
import { EDUID_CONFIG_URL } from 'globals';
import { ajaxHeaders } from 'ts_common';


const customBaseQuery: BaseQueryFn = async (args, api, extraOptions: { service?: string }) => {
    const state = api.getState() as StateWithCommonConfig;
    const service_urls: { [key: string]: string | undefined } = {
        jsConfig: EDUID_CONFIG_URL,
        signup: state.config.signup_service_url,
        personalData: state.config.personal_data_service_url,
        authn: state.config.authn_service_url,
        security: state.config.security_service_url,
        orcid: state.config.orcid_service_url,
        email: state.config.emails_service_url,
        letterProofing: state.config.letter_proofing_service_url,
        bankid: state.config.bankid_service_url,
        eidas: state.config.eidas_service_url,
        frejaeID: state.config.freja_eid_service_url,
        ladok: state.config.ladok_service_url,
        login: state.config.login_service_url,
        resetPassword: state.config.reset_password_service_url

    };
    if (!extraOptions?.service) {
        throw new Error('No service specified');
    }
    if (!(extraOptions.service in service_urls)) {
        throw new Error(`Unknown service: ${extraOptions.service}`);
    }
    const baseUrl = service_urls[extraOptions.service];

    const rawBaseQuery = fetchBaseQuery({
        baseUrl, 
        credentials: 'include',
        redirect: 'manual',
        method: args?.body === undefined ? 'GET' : 'POST',
        headers: ajaxHeaders
    });

    // Make sure we add the csrf token to the body
    let base_args;
    if (args?.body !== undefined && args.body.csrf_token === undefined) {
        base_args = {...args, body: {...args.body, csrf_token: state.config.csrf_token}};
    } else {
        base_args = args;
    }
    const result = await rawBaseQuery(base_args, api, extraOptions);
    
    if (result.data && typeof result.data === 'object' && 'error' in result.data && result.data.error === true) {
        // dispatch the API error to the nofification middleware
        // but use a clone of the data as the current middleware modifies the data
        api.dispatch(structuredClone(result.data));
        // return as error for rtk query purposes
        return {
            error: result.data,
            meta: result.meta
        }
    }
    return result;
}

/*********************************************************************************************************************/
// Fake an error response from the backend. The action ending in _FAIL will make the notification
// middleware picks this error up and shows something to the user.
export const genericApiFail = createAction("genericApi_FAIL", function prepare(message: string) {
    return {
      error: true,
      payload: {
        message,
      },
    };
  });
  
export interface ApiResponse<T> {
    payload: T;
    type: string;
}

export const eduIDApi = createApi({
    baseQuery: customBaseQuery,
    reducerPath: 'eduIDApi',
    endpoints: () => ({})
})
