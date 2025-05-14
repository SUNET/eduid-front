import { createAction } from '@reduxjs/toolkit';
import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StateWithCommonConfig } from 'apis/common';
import { EDUID_CONFIG_URL } from 'globals';
import { ajaxHeaders } from 'ts_common';
import { AuthenticateResponse } from "./authn";


const customBaseQuery: BaseQueryFn = async (args, api, extraOptions: { service?: string }) => {
    let baseUrl;
    const state = api.getState() as StateWithCommonConfig;
    if (!extraOptions?.service) {
        throw new Error('No service specified');
    } else if (extraOptions.service === 'jsConfig') {
        baseUrl = EDUID_CONFIG_URL;
    } else if (extraOptions.service === 'signup') {
        baseUrl = state.config.signup_service_url;
    } else if (extraOptions.service === 'personalData') {
        baseUrl = state.config.personal_data_service_url;
    } else if (extraOptions.service === 'authn') {
        baseUrl = state.config.authn_service_url;
    }

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

    // TODO: auth error
    
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
    // handle HTTP errors cought by fetchBaseQuery
    if (result.error) {
        if (result.error.status === 401) {
            const authnBaseQuery = fetchBaseQuery({
                baseUrl: state.config.authn_service_url,
                credentials: 'include',
                redirect: 'manual',
                method: 'POST',
                headers: ajaxHeaders
            })
            const authn_result = await authnBaseQuery({url: 'authenticate', body: { frontend_action: "login", csrf_token: state.config.csrf_token }}, api, {})
            if (authn_result?.data && (authn_result.data as ApiResponse<AuthenticateResponse>).payload.location) {
                window.location.href = (authn_result.data as ApiResponse<AuthenticateResponse>).payload.location
            }
        } else if ("data" in result.error) {
            api.dispatch(`HTTP ${result.error.status} ${(result.error.data as {message: string}).message}`);
        } else {
            api.dispatch(genericApiFail("Unknown error"));
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
