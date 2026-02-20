// routes/testRoutes.js (Example)
const express = require("express");
const { productModel } = require("../../models/productModel");
const router = express.Router();


// 🟢 Test 1: Count All Products
router.get("/test-all-products", async (req, res) => {
  try {
    // No filter - Get EVERYTHING
    let allProducts = await productModel.find({});
    
    console.log("🟢 TEST: Total Products in DB:", allProducts.length);
    
    res.json({
      message: "Test API",
      count: allProducts.length,
      data: allProducts
    });
  } catch (err) {
    console.log("🔴 TEST ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Test 2: Check Database Connection
router.get("/test-db", async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const state = mongoose.connection.readyState;
    
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    console.log("🟢 DB State:", state);
    
    res.json({ 
      dbState: state, 
      dbName: mongoose.connection.name 
    });
  } catch (err) {
    console.log("🔴 DB Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;