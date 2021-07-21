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
  .route("/:wallLength")
  .get((req, res) => {})
  .post((req, res) => {});

module.exports = router;
