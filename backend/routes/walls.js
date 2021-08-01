const express = require("express");

const router = express.Router();

const makeAList = (wallLength, isImperialUnit) => {
  const CENTER_SPACING_IMPERIAL = 16;
  const CENTER_SPACING_METRIC = 406.4;
  const STUD_OFFSET_IMPERIAL = 0.75;
  const STUD_OFFSET_METRIC = 19;
  const BASE_STUD = 0;
  const newArray = [BASE_STUD];
  const onCenterSpacing =
    isImperialUnit === "true" ? CENTER_SPACING_IMPERIAL : CENTER_SPACING_METRIC;
  const studOffset =
    isImperialUnit === "true" ? STUD_OFFSET_IMPERIAL : STUD_OFFSET_METRIC;

  for (
    let studCount = 1;
    studCount < Math.ceil(wallLength / onCenterSpacing);
    studCount += 1
  ) {
    newArray.push(studCount * onCenterSpacing - studOffset);
  }
  newArray.push(wallLength - 2 * studOffset);
  console.log(isImperialUnit, onCenterSpacing, newArray);
  return isImperialUnit === "true"
    ? newArray
    : newArray.map((roundedItem) => Math.round(roundedItem));
};

router.route("/test").get((req, res) => {
  res.json(makeAList(120, true));
});
router.route("/").get((req, res) => {
  const {wallLength, isImperialUnit} = req.query;
  res.json(makeAList(wallLength, isImperialUnit));
});

module.exports = router;
