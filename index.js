const express = require("express");
const router = require("./routers");
const app = express();
const port = 300;

const myLogger = function (req, res, next) {
  console.log("LOGGED");
  next();
};
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.use(myLogger);

app.listen(port, () => {
  console.log(`Run at port ${port}`);
});
