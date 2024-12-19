const router = require('express').Router()
const ProductController = require('../controllers/ProductController')


// Helpers
const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require('../helpers/image-upload')

router.post('/create', verifyToken, imageUpload.array('images'), ProductController.create)

router.get('/', ProductController.getAll)
router.get('/myproducts', verifyToken, ProductController.getAllUserProducts)
router.get('/myorders', verifyToken, ProductController.getAllUserOrders)
router.get('/:id', ProductController.getProductById)

router.delete('/:id', verifyToken , ProductController.removeProductById)

router.patch('/:id', verifyToken, imageUpload.array('images'), ProductController.updateProduct)
router.patch('/schedule/:id', verifyToken, ProductController.startNegotiation)
router.patch('/conclude/:id', verifyToken, ProductController.concludeSale)


module.exports = router