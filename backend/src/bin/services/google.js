import request from 'request-promise';

export function getGoogleLogo() {
    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            url: 'https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg',
            resolveWithFullResponse: true
        }).then((response) => {
            return resolve(response);
        }).catch((err) => {
            console.log('/src/bin/services getGoogleLogo() error: ',err);
            return reject(err.toString('utf8'));
        });
    });
}