const getErrorResponse = (res, statusCode, errorMessage) => {
    return res.status(statusCode).json({ error: errorMessage });
};

const badRequestError = (res, errorMessage) => {
    return getErrorResponse(res, 400, errorMessage);
};

const authError = (res, errorMessage) => {
    return getErrorResponse(res, 401, errorMessage);
};

const accessDeniedError = (res, errorMessage) => {
    return getErrorResponse(res, 403, errorMessage)
};

const notFoundError = (res, errorMessage) => {
    return getErrorResponse(res, 404, errorMessage);
};

const internalServerError = (res, errorMessage) => {
    // return getErrorResponse(res, 500, 'Internal server error'); // Uncomment when on prod
    return getErrorResponse(res, 500, errorMessage);
};


export { authError, accessDeniedError, notFoundError, internalServerError, badRequestError };