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

router.put('/', (req, res) => {
    console.log('req.body is', req.body);
    let reqBody = req.body;

    const sqlText =    `
    UPDATE "Rates"
    SET "rateName" = $1, "isLessThanEight" = $2, "isTwelveToTwenty" = $3, 
    "isTwentyPlus" = $4, "isEightToTwelve" = $5
    WHERE "id" = $6
    `;

    for (let item of reqBody) {
        let sqlParams = [
            item.rateName,
            item.isLessThanEight,
            item.isTwelveToTwenty,
            item.isTwentyPlus,
            item.isEightToTwelve,
            item.id
        ];
        console.log('params', sqlParams);
        pool.query(sqlText, sqlParams)
            .then(dbRes => {
                console.log('passed');
            })
            .catch(error => {
                console.log('Error updating database rates', error);
                res.sendStatus(500);
                return;
            });
    }
    res.sendStatus(200);
})


module.exports = router;