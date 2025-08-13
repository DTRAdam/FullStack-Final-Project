const expressRoutes = require("express-list-routes");
const express = require("express")
const users = require("./routes/users")
const products = require("./routes/products")
const app = express()
const chalk = require("chalk")
const carts = require("./routes/carts")
const cors = require("cors")
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose")
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env";
require("dotenv").config({ path: envFile });
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logger.log"),
  { flags: "a" }
);

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({

  allowedHeaders: ["Content-Type", "x-auth-token"]
}));
app.use(morgan("dev", { stream: accessLogStream }))

app.use("/users", users);
app.use("/products", products);
app.use("/carts", carts);
app.listen(PORT, () => console.log(chalk.bgBlack(`Server started on ${PORT}`)))

mongoose.connect(process.env.DB,).then(() => {
  console.log(chalk.green("Connected to MongoDB successfully!"));
}).catch(() => {
  console.log("Error conecting mongoose");
})



app.use((req, res, next) => {
  next()
})

if (process.env.NODE_ENV === "development") {
  console.log(chalk.white.bgBlack.bold("App is running in Development mode"));
  expressRoutes(app);
} else {
  console.log(chalk.bgBlack.red.bold("App is running in Production mode"));
}
