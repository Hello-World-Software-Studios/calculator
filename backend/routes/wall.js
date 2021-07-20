 'use strict';
 const express = require('express');
 const router = express.Router();

 router.route('/')
 .get((req, res) => {
     res.send("hello");
 })
 .post((req, res) => {});
 router.route('/:listOfWalls')
 .get((req, res) => {})
 .post((req, res) => {});

module.exports = router;