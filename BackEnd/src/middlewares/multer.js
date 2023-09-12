import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './static/documents')
    },
    filename: function (req, file, cb) {
        const date = Date.now()
        if(req.user){
            cb(null, `${date}-${req.user["email"]}-${file.originalname}`)
        }else{
            cb(null, `${date}-usuarioNoLogeado-${file.originalname}`)
            }
    }
})

const fileFilter = function(req, file, cb) {
  if (file.mimetype === 'application/json') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const multerUpload = multer({ storage, fileFilter })
