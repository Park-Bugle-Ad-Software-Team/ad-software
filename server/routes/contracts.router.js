const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
const strFromObj = require('../modules/strFromObj')

// GET request that happens upon FETCH_PENDING_CONTRACTS
// IF the logged in user is an employee or admin
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

// GET request that happens upon FETCH_PENDING_CONTRACTS
// IF the logged in user is an advertiser
router.get('/pending/advertiser', rejectUnauthenticated, (req, res) => {
  const companyName = req.query.companyName;
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
      JOIN "Contracts_Users"
        ON "Contracts_Users"."contractId" = "Contracts"."id"
      JOIN "Users"
        ON "Users"."id" = "Contracts_Users"."userId"
    WHERE "isApproved" = false AND "Users"."companyName" = '${companyName}';
  `;
  pool.query(sqlText)
  .then((dbRes) => {
      // console.log('dbRes is', dbRes);
      res.send(dbRes.rows);
  })
  .catch((error) => {
      console.log('get advertiser pending contracts error', error);
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
      WHERE "startMonth" <= 'NOW';
  `;
  pool.query(sqlText)
  .then((dbRes) => {
      res.send(dbRes.rows);
  })
  .catch((error) => {
      console.log('get active contracts error', error);
      res.sendStatus(500);
  });
});

// GET request that happens upon FETCH_ACTIVE_CONTRACTS
// IF the logged in user is an advertiser
router.get('/active/advertiser', rejectUnauthenticated, (req, res) => {
  const companyName = req.query.companyName;
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
      JOIN "Contracts_Users"
        ON "Contracts_Users"."contractId" = "Contracts"."id"
      JOIN "Users"
        ON "Users"."id" = "Contracts_Users"."userId"
    WHERE "startMonth" <= 'NOW' AND "Users"."companyName" = '${companyName}';
  `;
  pool.query(sqlText)
  .then((dbRes) => {
      // console.log('dbRes is', dbRes);
      res.send(dbRes.rows);
  })
  .catch((error) => {
      console.log('get advertiser pending contracts error', error);
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
      console.log('get closed contracts error', error);
      res.sendStatus(500);
  });
});

// GET request that happens upon FETCH_CLOSED_CONTRACTS
// IF the logged in user is an advertiser
router.get('/closed/advertiser', rejectUnauthenticated, (req, res) => {
  const companyName = req.query.companyName;
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
      JOIN "Contracts_Users"
        ON "Contracts_Users"."contractId" = "Contracts"."id"
      JOIN "Users"
        ON "Users"."id" = "Contracts_Users"."userId"
    WHERE "startMonth" >= 'NOW' AND "Users"."companyName" = '${companyName}';
  `;
  pool.query(sqlText)
  .then((dbRes) => {
      res.send(dbRes.rows);
  })
  .catch((error) => {
      console.log('get advertiser pending contracts error', error);
      res.sendStatus(500);
  });
});

router.get('/edit/:id', rejectUnauthenticated, (req, res) => {
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

router.put('/edit/:id', (req, res) => {
  const sqlText = `
  UPDATE "Contracts"
  SET 
    "adSizeId" = $2,
    "notes" = $3,
    "startMonth" = $4,
    "commissionPercentage" = $5,
    "colorId" = $6,
    "contractType" = $7,
    "calculatedBill" = $8,
    "actualBill" = $9,
    "page" = $10,
    "isApproved" = $11,
    "pricingSchemaId" = $12,
    "months" = $13
  WHERE "id" = $1
  `;

  const sqlParams = [
    req.body.id,
    req.body.adSizeId,
    req.body.notes,
    req.body.startMonth,
    req.body.commissionPercentage,
    req.body.colorId,
    req.body.contractType,
    req.body.calculatedBill,
    req.body.actualBill,
    req.body.page,
    req.body.isApproved,
    req.body.pricingSchemaId,
    req.body.months
  ];

  pool.query(sqlText, sqlParams)
    .then(dbRes => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.error(`Failed to update contract at id: ${req.body.id}`, error);
    });
})

router.get('/rates', rejectUnauthenticated, (req, res) => {
  let sqlText = `
  SELECT * FROM "Rates"
  ORDER BY "rateName" DESC
  `;

  pool.query(sqlText)
    .then(dbRes => {
      res.send(dbRes.rows);
    })
    .catch(error => {
      console.error('Failed to select Rates from db', error);
    })
})

router.get('/ad-sizes', rejectUnauthenticated, (req, res) => {
  let sqlText = `
  SELECT * FROM "AdSize"
  ORDER BY "id" ASC
  `;

  pool.query(sqlText)
    .then(dbRes => {
      res.send(dbRes.rows);
    })
    .catch(error => {
      console.error('Failed to select Rates from db', error);
    })
})

/**
 * POST route template
 */
 router.post('/:advertiserId', rejectUnauthenticated, (req, res) => {
  console.log('req.body is: ', req.body);
  const imageUrl  = req.body.imageUrl;
  delete req.body.userId;
  delete req.body.imageUrl

 

  properties = strFromObj(req.body, ', ', element => `"${element}"`)
  values = strFromObj(req.body, ', ', (element, i) => `$${i + 1}`)

  const queryText = `INSERT INTO "Contracts" (${properties})
                      VALUES (${values}) 
                      RETURNING id`;
  const sqlParams = Object.values(req.body);
  pool
    .query(queryText, sqlParams)
    .then((dbRes) => {
      // res.sendStatus(201)
      // also need to insert:
        const contractsUsersQuery = `INSERT INTO "Contracts_Users" ("contractId", "userId")
                          VALUES ($1, $2)`;
        // users_contracts - which use
        const contractsUsersParams = [dbRes.rows[0].id, req.params.advertiserId]
        pool
          .query(contractsUsersQuery, contractsUsersParams)
          .then(innerDbResponse => {
            const imagesQuery = `INSERT INTO "Images" ("contractId", "imageUrl")
                                 VALUES ($1, $2)`;
            const imagesParams = [dbRes.rows[0].id, imageUrl];
            pool
              .query(imagesQuery, imagesParams)
              .then(() => {
                res.sendStatus(200)
              })
              .catch(error => {
                console.log('Failed to POST to "Images" while posting a new contract: ', error)
                res.sendStatus(500);
              })
          })
          .catch(error => {
            console.log('Failed to POST to contracts_user while posting new contract: ', error);
            res.sendStatus(500);
          })
    })
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const sqlQuery = `DELETE FROM "Contracts"
                    WHERE "id" = $1`;
  const sqlParams = [req.params.id]
  pool
    .query(sqlQuery, sqlParams)
    .then(dbRes => {
      const imagesQuery = `DELETE FROM "Images"
                           WHERE "contractId" = $1`;
      const imagesParams = [req.params.id];;
      pool
        .query(imagesQuery, imagesParams)
        .then(dbResponse => {
          const contractsUsersQuery = `DELETE FROM "Contracts_Users"
                                       WHERE "contractId" = $1`;
          const contractsUsersParams = [req.params.id]
          pool
            .query(contractsUsersQuery, contractsUsersParams)
            .then(innerResponse => {
              res.sendStatus(200);
            })
            .catch(error => {
              console.log('Failed to delete from Contracts_Users: ', error)
              res.sendStatus(500);
            })
        })
        .catch(error => {
          console.log('Failed to delete from images: ', error)
          res.sendStatus(500);
        })
    })
    .catch(error => {
      console.log('Failed to delete contract.')
      res.sendStatus(500);
    })
})

module.exports = router;