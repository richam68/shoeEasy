var express = require("express");
var router = express.Router();
const axios = require("axios");
const { handleError, getProduct } = require("../utils");
var { products } = require("../db");

router.get("/", (req, res) => {
  console.log("Request received for retrieving products list");

  products.find({}, (err, docs) => {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(docs);
  });
});

// /search?value=
router.get("/search", (req, res) => {
  console.log("Request received for searching ", req.query.value);

  //Creating a RegEx to search
  const searchRegex = new RegExp(req.query.value.replace(/['"]+/g, ""), "i");

  products.find(
    {
      $or: [
        { name: searchRegex },
        { category: searchRegex },
        { brand: searchRegex },
      ],
    },
    (err, docs) => {
      if (err) {
        return handleError(res, err);
      }

      if (docs.length) {
        return res.status(200).json(docs);
      } else {
        return res.status(404).json([]);
      }
    }
  );
});



router.get("/search/suggestions", async (req, res) => {
  try {
    // Fetch suggestions from Google suggest API
    const response = await axios.get(
      "http://suggestqueries.google.com/complete/search",
      {
        params: {
          client: "firefox",
          ds: "yt",
          q: req.query.value, 
        },
      }
    );

    // Extract suggestions from the response
    const suggestions = response.data[1];

    res.json(suggestions);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});


router.get("/:id", async (req, res) => {
  console.log(
    `Request received for retrieving product with id: ${req.params.id}`
  );
  try {
    const product = await getProduct(req.params.id);
    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json();
    }
  } catch (error) { 
    handleError(res, error);
  }
});

module.exports = router;
