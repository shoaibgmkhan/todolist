// Action creator
export const updateAuth = (token) => {
    // Return an action
    return {
        type: 'AUTH_UPDATED',
        payload: token
    };
};