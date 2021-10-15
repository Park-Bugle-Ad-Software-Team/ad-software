const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
const strFromObj = require('../modules/strFromObj')

router.get('/all', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT
    "Contracts".*,
    "AdSize"."adType" as "adType",
    "Color"."colorType" as "colorType"
    FROM "Contracts"
    JOIN "AdSize"
      ON "AdSize"."id" = "Contracts"."adSizeId"
    JOIN "Color"
      ON "Color"."id" = "Contracts"."colorId"
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
// IF the logged in user is an employee or admin
router.get('/pending', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT
    "Contracts".*,
    "AdSize"."adType" as "adType",
    "Color"."colorType" as "colorType"
    FROM "Contracts"
    JOIN "AdSize"
      ON "AdSize"."id" = "Contracts"."adSizeId"
    JOIN "Color"
      ON "Color"."id" = "Contracts"."colorId"
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
  const sqlText = `
    SELECT
    "Contracts".*,
    "AdSize"."adType" as "adType",
    "Color"."colorType" as "colorType"
    FROM "Contracts"
    JOIN "AdSize"
      ON "AdSize"."id" = "Contracts"."adSizeId"
    JOIN "Color"
      ON "Color"."id" = "Contracts"."colorId"
    JOIN "Contracts_Users"
      ON "Contracts_Users"."contractId" = "Contracts"."id"
    JOIN "Users"
      ON "Users"."id" = "Contracts_Users"."userId"
    WHERE "isApproved" = false AND "Users"."companyName" = '${companyName}'
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

// GET request that happens upon FETCH_ACTIVE_CONTRACTS
router.get('/active', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT
    "Contracts".*,
    "AdSize"."adType" as "adType",
    "Color"."colorType" as "colorType"
    FROM "Contracts"
    JOIN "AdSize"
      ON "AdSize"."id" = "Contracts"."adSizeId"
    JOIN "Color"
      ON "Color"."id" = "Contracts"."colorId"
    WHERE "startMonth" <= 'NOW'
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
    "Color"."colorType" as "colorType"
    FROM "Contracts"
    JOIN "AdSize"
      ON "AdSize"."id" = "Contracts"."adSizeId"
    JOIN "Color"
      ON "Color"."id" = "Contracts"."colorId"
    JOIN "Contracts_Users"
      ON "Contracts_Users"."contractId" = "Contracts"."id"
    JOIN "Users"
      ON "Users"."id" = "Contracts_Users"."userId"
    WHERE "startMonth" <= 'NOW' AND "Users"."companyName" = '${companyName}'
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
router.get('/closed', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT
    "Contracts".*,
    "AdSize"."adType" as "adType",
    "Color"."colorType" as "colorType"
    FROM "Contracts"
    JOIN "AdSize"
      ON "AdSize"."id" = "Contracts"."adSizeId"
    JOIN "Color"
      ON "Color"."id" = "Contracts"."colorId"
    WHERE "startMonth" <= 'NOW'
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
    "Color"."colorType" as "colorType"
    FROM "Contracts"
    JOIN "AdSize"
      ON "AdSize"."id" = "Contracts"."adSizeId"
    JOIN "Color"
      ON "Color"."id" = "Contracts"."colorId"
      JOIN "Contracts_Users"
        ON "Contracts_Users"."contractId" = "Contracts"."id"
      JOIN "Users"
        ON "Users"."id" = "Contracts_Users"."userId"
    WHERE "startMonth" >= 'NOW' AND "Users"."companyName" = '${companyName}'
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

router.get('/edit/:id', rejectUnauthenticated, (req, res) => {
  // removing chat from this pull for testing
  const sqlText = `
    SELECT
    "Contracts".*,
    to_json("AdSize".*) as "AdSize",
    to_json("Color".*) as "Color",
     array_agg(to_json("Images".*)) as "image"
    --to_json("Chat".*) as "Chat"
  
  FROM "Contracts"
    JOIN "AdSize"
      ON "AdSize"."id" = "Contracts"."adSizeId"
    JOIN "Color"
      ON "Color"."id" = "Contracts"."colorId"
    JOIN "Images"
      ON "Images"."contractId" = "Contracts"."id"
    WHERE "Contracts"."id" = $1
  Group by "Contracts"."id", "AdSize".*, "Color".*;
    `;
  pool
    .query(sqlText, [req.params.id])
    .then(dbRes => {
      console.log('object to be edited: ', dbRes.rows[0]);
      res.send(dbRes.rows[0]);
    })
    .catch(error => {
      console.log(`Failed to GET ${req.params.id}'s information for editing: `, error)
    })
})

router.put('/edit/:id', (req, res) => {
  console.log('req.body is: ', req.body);
  let image = req.body.imageUrl
  delete req.body.imageUrl
  delete req.body.image
  delete req.body.id;
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
 router.post('/:advertiserId', rejectUnauthenticated, (req, res) => {
  const imageUrl  = req.body.imageUrl;
  delete req.body.userId;
  delete req.body.imageUrl;
  delete req.body.AdSize;
 
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
      console.log('New contract creation failed: ', err);
      res.sendStatus(500);
    });
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