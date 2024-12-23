const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const blogRouter = require("./routes/blogRoute");
const categoryRouter = require("./routes/prodcategoryRoute");
const blogcategoryRouter = require("./routes/blogCatRoute");
const brandRouter = require("./routes/brandRoute");
const colorRouter = require("./routes/colorRoute");
const enqRouter = require("./routes/enqRoute");
const couponRouter = require("./routes/couponRoute");
const uploadRouter = require("./routes/uploadRoute");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

// Connect to the database
dbConnect();

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// API routes
app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blogcategory", blogcategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/color", colorRouter);
app.use("/api/enquiry", enqRouter);
app.use("/api/upload", uploadRouter);

// Serve static files for Frontend
app.use(express.static(path.join(__dirname, "Frontend", "build")));

// Serve static files for Admin
app.use(express.static(path.join(__dirname, "Admin", "build")));

// Catch-all route for Frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "build", "index.html"));
});

// Catch-all route for Admin
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "Admin", "build", "index.html"));
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running at PORT ${PORT}`);
});
