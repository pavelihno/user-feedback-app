import multer from 'multer';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'storage/avatars');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const fileExtension = file.originalname.slice(file.originalname.lastIndexOf('.')).toLowerCase();
    if (allowedExtensions.includes(fileExtension)) {
        cb(null, true);
    } else {
        cb(new Error(`Avatar image must be one of the following file types: ${allowedExtensions.join(', ')}`), false);
    }
};

const requireAvatar = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 10 }, // 10MB limit
}).single('avatar');

export { requireAvatar };