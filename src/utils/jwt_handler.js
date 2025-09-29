import jwt from 'jsonwebtoken'
import settings from './../config/settings.js'

export const sign = (payload) => {
    return jwt.sign(payload, settings.JWT_SECRET, { expiresIn: settings.JWT_EXPIRES_IN });
}

export const verify = (token) => {
    return jwt.verify(token, settings.JWT_SECRET);
}