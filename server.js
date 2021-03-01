require("dotenv").config({ path: "./config.env" });

const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const cors = require("cors");

// connect db
connectDB();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: true,
  })
);
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

// Error handler (sholud be last piece of middle ware)
app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).send("Home page");
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Logged eroor: ${err}`);
  server.close(() => process.exit(1));
});
