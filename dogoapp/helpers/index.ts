import crypto from 'crypto';

var helpers: any = {};

helpers.hash = function (str: string): string | null {
    if (typeof str === 'string' && str.length > 0) {
        var hash = crypto.createHmac('sha256', "secretoArrechisimo").update(str).digest('hex');
        return hash;
    } else {
        return null;
    }
}

export default helpers;