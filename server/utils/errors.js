const getErrorResponse = (res, statusCode, errorMessage) => {
    return res.status(statusCode).json({ error: errorMessage });
};

export const badRequestError = (res, errorMessage) => {
    return getErrorResponse(res, 400, errorMessage);
};

export const authError = (res, errorMessage) => {
    return getErrorResponse(res, 401, errorMessage);
};

export const accessDeniedError = (res, errorMessage) => {
    return getErrorResponse(res, 403, errorMessage)
};

export const notFoundError = (res, errorMessage) => {
    return getErrorResponse(res, 404, errorMessage);
};

export const internalServerError = (res, errorMessage) => {
    // return getErrorResponse(res, 500, 'Internal server error'); // Uncomment when on prod
    return getErrorResponse(res, 500, errorMessage);
};