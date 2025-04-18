const mongoose = require('mongoose');
const Product = require('./models/Product');
const productsData = require('./data/products.json'); // ✅ Add the .json extension

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/fullstack-prints', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', async () => {
  console.log('Connected to MongoDB ✅');

  try {
    // Delete all existing products from the database
    await Product.deleteMany();
    console.log('Old products deleted 🗑️');

    // Insert new products from the JSON file
    await Product.insertMany(productsData);
    console.log('Database seeded with new products 🌱');
  } catch (err) {
    console.error('Seeding failed ❌', err);
  } finally {
    mongoose.connection.close(); // Close the connection after seeding
  }
});
