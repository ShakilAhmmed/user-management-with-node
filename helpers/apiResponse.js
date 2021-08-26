module.exports.success = (data = [], message = '', code=200) => {
    return {
        data,
        message,
        code
    };
}

module.exports.error = (message = '', code=500) => {
    return {
        message,
        code
    };
}