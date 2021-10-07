const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        SELECT * FROM "Chat"
        WHERE "Chat"."contractId" = ${req.params.id}
    `;
    pool.query(sqlText)
    .then((dbRes) => {
        console.log('dbRes is', dbRes);
        res.send(dbRes.rows);
    })
    .catch((error) => {
        console.log('get chat error', error);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
