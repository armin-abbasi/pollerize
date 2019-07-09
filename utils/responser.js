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

module.exports.create = (res, type, code, data) => {
    // Get error message from error code.
    let resMessage = errorMessageMap[code.toString()];

    // Get error status code from error code.
    let resStatus = errorStatusCode[code.toString()] || 200;

    
    let resData = data;
    
    if (type === 'error') {
        resData = (process.env.DEBUG === true) ? err.message : [];
    }

    let responseObject = {
        'code': code,
        'message': resMessage,
        'data': resData
    };

    return res.status(resStatus).json(responseObject);
};