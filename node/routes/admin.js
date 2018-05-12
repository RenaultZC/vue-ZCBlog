const express = require('express');
let router = express.Router();

let manage = require('../modules/admin/manage');

// manage
router.use('/manage',manage);
// article
// router.use('/article');
module.exports = router;