"use strict";
const express = require("express");
const router = express.Router();
const savedData = require("../savedData");

router
  .route("/")
  .get((req, res) => {
    res.send(JSON.stringify(savedData));
  })
  .post((req, res) => {});
router
  .route("/:name")
  .get((req, res) => {
    res.send(JSON.stringify(savedData.name));
  })
  .post((req, res) => {});
router
  .route("/:walls")
  .get((req, res) => {
    res.send(JSON.stringify(savedData.walls));
  })
  .post((req, res) => {});

module.exports = router;
