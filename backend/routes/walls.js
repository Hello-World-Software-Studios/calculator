"use strict";
const express = require("express");
const router = express.Router();
const cors = require("cors");

const makeAList = (wallLength, isImperialUnit) => {
  const CENTER_SPACING_IMPERIAL = 16;
  const CENTER_SPACING_METRIC = 406.4;
  const STUD_OFFSET_IMPERIAL = 0.75;
  const STUD_OFFSET_METRIC = 19;
  const BASE_STUD = 0;
  const newArray = [BASE_STUD];
  const onCenterSpacing = isImperialUnit
    ? CENTER_SPACING_IMPERIAL
    : CENTER_SPACING_METRIC;
  const studOffset = isImperialUnit ? STUD_OFFSET_IMPERIAL : STUD_OFFSET_METRIC;
  for (
    let studCount = 1;
    studCount < Math.ceil(wallLength / onCenterSpacing);
    studCount += 1
  ) {
    newArray.push(studCount * onCenterSpacing - studOffset);
  }
  newArray.push(wallLength - 2 * studOffset);
  if (isImperialUnit) {
    return newArray;
  }
  return newArray.map((roundedItem) => Math.round(roundedItem));
};

router.use(
  cors({
    origin: "http://localhost:3000/",
  })
);
router
  .route("/test")
  .get((req, res) => {
    res.json(makeAList(900, false));
  })
  .post((req, res) => {});
router
  .route("/")
  .get((req, res) => {
    const {wallLength, isImperialUnit} = req.query;
    res.json(makeAList(wallLength, isImperialUnit));
  })
  .post((req, res) => {});

module.exports = router;
