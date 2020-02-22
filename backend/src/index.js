import packageJson from '../package.json';
import setApp from './bin/util/www';
import moment from 'moment';
import { GetUserByEmail, RegisterNewUser, GetToken, EmailLogin } from './bin/services/Firebase.js';

const app = setApp();
const { name, version } = packageJson;
const PORT = process.env.PORT || 8080;

['log', 'warn', 'error'].forEach(function(method) {
    var oldMethod = console[method].bind(console);
    console[method] = function() {
        oldMethod.apply(console, [
            `<${name}|${PORT}|${version}|${moment().utc().utcOffset('-06:00').format('MM-DD-YYYY hh:mm:ss A')} <${method.toUpperCase()}>>:`,
            ...arguments,
        ]);
    };
});

// GetUserByEmail('ppertinate@gmail.com').then(result => console.log(result)).catch(error => {
//     console.error(error);
//     RegisterNewUser('Pertinate', 'ppertinate@gmail.com', '[Pertinate]18').then(result => console.log(result)).catch(error => console.error(error));
// });
// GetToken('Pertinate').then(result => console.log(result)).catch(error => console.log(error));

EmailLogin('ppertinate@gmail.com', '[Pertinate]18');

app.listen(PORT, () => {
    console.log(`Server online`);
});
