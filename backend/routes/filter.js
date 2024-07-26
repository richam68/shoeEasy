var express = require("express");
var router = express.Router();
const { handleError, verifyAuth, getProduct, getFilteredProducts } = require("../utils");
var { users, products } = require("../db");
const { getFilters, addFilters, removeFilters } = require("../controllers/filter.controllers");

//Filter Controller

router.get("/", async (req, res) => {
  try {
    const filters = req.query;
    const products = await getFilteredProducts(filters);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
router.post("/", async (req, res) => {
  try {
    const filterData = req.body;
    await users.insertOne(filterData);
    res.status(201).send("Filter added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}); 
router.delete("/", removeFilters);

module.exports = router;