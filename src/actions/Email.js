
export const ADD_EMAIL = 'ADD_EMAIL';

export const REJECT_TOU = 'REJECT_TOU';
export const ACCEPT_TOU = 'ACCEPT_TOU';


export function addEmail (email) {
    return {
        type: ADD_EMAIL,
        payload: {
            email: email
        }
    };
}

export function acceptTOU () {
    return {
        type: ACCEPT_TOU
    };
}


export function rejectTOU () {
    return {
        type: REJECT_TOU
    };
}
