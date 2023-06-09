import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from "crypto";


export const getAllowedExtensions = () => {
    return ['.jpg', '.jpeg', '.png']
};

export const getFileStorage = (destinationFolder) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join('storage', destinationFolder));
        },
        filename: function (req, file, cb) {
            cb(null, generateFileName(file.originalname));
        },
    });
    return storage;
};

export const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.log(err.message);
        }
        else {
            console.log(`File ${filePath} has been successfully deleted`);
        }

    });
}

const generateFileName = (originalFileName) => {
    const fileExtension = originalFileName.split(".").pop();

    const timestamp = new Date().toISOString().replace(/:/g, "-");
    const randomNumber = Math.floor(Math.random() * 10000);
    const hash = crypto.createHash("sha256");
    hash.update(`${originalFileName}_${timestamp}_${randomNumber}`);

    const hashedFileName = `${hash.digest("hex")}.${fileExtension}`;

    return hashedFileName;
}