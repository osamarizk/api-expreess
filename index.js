// build middleware to parse body request into JSON format
const express = require("express");
const app = express();
const PORT = 8080;
const fs = require("fs");
const csv = require("csvtojson");
const { parser } = require("json2csv");
const { v4: uuid } = require("uuid");
const _ = require("lodash");

app.use(express.json());

app.listen(PORT, () =>
  console.log(`server start and runing on url http://loalhost:${PORT}`)
);

//async function to read csv file

app.get("/books/", (req, res) => {
  (async () => {
    //load the books
    const books = await csv().fromFile("books.csv");
    console.log(books);
    res.json(books);
  })();
});

app.get("/companies/", (req, res) => {
  (async () => {
    //load the companies
    const companies = await csv().fromFile("companies.csv");
    res.json(companies);
  })();
});

app.post("/comments", (req, res) => {
  const id = uuid();

  const content = req.body.content;
  if (!content) {
    return res.sendStatus(400);
  }

  // (async () => {
  //   await fs.mkdir("data/comments", { recursive: true });
  //   await fs.writeFile(`data/comments/${id}.txt`, content);
  // })();

  res.sendStatus(201); // mean that object created successfuly
});

app.post("/tshirt/:id", (req, res) => {
  const { id } = req.params; // get url from request url
  const { logo } = req.body;

  if (!logo) {
    res.status(418).send({ message: "We need logo" });
  }

  res.send({ "t-shirt": `your t-shirt ${logo} and t-shirt id:${id}` });
  // res.status(200).send({
  //  .send({ message: `Please provide a logo ${logo} and t-shirt id:${id}` });
  //   "T-shirt": "👕",
  //   size: "Large",
  //   Prce: "200 EGP",
  // });
});
