const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    // Await the mongoose.connect promise
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = dbConnect;
