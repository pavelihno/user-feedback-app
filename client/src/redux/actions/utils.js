export const getErrorData = (err) => {
    return err.response ? err.response.data : err;
};