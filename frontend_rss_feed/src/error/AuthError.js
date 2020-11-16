function AuthException(message) {
    const error = new Error(message);
    return error
}

AuthException.prototype = Object.create(Error.prototype);

export default AuthException;