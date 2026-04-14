import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const dummyProducts = [
  { title: "Samsung Galaxy S23", description: "Latest Samsung smartphone", price: 799, thumbnail: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80", category: "mobile" },
  { title: "iPhone 15", description: "Apple iPhone 15", price: 899, thumbnail: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80", category: "mobile" },
  { title: "Sony Bravia 55 inch", description: "4K smart TV", price: 599, thumbnail: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80", category: "tv" },
  { title: "LG Refrigerator", description: "Double door frost-free", price: 1200, thumbnail: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=500&q=80", category: "refrigerator" },
  { title: "MacBook Pro M3", description: "Apple laptop", price: 1999, thumbnail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80", category: "laptop" },
  { title: "Dell XPS 15", description: "Windows laptop", price: 1499, thumbnail: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=80", category: "laptop" },
  { title: "Samsung Washing Machine", description: "Front load 8kg", price: 499, thumbnail: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&q=80", category: "washing machine" },
  { title: "Daikin 1.5 Ton AC", description: "Split Inverter AC", price: 699, thumbnail: "https://images.pexels.com/photos/331990/pexels-photo-331990.jpeg?auto=compress&cs=tinysrgb&w=500", category: "air conditioner" },
  { title: "Sony WH-1000XM5", description: "Noise cancelling headphones", price: 349, thumbnail: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80", category: "headphones" },
  { title: "Apple Watch Series 9", description: "Smartwatch with health tracking", price: 399, thumbnail: "https://images.unsplash.com/photo-1434493789847-2f02b0c1e878?w=500&q=80", category: "smartwatch" },
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to DB, clearing existing products...");
    await Product.deleteMany({});
    console.log("Inserting dummy products...");
    await Product.insertMany(dummyProducts);
    console.log("Products seeded successfully.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("DB connection error:", err);
    process.exit(1);
  });
