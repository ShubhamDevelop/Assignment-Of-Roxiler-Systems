import axios from "axios";
import Transaction from "../models/Transaction.js";

const seedDatabase = async () => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const products = response.data;

    products.forEach(async (product) => {
      const newProduct = new Transaction({
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        sold: product.sold,
        dateOfSale: product.dateOfSale,
        image: product.image,
      });

      await newProduct.save();
    });

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

export default seedDatabase;
