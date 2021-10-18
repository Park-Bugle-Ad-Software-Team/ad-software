const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
const strFromObj = require('../modules/strFromObj')

router.get('/all', rejectUnauthenticated, (req, res) => {
  // const sqlText = `
  //   SELECT
  //     "Contracts".*,
  //     "AdSize"."adType" as "adType",
  //     "AdSize"."desc" as "desc",
  //     "AdSize"."columns" as "columns",
  //     "AdSize"."inches" as "inches",
  //     "Color"."colorType" as "colorType",
  //     "Color"."colorPrice" as "colorPrice",
  //     "Rates"."rateName" as "rateName",
  //     "Users"."name" as "name",
  //     "Users"."email" as "email",
  //     "Users"."contactPreference" as "contactPreference",
  //     "Users"."companyName" as "companyName"
  //   FROM "Contracts"
  //   JOIN "AdSize"
  //     ON "AdSize"."id" = "Contracts"."adSizeId"
  //   JOIN "Color"
  //     ON "Color"."id" = "Contracts"."colorId"
  //   JOIN "Rates"
  //     ON "Rates"."id" = "Contracts"."pricingSchemaId"
  //   JOIN "Contracts_Users"
  //     ON "Contracts_Users"."contractId" = "Contracts"."id"
  //   JOIN "Users"
  //     ON "Users"."id" = "Contracts_Users"."userId"
  //   WHERE 
  //   GROUP BY "Contracts"."id", "adType", "desc", "columns",
  //     "inches", "colorType", "colorPrice", "rateName", "name",
  //     "email", "contactPreference", "companyName"
  //   ORDER BY "startMonth" ASC
  // `;
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
  const companyName = req.query.companyName;
  // const sqlText = `
  //   SELECT
  //   "Contracts".*,
  //   "AdSize"."adType" as "adType",
  //   "Color"."colorType" as "colorType",
  //   "Users"."companyName" as "companyName"
  //   FROM "Contracts"
  //   JOIN "AdSize"
  //     ON "AdSize"."id" = "Contracts"."adSizeId"
  //   JOIN "Color"
  //     ON "Color"."id" = "Contracts"."colorId"
  //   JOIN "Contracts_Users"
  //     ON "Contracts_Users"."contractId" = "Contracts"."id"
  //   JOIN "Users"
  //     ON "Users"."id" = "Contracts_Users"."userId"
  //   WHERE "isApproved" = false AND "Users"."companyName" = '${companyName}'
  //   GROUP BY "Contracts"."id", "adType", "colorType", "companyName"
  // `;
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
router.get('/active', rejectUnauthenticated, (req, res) => {
  // let userId = req.user.id;
  /*
    active contracts are those that have been approved
    AND
    the current date(i.e. today, right now. this second(this location))
      is between startMonth and startMonth + months(or length of the contract)
    -find out how the values, current, start, and start+length are stored
    - find out how to get them all into the same format
    - do the comparison start < current < start+length
    - startmonth is a sql "date" type
    - current - how get?
    - how do math w/ sql date types?
  */

  // const sqlText = `
  // SELECT
  //   "Contracts".*,
  //   "AdSize"."adType" as "adType",
  //   "Color"."colorType" as "colorType",
  //   "Users"."companyName" as "companyName"
  // FROM "Contracts"
  // JOIN "AdSize"
  // ON "AdSize"."id" = "Contracts"."adSizeId"
  // JOIN "Color"
  // ON "Color"."id" = "Contracts"."colorId"
  // JOIN "Contracts_Users"
  // ON "Contracts_Users"."contractId" = "Contracts"."id"
  // JOIN "Users"
  // ON "Users"."id" = "Contracts_Users"."userId"
  // WHERE "startMonth" <= 'NOW' AND "Contracts"."isApproved" = true AND "startMonth" + interval '1 month' * "months" >= 'NOW' AND "Users"."authLevel" = 'advertiser'
  // GROUP BY "Contracts"."id", "adType", "colorType", "companyName"
  // `; // add "Contracts_Users"."userId" to WHERE
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
  const companyName = req.query.companyName;
  const sqlText = `
    SELECT
    "Contracts".*,
    "AdSize"."adType" as "adType",
    "Color"."colorType" as "colorType",
    "Users"."companyName" as "companyName"
    FROM "Contracts"
    JOIN "AdSize"
      ON "AdSize"."id" = "Contracts"."adSizeId"
    JOIN "Color"
      ON "Color"."id" = "Contracts"."colorId"
    JOIN "Contracts_Users"
      ON "Contracts_Users"."contractId" = "Contracts"."id"
    JOIN "Users"
      ON "Users"."id" = "Contracts_Users"."userId"
    WHERE "startMonth" <= 'NOW' AND "Contracts"."isApproved" = true AND "Users"."companyName" = '${companyName}' AND "Users"."authLevel" = 'advertiser'
    GROUP BY "Contracts"."id", "adType", "colorType", "companyName"
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
  // let userId = req.user.id;
  // const sqlText = `
  //   SELECT
  //   "Contracts".*,
  //   "AdSize"."adType" as "adType",
  //   "Color"."colorType" as "colorType",
  //   "Users"."companyName" as "companyName"
  //   FROM "Contracts"
  //   JOIN "AdSize"
  //     ON "AdSize"."id" = "Contracts"."adSizeId"
  //   JOIN "Color"
  //     ON "Color"."id" = "Contracts"."colorId"
  //   JOIN "Contracts_Users"
  //     ON "Contracts_Users"."contractId" = "Contracts"."id"
  //   JOIN "Users"
  //     ON "Users"."id" = "Contracts_Users"."userId"
  //   WHERE "startMonth" <= 'NOW' AND "Contracts"."isApproved" = true AND "startMonth" + interval '1 month' * "months" <= 'NOW'
  //   GROUP BY "Contracts"."id", "adType", "colorType", "companyName"
  // `; // add "Contracts_Users"."userId" to WHERE
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
  const companyName = req.query.companyName;
  const sqlText = `
    SELECT
    "Contracts".*,
    "AdSize"."adType" as "adType",
    "Color"."colorType" as "colorType",
    "Users"."companyName" as "companyName"
    FROM "Contracts"
    JOIN "AdSize"
      ON "AdSize"."id" = "Contracts"."adSizeId"
    JOIN "Color"
      ON "Color"."id" = "Contracts"."colorId"
      JOIN "Contracts_Users"
        ON "Contracts_Users"."contractId" = "Contracts"."id"
      JOIN "Users"
        ON "Users"."id" = "Contracts_Users"."userId"
    WHERE "startMonth" >= 'NOW' AND "Users"."companyName" = '${companyName}' AND "Users"."authLevel" = 'advertiser'
    GROUP BY "Contracts"."id", "adType", "colorType", "companyName"
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
  console.log('req.params', req.params.id);
  // const sqlText = `
  //   SELECT
  //   "Contracts".*,
  //   to_json("AdSize".*) as "AdSize",
  //   to_json("Color".*) as "Color",
  //   "Users"."companyName" as "companyName",
  //   array_agg(to_json("Images".*)) as "image"
  //   --to_json("Chat".*) as "Chat"
  
  // FROM "Contracts"
  //   JOIN "AdSize"
  //     ON "AdSize"."id" = "Contracts"."adSizeId"
  //   JOIN "Color"
  //     ON "Color"."id" = "Contracts"."colorId"
  //   JOIN "Images"
  //     ON "Images"."contractId" = "Contracts"."id"
  //   JOIN "Contracts_Users"
  //     ON "Contracts_Users"."contractId" = "Contracts"."id"
  //   JOIN "Users"
  //     ON "Users"."id" = "Contracts_Users"."userId"
  //   WHERE "Contracts"."id" = $1
  // Group by "Contracts"."id", "AdSize".*, "Color".*, "companyName";
  //   `;
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

  (SELECT "name"
  FROM "Users"
  JOIN "Contracts_Users"
  ON "Contracts_Users"."userId" = "Users"."id"
  JOIN "Contracts"
  ON "Contracts"."id" = "Contracts_Users"."contractId"
  WHERE "Users"."authLevel" LIKE '%design%' AND "Contracts"."id" = $1) as "designerName"

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

router.put('/edit/:id', (req, res) => {
  console.log('req.body is: ', req.body);
  let image = req.body.imageUrl;
  
  delete req.body.imageUrl;
  delete req.body.image;
  delete req.body.id;
  delete req.body.companyName;
  delete req.body.designerName;
  delete req.body.adRepName;
  delete req.body.designerId;
  delete req.body.adRepId;
  // const adRepId = req.body.adRepId
  // delete req.body.adRepId
  delete req.body.AdSize;
  delete req.body.Color;

  properties = strFromObj(req.body, ', ', (element, i) => `"${element}" = $${i + 2}`)

  // console.log('req.body is: ', req.body)
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
      // res.sendStatus(200);
      imageQuery = `INSERT INTO "Images" ("imageUrl", "contractId")
                    VALUES ($1, $2)
                    `;

      imageParams = [image, req.params.id];
      pool
        .query(imageQuery, imageParams)
        .then(dbRes => {
          res.sendStatus(200);
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

  // let tempObject = {
  //   ...req.body,
  //   imageUrl,
  //   advertiserId,
  //   designerId,
  //   adRepId
  // }
  console.log('req.body after deletes', req.body);
  // properties = strFromObj(req.body, ', ', element => `"${element}"`)
  // values = strFromObj(req.body, ', ', (element, i) => `$${i + 1}`)
  properties = strFromObj(req.body, ', ', element => `"${element}"`)
  values = strFromObj(req.body, ', ', (element, i) => `$${i + 1}`)

  console.log('properties', properties);
  console.log('values', values);

  const queryText = `INSERT INTO "Contracts" (${properties})
                      VALUES (${values}) 
                      RETURNING id`;
  const sqlParams = Object.values(req.body);

  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    // all of the relevant queries listed here
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


  // pool
  //   .query(queryText, sqlParams)
  //   .then((dbRes) => {
  //     // res.sendStatus(201)
  //     // also need to insert:
  //       const contractsUsersQuery = `INSERT INTO "Contracts_Users" ("contractId", "userId")
  //                         VALUES ($1, $2)`;
  //       // users_contracts - which use
  //       const contractsUsersParams = [dbRes.rows[0].id, req.params.advertiserId]
  //       pool
  //         .query(contractsUsersQuery, contractsUsersParams)
  //         .then(innerDbResponse => {
  //           const imagesQuery = `INSERT INTO "Images" ("contractId", "imageUrl")
  //                                VALUES ($1, $2)`;
  //           const imagesParams = [dbRes.rows[0].id, imageUrl];
  //           pool
  //             .query(imagesQuery, imagesParams)
  //             .then(() => {
  //               res.sendStatus(200)
  //             })
  //             .catch(error => {
  //               console.log('Failed to POST to "Images" while posting a new contract: ', error)
  //               res.sendStatus(500);
  //             })
  //         })
  //         .catch(error => {
  //           console.log('Failed to POST to contracts_user while posting new contract: ', error);
  //           res.sendStatus(500);
  //         })
  //   })
  //   .catch((err) => {
  //     console.log('New contract creation failed: ', err);
  //     res.sendStatus(500);
  //   });
});


/*
router.delete('/:id', rejectUnauthenticated, async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        // delete the info from the playersRankings table
        const playersRankingsDeleteResults = await client.query(`
                DELETE FROM "playersRankings"
                WHERE "player_id" = $1
            `, [req.params.id]
        );
        // then delete info from the playersTags table
        const playersTagsDeleteResults = await client.query(`
                DELETE FROM "playersTags"
                WHERE "player_id" = $1
            `, [req.params.id]
        );
        // then delete info from the players table
        const playersDeleteResults = await client.query(`
                DELETE FROM "players"
                WHERE "id" = $1
            `, [req.params.id]
        );
        await client.query('COMMIT');
        res.sendStatus(200);
    } catch (error) {
        await client.query('ROLLBACK');
        console.log('Error DELETE /api/player', error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
});




*/




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