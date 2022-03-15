import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // set the folder where to upload files to
        cb(null, 'static/uploads')
    },
    filename: function (req, file, cb) {
        const mimeParts = file.mimetype.split('/')
        const extension = mimeParts[mimeParts.length - 1]
        cb(null, file.fieldname + '-' + Date.now() + '.' + extension)
    }
})

// Set the maximum allowed file size to 4 MB
const maxSize = 4 * 1024 * 1024

export const upload = multer({ 
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb){
        // Set the filetypes, it is optional
        const filetypes = /jpeg|jpg|png/
        const mimetype = filetypes.test(file.mimetype)
  
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
        
        if (mimetype && extname) {
            return cb(null, true)
        }
      
        cb(new Error("Error: File upload only supports the " + "following filetypes - " + filetypes))
      }
})
