const express = require('express');
const { getProducts, getProductDetails, getAllProducts } = require('../controllers/ProductController');

const router = express.Router();

router.get('/:categoryname/products', getProducts);
router.get('/:categoryname/products/:productid', getProductDetails);
router.get('/getALLProducts', getAllProducts);

module.exports = router;
