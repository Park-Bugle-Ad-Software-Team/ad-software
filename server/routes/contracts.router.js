const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// GET request that happens upon FETCH_PENDING_CONTRACTS
router.get('/pending', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT
    "Contracts".*,
    to_json("AdSize".*) as "AdSize",
    to_json("Color".*) as "Color"
    FROM "Contracts"
      JOIN "AdSize"
        ON "AdSize"."id" = "Contracts"."adSizeId"
      JOIN "Color"
        ON "Color"."id" = "Contracts"."colorId"
    WHERE "isApproved" = false;
  `;
  pool.query(sqlText)
  .then((dbRes) => {
      res.send(dbRes.rows);
  })
  .catch((error) => {
      console.log('get pending contracts error', error);
      res.sendStatus(500);
  });
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
      JOIN "Color"
        ON "Color"."id" = "Contracts"."colorId"
      WHERE ("startMonth" <= 'NOW') AND ("isApproved" = true);
  `;
  pool.query(sqlText)
  .then((dbRes) => {
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
    JOIN "Color"
      ON "Color"."id" = "Contracts"."colorId"
    WHERE "startMonth" <= 'NOW';
  `;
  pool.query(sqlText)
  .then((dbRes) => {
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
    JOIN "Color"
      ON "Color"."id" = "Contracts"."colorId"
    WHERE "isApproved" = true;
  `;
  pool.query(sqlText)
  .then((dbRes) => {
      res.send(dbRes.rows);
  })
  .catch((error) => {
      console.log('get pending contracts error', error);
      res.sendStatus(500);
  });
});

router.get('/edit/:id', rejectUnauthenticated, (req, res) => {
  // for ad card display/edits of a particular contract, we need:
    // Users table - advertiser's name
    // Contract table - start month
    // Contract table - (from the start month field) start year
    // contract table - print/web
    // adsize table - (months) length
    // images table - images
    // colors table - colors
    // adSize type - adSize
    // sponsorship program status
    // contract table - notes
    // contract table - (actualBill) actual price
    


    // removing chat from this pull for testing
  const sqlText = `
    SELECT
    "Contracts".*,
    to_json("AdSize".*) as "AdSize",
    to_json("Color".*) as "Color"
    --to_json("Chat".*) as "Chat"

    FROM "Contracts"
      JOIN "AdSize"
        ON "AdSize"."id" = "Contracts"."adSizeId"
      JOIN "Color"
        ON "Color"."id" = "Contracts"."colorId"
      
      WHERE "Contracts"."id" = $1;
    `;
  pool
    .query(sqlText, [req.params.id])
    .then(dbRes => {
      res.send(dbRes.rows[0]);
    })
    .catch(error => {
      console.log(`Failed to GET ${req.params.id}'s information for editing: `, error)
    })
})

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;