const express = require('express');
let router = express.Router();

let manage = require('../modules/admin/manage');
let article = require('../modules/article');

// manage
router.use('/manage',manage);

// article
router.use('/article',article);

module.exports = router;