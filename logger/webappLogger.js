import {createLogger, format, transports} from 'winston';

const { combine, timestamp, printf, json } = format;

// const webappLogFormat = printf(({ level, message, timestamp }) => {
//     return `${timestamp} : ${message}`;
// });

const webappLogger = createLogger({
    level: 'debug',
    format: combine(
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        json()
    ),
    transports: [
        new transports.File({ filename: '/var/log/webapp/webapp.log', level: 'debug' }),
    ],
})

export default webappLogger;