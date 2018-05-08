
export const CAPTCHA_VERIFICATION = 'CAPTCHA_VERIFICATION';


export function verifyCaptcha (response) {
    return {
        type: CAPTCHA_VERIFICATION,
        payload: {
            response: response
        }
    };
}

