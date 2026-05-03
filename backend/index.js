const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const devoteeRoutes = require("./routes/devotee.routes");
const userRoutes = require("./routes/user.routes");

const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "ISKCON Durg backend is running." });
});

app.use("/api/v1/devotees", devoteeRoutes);
app.use("/api/v1/user", userRoutes);

app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });
