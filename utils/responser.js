const errorMessageMap = {
    '0': 'success',
    '3': 'user logged in successfully',
    '-1': 'failed',
    '-2': 'not found',
    '-3': 'not authentciated',
    '-4': 'unauthorized',
    '-5': 'username or password are incorrect'
};

const errorStatusCode = {
    '-2': 404,
    '-3': 401,
    '-4': 403,
    '-5': 401
};

module.exports.create = (res, code, data) => {
    // Get error message from error code.
    let resMessage = errorMessageMap[code.toString()];
    // Get error status code from error code.
    let resStatus = errorStatusCode[code.toString()] || 200;
    
    let resData = data;
    
    if (data !== null && data.hasOwnProperty('message') && code !== 0) {
        // resData = (process.env.DEBUG === true) ? data.message : null;
        resData = data.message;
    }

    let responseObject = {
        'code': code,
        'message': resMessage,
        'data': resData
    };

    return res.status(resStatus).json(responseObject);
};