import multer from 'multer';

import { getFileStorage } from '../fileStorage.js';


export const requireAvatar = multer({
    storage: getFileStorage('avatars'),
    limits: { fileSize: 1024 * 1024 * 10 }, // 10MB limit
}).single('avatar');

export const requireAttachments = multer({
    storage: getFileStorage('attachments'),
    limits: { fileSize: 1024 * 1024 * 10 }, // 10MB limit
}).array('attachments');
