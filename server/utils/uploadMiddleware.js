import multer from 'multer';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'storage/avatars');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const requireAvatar = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 }, // 10MB limit
}).single('avatar');

export { requireAvatar };