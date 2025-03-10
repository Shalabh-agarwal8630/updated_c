const { fetchProducts, fetchProductDetails } = require('../services/productService');
const fs = require('fs');
const path = require('path');
const getProducts = async (req, res) => {
  const { categoryname } = req.params;
  const { top, minPrice, maxPrice, page, sort, order } = req.query;

  try {
    const topValue = Number(top) || 10;
    const pageValue = Number(page) || 1;
    
    if (topValue > 10 && !page) {
      return res.status(400).json({ message: 'Page parameter is required when top is greater than 10' });
    }

    const result = await fetchProducts(
      categoryname,
      topValue,
      minPrice,
      maxPrice,
      pageValue,
      sort,
      order
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

const getProductDetails = async (req, res) => {
  const { productid } = req.params;
  try {
    const product = await fetchProductDetails(productid);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product details', error });
  }
};

const getAllProducts = async(req,res) => {
  const dataFilePath = path.join(__dirname, '../services', 'products.json');
  const raw_data = fs.readFileSync(dataFilePath);
    if(!raw_data) return res.status(500).json({
      message: "Error reading data",
    });
    const res_data = JSON.parse(raw_data);
    // console.log(Object.values(res_data));
    res.status(200).json({
      message: "success",
      data: Object.values(res_data),
    });
}


module.exports = {
  getProducts,
  getProductDetails,
  getAllProducts
};

