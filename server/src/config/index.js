import path from 'path';
import configValues from './config'

module.exports = {
    root: path.normalize(`${__dirname}/../..`),
    getDbConnectionString: function () {
    },
    mongo: {
        uri: 'mongodb://localhost/generation',
        options: {
            db: {
                safe: true
            }
        }
    }
}

