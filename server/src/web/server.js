require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const routes = require("./routes");

const app = express();

app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(routes);

const port = process.env.PORT || 24000;

app.listen(port, () => {
  console.log(`Ready to serve at http://localhost:${port}`);
});
