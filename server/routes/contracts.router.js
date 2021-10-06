const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/pending', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT * FROM "Contracts"
    WHERE "isApproved" = false
  `;
  pool.query(sqlText)
  .then((dbRes) => {
      console.log('dbRes is', dbRes);
      res.send(dbRes.rows);
  })
  .catch((error) => {
      console.log('get pending contracts error', error);
      res.sendStatus(500);
  });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;