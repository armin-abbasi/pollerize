const errorMessageMap = {
    '0' : 'success',
    '-1': 'failed',
    '-2': 'not found',
    '-3': 'unauthorized'
};

const errorStatusCode = {
    '-2': 404,
    '-3': 403
};

module.exports.create = (res, code, data) => {
    // Get error message from error code.
    let resMessage = errorMessageMap[code.toString()];
    // Get error status code from error code.
    let resStatus = errorStatusCode[code.toString()] || 200;
    
    let resData = data;
    
    if (data !== null && data.hasOwnProperty('message') && code !== 0) {
        resData = (process.env.DEBUG === true) ? data.message : null;
    }

    let responseObject = {
        'code': code,
        'message': resMessage,
        'data': resData
    };

    return res.status(resStatus).json(responseObject);
};