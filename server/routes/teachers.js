const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Teachers route');
});

module.exports = router;