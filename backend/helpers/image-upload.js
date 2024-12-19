const multer = require('multer')
const path = require('path')

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = ""
        if(req.baseUrl.includes('users')) {
            folder = 'users'
        } else if (req.baseUrl.includes('products')) {
            folder = 'products'
        }

        cb(null, `public/images/${folder}`)
    },
    filename: function (req, file, cb) {
        // As imagens estavam sendo carregadas muito rapido e o timestamp não era suficiente para deixar o nome da imagem unico, por isso o Math.random
        cb(null, Date.now() + String(Math.floor(Math.random()*1000)) + path.extname(file.originalname))
    }

})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg|webp|jpeg|avif)$/)) {
            return cb(new Error('Por favor, envie apenas jpg ou png'))
        }
        cb(undefined, true)
    }, 
})

module.exports = { imageUpload }