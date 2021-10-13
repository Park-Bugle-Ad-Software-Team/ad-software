const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
const strFromObj = require('../modules/strFromObj')

router.get('/edit', rejectUnauthenticated, (req, res) => {
    const sqlText = `
    SELECT * FROM "Rates"
    `;

    pool.query(sqlText)
        .then(dbRes => {
            res.send(dbRes.rows);
        })
        .catch(error => {
            console.log('Error getting rates to edit from db', error);
            res.sendStatus(500);
        });
});


module.exports = router;