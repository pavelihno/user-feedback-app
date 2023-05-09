export const getErrorData = (err) => {
    return err.response ? err.response.data : err;
};

export const displayErrors = async (res, setErrors) => {
    if (Array.isArray(res.error)) {
        setErrors(res.error.reduce((map, { path, msg }) => {
            map[path] = msg;
            return map;
        }, {}));
    } else {
        setErrors({ message: res.error });
    }
    return;
};

export const fullWidthStyle = { width: '100%' };