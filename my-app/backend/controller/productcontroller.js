import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    let filter = {};
    if (category) {
      filter.category = category.toLowerCase();
    }
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }
    const products = await Product.find(filter);
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error while fetching products" });
  }
};
