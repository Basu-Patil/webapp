import {createLogger, format, transports} from 'winston';
import dotenv from 'dotenv';

dotenv.config();

const { combine, timestamp, printf, json } = format;


// const webappLogFormat = printf(({ level, message, timestamp }) => {
//     return `${timestamp} : ${message}`;
// });

const logDirName = process.env.LOG_DIR_NAME || '/var/log/webapp';

const webappLogger = createLogger({
    level: 'debug',
    format: combine(
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        json()
    ),
    transports: [
        new transports.File({ filename: `${process.env.logDirName}/webapp.log`, level: 'debug' }),
    ],
})
export default webappLogger;