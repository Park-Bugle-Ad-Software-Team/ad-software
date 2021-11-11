const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
const strFromObj = require('../modules/strFromObj')

// retrieve a list of all contracts
router.get('/all', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT
      "Contracts".*,
      "AdSize"."adType" as "adType",
      "AdSize"."desc" as "desc",
      "AdSize"."columns" as "columns",
      "AdSize"."inches" as "inches",
      "Color"."colorType" as "colorType",
      "Color"."colorPrice" as "colorPrice",
      "Rates"."rateName" as "rateName",
    ARRAY_AGG("Users"."name") as "assignedPeople",
    STRING_AGG("Users"."companyName", ',') as "companyName"
    FROM "Contracts"
    JOIN "AdSize"
      ON "AdSize"."id" = "Contracts"."adSizeId"
    JOIN "Color"
      ON "Color"."id" = "Contracts"."colorId"
    JOIN "Rates"
      ON "Rates"."id" = "Contracts"."pricingSchemaId"
    JOIN "Contracts_Users"
      ON "Contracts_Users"."contractId" = "Contracts"."id"
    JOIN "Users"
      ON "Users"."id" = "Contracts_Users"."userId"
    WHERE "startMonth" <= 'NOW' AND "Contracts"."isApproved" = true AND "startMonth" + interval '1 month' * "months" >= 'NOW'
    GROUP BY "Contracts"."id", "adType", "desc", "columns",
    "inches", "colorType", "colorPrice", "rateName"
  `
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
// IF the logged in user is an employee or admin
router.get('/pending', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT
      "Contracts".*,
      "AdSize"."adType" as "adType",
      "Color"."colorType" as "colorType",
      ARRAY_AGG("Users"."name") as "assignedPeople",
      STRING_AGG("Users"."companyName", ',') as "companyName"
    FROM "Contracts"
    JOIN "AdSize"
      ON "AdSize"."id" = "Contracts"."adSizeId"
    JOIN "Color"
      ON "Color"."id" = "Contracts"."colorId"
    JOIN "Contracts_Users"
      ON "Contracts_Users"."contractId" = "Contracts"."id"
    JOIN "Users"
      ON "Users"."id" = "Contracts_Users"."userId"
    WHERE "isApproved" = false
    GROUP BY "Contracts"."id", "adType", "colorType"
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
  const sqlText = `
    SELECT
      "Contracts".*,
      "AdSize"."adType" as "adType",
      "Color"."colorType" as "colorType",
      ARRAY_AGG("Users"."name") as "assignedPeople",
      STRING_AGG("Users"."companyName", ',') as "companyName"
    FROM "Contracts"
    JOIN "AdSize"
      ON "AdSize"."id" = "Contracts"."adSizeId"
    JOIN "Color"
      ON "Color"."id" = "Contracts"."colorId"
    JOIN "Contracts_Users"
      ON "Contracts_Users"."contractId" = "Contracts"."id"
    JOIN "Users"
      ON "Users"."id" = "Contracts_Users"."userId"
    WHERE "isApproved" = false
    GROUP BY "Contracts"."id", "adType", "colorType"
  `
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
// retrieves all active contracts
router.get('/active', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT
      "Contracts".*,
      "AdSize"."adType" as "adType",
      "Color"."colorType" as "colorType",
      ARRAY_AGG("Users"."name") as "assignedPeople",
      STRING_AGG("Users"."companyName", ',') as "companyName"
    FROM "Contracts"
    JOIN "AdSize"
      ON "AdSize"."id" = "Contracts"."adSizeId"
    JOIN "Color"
      ON "Color"."id" = "Contracts"."colorId"
    JOIN "Contracts_Users"
      ON "Contracts_Users"."contractId" = "Contracts"."id"
    JOIN "Users"
      ON "Users"."id" = "Contracts_Users"."userId"
    WHERE "startMonth" <= 'NOW' AND "Contracts"."isApproved" = true AND "startMonth" + interval '1 month' * "months" >= 'NOW'
    GROUP BY "Contracts"."id", "adType", "colorType"
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
  const sqlText = `
    SELECT
      "Contracts".*,
      "AdSize"."adType" as "adType",
      "Color"."colorType" as "colorType",
      ARRAY_AGG("Users"."name") as "assignedPeople",
      STRING_AGG("Users"."companyName", ',') as "companyName"
    FROM "Contracts"
    JOIN "AdSize"
      ON "AdSize"."id" = "Contracts"."adSizeId"
    JOIN "Color"
      ON "Color"."id" = "Contracts"."colorId"
    JOIN "Contracts_Users"
      ON "Contracts_Users"."contractId" = "Contracts"."id"
    JOIN "Users"
      ON "Users"."id" = "Contracts_Users"."userId"
    WHERE "startMonth" <= 'NOW' AND "Contracts"."isApproved" = true AND "startMonth" + interval '1 month' * "months" >= 'NOW'
    GROUP BY "Contracts"."id", "adType", "colorType"
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
// retrieves all closed contracts
router.get('/closed', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT
      "Contracts".*,
      "AdSize"."adType" as "adType",
      "Color"."colorType" as "colorType",
      ARRAY_AGG("Users"."name") as "assignedPeople",
      STRING_AGG("Users"."companyName", ',') as "companyName"
    FROM "Contracts"
    JOIN "AdSize"
      ON "AdSize"."id" = "Contracts"."adSizeId"
    JOIN "Color"
      ON "Color"."id" = "Contracts"."colorId"
    JOIN "Contracts_Users"
      ON "Contracts_Users"."contractId" = "Contracts"."id"
    JOIN "Users"
      ON "Users"."id" = "Contracts_Users"."userId"
    WHERE "startMonth" <= 'NOW' AND "Contracts"."isApproved" = true AND "startMonth" + interval '1 month' * "months" <= 'NOW'
    GROUP BY "Contracts"."id", "adType", "colorType"
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
  const sqlText = `
    SELECT
      "Contracts".*,
      "AdSize"."adType" as "adType",
      "Color"."colorType" as "colorType",
      ARRAY_AGG("Users"."name") as "assignedPeople",
      STRING_AGG("Users"."companyName", ',') as "companyName"
      FROM "Contracts"
    JOIN "AdSize"
      ON "AdSize"."id" = "Contracts"."adSizeId"
    JOIN "Color"
      ON "Color"."id" = "Contracts"."colorId"
    JOIN "Contracts_Users"
      ON "Contracts_Users"."contractId" = "Contracts"."id"
    JOIN "Users"
      ON "Users"."id" = "Contracts_Users"."userId"
    WHERE "startMonth" <= 'NOW' AND "Contracts"."isApproved" = true AND "startMonth" + interval '1 month' * "months" <= 'NOW'
    GROUP BY "Contracts"."id", "adType", "colorType"
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

// retrieves info about a specific contract for editing
router.get('/edit/:id', rejectUnauthenticated, (req, res) => {
  const sqlText = `
  SELECT
  "Contracts".*,
  to_json("AdSize".*) as "AdSize",
  to_json("Color".*) as "Color",
  --"Users"."companyName" as "companyName",
  --array_agg(to_json("Images".*)) as "image",
  (
  SELECT "companyName"
  FROM "Users"
  JOIN "Contracts_Users"
  ON "Contracts_Users"."userId" = "Users"."id"
  JOIN "Contracts"
  ON "Contracts"."id" = "Contracts_Users"."contractId"
  WHERE "Users"."authLevel" = 'advertiser' AND "Contracts"."id" = $1
  ) as "companyName",
  
  (SELECT
  array_agg(to_json("Images".*)) as "image"
  FROM "Images"
  JOIN "Contracts"
  ON "Contracts"."id" = "Images"."contractId"
  WHERE "Contracts"."id" = $1
  ) as "image",

  (SELECT "name"
  FROM "Users"
  JOIN "Contracts_Users"
  ON "Contracts_Users"."userId" = "Users"."id"
  JOIN "Contracts"
  ON "Contracts"."id" = "Contracts_Users"."contractId"
  WHERE "Users"."authLevel" = 'ad rep' AND "Contracts"."id" = $1) as "adRepName",

  (SELECT "Users"."id"
  FROM "Users"
  JOIN "Contracts_Users"
  ON "Contracts_Users"."userId" = "Users"."id"
  JOIN "Contracts"
  ON "Contracts"."id" = "Contracts_Users"."contractId"
  WHERE "Users"."authLevel" = 'ad rep' AND "Contracts"."id" = $1) as "adRepId",

  (SELECT "Users"."id"
  FROM "Users"
  JOIN "Contracts_Users"
  ON "Contracts_Users"."userId" = "Users"."id"
  JOIN "Contracts"
  ON "Contracts"."id" = "Contracts_Users"."contractId"
  WHERE "Users"."authLevel" = 'advertiser' AND "Contracts"."id" = $1) as "advertiserId",

  (SELECT "name"
  FROM "Users"
  JOIN "Contracts_Users"
  ON "Contracts_Users"."userId" = "Users"."id"
  JOIN "Contracts"
  ON "Contracts"."id" = "Contracts_Users"."contractId"
  WHERE "Users"."authLevel" LIKE '%design%' AND "Contracts"."id" = $1) as "designerName",

  (SELECT "Users"."id"
  FROM "Users"
  JOIN "Contracts_Users"
  ON "Contracts_Users"."userId" = "Users"."id"
  JOIN "Contracts"
  ON "Contracts"."id" = "Contracts_Users"."contractId"
  WHERE "Users"."authLevel" LIKE '%design%' AND "Contracts"."id" = $1) as "designerId"

  FROM "Contracts"
  JOIN "AdSize"
    ON "AdSize"."id" = "Contracts"."adSizeId"
  JOIN "Color"
    ON "Color"."id" = "Contracts"."colorId"
  JOIN "Images"
    ON "Images"."contractId" = "Contracts"."id"
  JOIN "Contracts_Users"
    ON "Contracts_Users"."contractId" = "Contracts"."id"
  JOIN "Users"
    ON "Users"."id" = "Contracts_Users"."userId"
  WHERE "Contracts"."id" = $1
  Group by "Contracts"."id", "AdSize".*, "Color".*;
`;
    
  pool
    .query(sqlText, [req.params.id])
    .then(dbRes => {
      console.log(dbRes.rows);
      res.send(dbRes.rows[0]);
    })
    .catch(error => {
      console.log(`Failed to GET ${req.params.id}'s information for editing: `, error)
    })
})

// for saving changes to an existing contract
router.put('/edit/:id', (req, res) => {
  console.log('req.body is: ', req.body);
  let image = '';
  if (req.body.imageUrl) {
    image = req.body.imageUrl;
  }
  let advertiserId = req.body.advertiserId;
  let designerId = req.body.designerId;
  let adRepId = req.body.adRepId;
  
  delete req.body.imageUrl;
  delete req.body.image;
  delete req.body.id;
  delete req.body.companyName;
  delete req.body.designerName;
  delete req.body.adRepName;
  delete req.body.designerId;
  delete req.body.adRepId;
  delete req.body.advertiserId; 
  delete req.body.AdSize;
  delete req.body.Color;

  properties = strFromObj(req.body, ', ', (element, i) => `"${element}" = $${i + 2}`)

  const sqlText = `
  UPDATE "Contracts"
  SET 
    ${properties}
  WHERE "id" = $1
  `;
  
  const sqlParams = [
    req.params.id,
    ...Object.values(req.body)
  ];

  pool.query(sqlText, sqlParams)
    .then(dbRes => {
      if (image === '') {
        imageQuery = '';
      } else {
        imageQuery = `INSERT INTO "Images" ("imageUrl", "contractId")
        VALUES ($1, $2)
        `;
      }
      

      imageParams = [image, req.params.id];
      pool
        .query(imageQuery, imageParams)
        .then(dbRes => {
          let sqlText = `
          DELETE FROM "Contracts_Users"
          WHERE "contractId" = $1
          `
          let sqlParams = [req.params.id];
          pool  
            .query(sqlText, sqlParams)
            .then(dbRes => {
              const sqlQuery = `INSERT INTO "Contracts_Users" ("contractId", "userId")
                VALUES ($1, $2),
                      ($1, $3),
                      ($1, $4)`;
                const sqlParams = 
                [req.params.id, 
                advertiserId, 
                designerId, 
                adRepId];
                pool
                  .query(sqlQuery, sqlParams)
                  .then(dbRes => {
                    res.sendStatus(200);
                  })
                  .catch(error => {
                    console.error('Failed to update the Contracts_Users table', error);
                  });
            })
            .catch(error => {
              console.log('Failed to clear old users from contracts_users', error);
            })
        })
        .catch(error => {
          console.log('Failed to update the contract with an image relationship: ', error);
          res.sendStatus(500);
        })
    })
    .catch(error => {
      console.error(`Failed to update contract at id: ${req.body.id}`, error);
    });
})

// retrieves the rates from the database
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

 // posts new contracts to a particular advertiser
 router.post('/:advertiserId', rejectUnauthenticated, async (req, res) => {
   console.log('req.body is: ', req.body);
  const imageUrl  = req.body.imageUrl;
  delete req.body.imageUrl;
  delete req.body.image;

  const advertiserId = req.params.advertiserId; // or should we grab it from the body
  delete req.body.advertiserId;

  const designerId = req.body.designerId;
  delete req.body.designerId;

  const adRepId = req.body.adRepId;
  delete req.body.adRepId;
  delete req.body.userId;
  delete req.body.AdSize;
  delete req.body.companyName;
  delete req.body.adRepName;
  delete req.body.designerName;

  properties = strFromObj(req.body, ', ', element => `"${element}"`)
  values = strFromObj(req.body, ', ', (element, i) => `$${i + 1}`)

  const queryText = `INSERT INTO "Contracts" (${properties})
                      VALUES (${values}) 
                      RETURNING id`;
  const sqlParams = Object.values(req.body);

  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const contractsPostResults = await client.query(queryText, sqlParams);
    const contractsContractsUsersResults = await client.query(
      `INSERT INTO "Contracts_Users" ("contractId", "userId")
      VALUES ($1, $2),
             ($1, $3),
             ($1, $4)`,
      [contractsPostResults.rows[0].id, 
      advertiserId, 
      designerId, 
      adRepId]);
    const contractsImageResults = await client.query(
      `INSERT INTO "Images" ("contractId", "imageUrl")
      VALUES ($1, $2)`,
      [contractsPostResults.rows[0].id, 
      imageUrl]);
    await client.query('COMMIT');
    res.sendStatus(200);
  } catch (error) {
    await client.query('ROLLBACK');
    console.log('Error POST /api/contracts: ', error)
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

// delete a specific contract
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
