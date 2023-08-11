const errorCodes: any = {
    'tokenMissing': "Please login to access the site!",
    'tokenInvalid': "It seems like the session expired. Please login again!",
    'signupError': "Please sign up to use this application."
}

export const getReadableError = (errorCode: string) => ({
    name: "CustomError",
    message: errorCodes[`${errorCode}`]
})