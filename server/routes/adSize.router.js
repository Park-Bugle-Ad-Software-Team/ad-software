const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// allows us to retrieve info about a particular adSize
router.get('/:id', rejectUnauthenticated, (req, res) => {
    const sqlQuery = `SELECT * FROM "AdSize"
                      WHERE "id" = $1`;
    const sqlParams = [req.params.id];
    pool
        .query(sqlQuery, sqlParams)
        .then(dbRes => {
            res.send(dbRes.rows[0])
        })
        .catch(error => {
            console.log(`Failed getting adSize: ${req.params.id}: `, error)
        })
})

module.exports = router;
