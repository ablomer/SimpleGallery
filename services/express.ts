import { mediaPath } from "../config";

const path = require("path");
const express = require("express");
const app = express();
const port = 3000;

const publicPath = path.join(__dirname, "../../public");

app.use("/media", express.static(mediaPath));
app.use("/", express.static(publicPath));

app.listen(port, () => console.log(`Client ready at http://localhost:${port}/`));
