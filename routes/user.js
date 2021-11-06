const express = require('express');
const router = express.Router();

// GET /user
router.get('/', (req, res) => {
  res.send('Hello user');
});

router.get('/:id', function (req, res) {
  console.log(req.params, req.query);
  res.send('user id');
});

module.exports = router;