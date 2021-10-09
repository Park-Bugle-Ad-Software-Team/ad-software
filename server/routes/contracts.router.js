const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// GET request that happens upon FETCH_PENDING_CONTRACTS
router.get('/pending/', rejectUnauthenticated, (req, res) => {
  const advertiserSqlText = `
    SELECT
    "Contracts".*,
    to_json("AdSize".*) as "AdSize",
    to_json("Color".*) as "Color",
    to_json("Users".*) as "Users"
    FROM "Contracts"
      JOIN "AdSize"
        ON "AdSize"."id" = "Contracts"."adSizeId"
      JOIN "Sponsorship"
        ON "Sponsorship"."id" = "Contracts"."sponsorshipId"
      JOIN "Color"
        ON "Color"."id" = "Contracts"."colorId"
      JOIN "Contracts_Users"
        ON "Contracts_Users"."contractId" = "Contracts"."id"
      JOIN "Users"
        ON "Users"."id" = "Contracts_Users"."userId"
    WHERE "isApproved" = false AND "Users"."companyName" = '${req.query.companyName}';
  `;
  const sqlText = `
  SELECT
  "Contracts".*,
  to_json("AdSize".*) as "AdSize",
  to_json("Color".*) as "Color",
  to_json("Users".*) as "Users"
  FROM "Contracts"
    JOIN "AdSize"
      ON "AdSize"."id" = "Contracts"."adSizeId"
    JOIN "Sponsorship"
      ON "Sponsorship"."id" = "Contracts"."sponsorshipId"
    JOIN "Color"
      ON "Color"."id" = "Contracts"."colorId"
  WHERE "isApproved" = false;
  `;
  if (req.query.authLevel === 'advertiser') {
    pool.query(advertiserSqlText)
    .then((dbRes) => {
        // console.log('dbRes is', dbRes);
        res.send(dbRes.rows);
    })
    .catch((error) => {
        console.log('get pending contracts error', error);
        res.sendStatus(500);
    });
  }
  else {
    pool.query(sqlText)
    .then((dbRes) => {
        // console.log('dbRes is', dbRes);
        res.send(dbRes.rows);
    })
    .catch((error) => {
        console.log('get pending contracts error', error);
        res.sendStatus(500);
    });
  }
});

// GET request that happens upon FETCH_ACTIVE_CONTRACTS
router.get('/active', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT
    "Contracts".*,
    to_json("AdSize".*) as "AdSize",
    to_json("Color".*) as "Color"
    FROM "Contracts"
      JOIN "AdSize"
        ON "AdSize"."id" = "Contracts"."adSizeId"
      JOIN "Sponsorship"
        ON "Sponsorship"."id" = "Contracts"."sponsorshipId"
      JOIN "Color"
        ON "Color"."id" = "Contracts"."colorId"
      WHERE ("startMonth" <= 'NOW') AND ("isApproved" = true);
  `;
  pool.query(sqlText)
  .then((dbRes) => {
      // console.log('dbRes is', dbRes);
      res.send(dbRes.rows);
  })
  .catch((error) => {
      console.log('get pending contracts error', error);
      res.sendStatus(500);
  });
});

// GET request that happens upon FETCH_CLOSED_CONTRACTS
router.get('/closed', rejectUnauthenticated, (req, res) => {
  const sqlText = `
  SELECT
  "Contracts".*,
  to_json("AdSize".*) as "AdSize",
  to_json("Color".*) as "Color"
  FROM "Contracts"
    JOIN "AdSize"
      ON "AdSize"."id" = "Contracts"."adSizeId"
    JOIN "Sponsorship"
      ON "Sponsorship"."id" = "Contracts"."sponsorshipId"
    JOIN "Color"
      ON "Color"."id" = "Contracts"."colorId"
    WHERE "startMonth" <= 'NOW';
  `;
  pool.query(sqlText)
  .then((dbRes) => {
      // console.log('dbRes is', dbRes);
      res.send(dbRes.rows);
  })
  .catch((error) => {
      console.log('get pending contracts error', error);
      res.sendStatus(500);
  });
});

// GET request that happens upon FETCH_ALL_CONTRACTS
router.get('/all', rejectUnauthenticated, (req, res) => {
  const sqlText = `
  SELECT
  "Contracts".*,
  to_json("AdSize".*) as "AdSize",
  to_json("Color".*) as "Color"
  FROM "Contracts"
    JOIN "AdSize"
      ON "AdSize"."id" = "Contracts"."adSizeId"
    --JOIN "Sponsorship"
    --  ON "Sponsorship"."id" = "Contracts"."sponsorshipId"
    JOIN "Color"
      ON "Color"."id" = "Contracts"."colorId"
    WHERE "isApproved" = true;
  `;
  pool.query(sqlText)
  .then((dbRes) => {
      // console.log('dbRes is', dbRes);
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