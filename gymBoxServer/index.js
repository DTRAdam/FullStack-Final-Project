const expressRoutes = require("express-list-routes");
const express = require("express")
const chalk = require("chalk")
const cors = require("cors")
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose")
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env";
require("dotenv").config({ path: envFile });
const PORT = process.env.PORT || 8008;
const users = require("./routes/users");
const products = require("./routes/products");
const carts = require("./routes/carts");

const app = express();


const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logger.log"),
  { flags: "a" }
);
app.use(morgan("dev", { stream: accessLogStream }));
app.use(cors());
app.use(express.json());


app.use("/users", users);
app.use("/products", products);
app.use("/carts", carts);



mongoose.connect(process.env.DB)
  .then(() => {
    console.log(chalk.green("Connected to MongoDB successfully!"));
    app.listen(PORT, () => {
      console.log(chalk.bgBlack(`Server started on ${PORT}`));

      if (process.env.NODE_ENV === "development") {
        console.log(chalk.white.bgBlack.bold("App is running in Development mode"));
        expressRoutes(app);
      } else {
        console.log(chalk.bgBlack.red.bold("App is running in Production mode"));
      }
    });
  })
  .catch((err) => {
    console.error(chalk.red("FATAL ERROR: Could not connect to MongoDB."), err);
  });