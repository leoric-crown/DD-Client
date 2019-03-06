export const CHECK_AUTH_STATUS = 'CHECK_AUTH_STATUS'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'
export const CHECK_SIGNUP_STATUS = 'CHECK_SIGNUP_STATUS'
export const CHECK_PASSWORD_RESTORE_STATUS = 'CHECK_PASSWORD_RESTORE_STATUS'

export function setAuthStatus (message, authSuccess) {
    return {
        type: CHECK_AUTH_STATUS,
        message,
        authSuccess
    }
}

export function clearErrors () {
    return {
        type: CLEAR_ERRORS
    }
}

export function setSignUpStatus (message, signUpSuccess) {
    return {
        type: CHECK_SIGNUP_STATUS,
        message,
        signUpSuccess

    }
}

export function setPasswordRestoreStatus (message, status) {
    return {
        type: CHECK_PASSWORD_RESTORE_STATUS,
        message,
        status
    }
}


