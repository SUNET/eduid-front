
export const ADD_EMAIL = 'ADD_EMAIL';


export function addEmail (email) {
    return {
        type: ADD_EMAIL,
        payload: {
            email: email
        }
    };
}
