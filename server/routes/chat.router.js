const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const contractId = req.query[0];
    // console.log('payload is', payload);
    const sqlText = `
        SELECT
        "Chat".*,
        to_json("Users".*) as "Users"
        FROM "Chat"
        JOIN "Users"
            ON "Users"."id" = "Chat"."userId"
        WHERE "Chat"."contractId" = ${contractId}
        ORDER BY "Chat"."timeStamp" ASC
    `;
    pool.query(sqlText)
    .then((dbRes) => {
        // console.log('dbRes is', dbRes.rows);
        res.send(dbRes.rows);
    })
    .catch((error) => {
        console.log('get chat error', error);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    console.log('req.body is', req.body);
    const sqlText = `
        INSERT INTO "Chat"
            ("message", "userId", "contractId")
        VALUES
            ($1, $2, $3)
    `;
    const sqlParams = [
        req.body.messageToSend,
        req.body.userId,
        req.body.contractChatId
    ];
    pool.query(sqlText, sqlParams)
    .then((results) => {
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log('post chat error', error);
        res.sendStatus(500);
    });
});

module.exports = router;
