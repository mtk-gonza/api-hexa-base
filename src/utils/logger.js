import fs from 'fs';
import path from 'path';

export class Logger {
    constructor(options = {}) {
        this.logFilePath = options.logFilePath || null;
        this.levels = ['debug', 'info', 'warn', 'error'];
        this.currentLevel = options.level || 'debug';
    }

    _shouldLog(level) {
        return this.levels.indexOf(level) >= this.levels.indexOf(this.currentLevel);
    }

    _format(level, message) {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
    }

    _writeToFile(message) {
        if (!this.logFilePath) return;
        fs.appendFile(this.logFilePath, message + '\n', err => {
            if (err) console.error('Error writing log to file:', err);
        });
    }

    log(level, message) {
        if (!this._shouldLog(level)) return;
        const formatted = this._format(level, message);
        console.log(formatted);
        this._writeToFile(formatted);
    }

    debug(message) {
        this.log('debug', message);
    }

    info(message) {
        this.log('info', message);
    }

    warn(message) {
        this.log('warn', message);
    }

    error(message) {
        this.log('error', message);
    }
}

const defaultLogger = new Logger({
    logFilePath: path.resolve('app.log'),
    level: 'debug',
});