import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StateWithCommonConfig } from 'apis/common';
import { EDUID_CONFIG_URL } from 'globals';
import { ajaxHeaders } from 'ts_common';


const customBaseQuery: BaseQueryFn = async (args, api, extraOptions: { service?: string }) => {
    let baseUrl;
    let state = api.getState() as StateWithCommonConfig;
    if (!extraOptions?.service) {
        throw new Error('No service specified');
    } else if (extraOptions.service === 'jsConfig') {
        baseUrl = EDUID_CONFIG_URL;
    } else if (extraOptions.service === 'signup') {
        baseUrl = state.config.signup_service_url
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

    // TODO: auth and generic error
    
    if (result.data && typeof result.data === 'object' && 'error' in result.data && result.data.error === true) {
        api.dispatch(result.data)
        return {
            error: result.data,
            meta: result.meta
        }
    }    
    return result;
}

export const eduIDApi = createApi({
    baseQuery: customBaseQuery,
    reducerPath: 'eduIDApi',
    endpoints: () => ({})
})
