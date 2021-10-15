const generateCode = require('../modules/registrationCode');
const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const sendEmail = require('../constants/email');
const strFromObj = require('../modules/strFromObj')
const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  // console.log('user is ', req.user.email);
  
  res.send(req.user);
});

router.get('/all', rejectUnauthenticated, (req, res) => {
  if (req.user.authLevel === 'admin' || req.user.authLevel === 'ad rep') {
    const sqlQuery = `SELECT "id", "email","name","authLevel",
                        "contactPreference","acceptAchPayment","companyName",
                        "doNotDisturb","isActive", "advertiserUrl",
                        "address", "primaryName", "primaryTitle",
                        "primaryEmail","primaryDirectPhone","primaryMobilePhone",
                        "secondaryName", "secondaryTitle","secondaryEmail",
                        "secondaryDirectPhone","secondaryMobilePhone", "notes" 
                      FROM "Users"`;
    pool
      .query(sqlQuery)
      .then(dbRes => {
        res.send(dbRes.rows);
      })
      .catch(error => {
        console.log('Failed to retrieve all users: ', error)
      })
  } else {
    res.sendStatus(403)
  }
});

//route to get all companies, but eliminating repeat instances of companies
router.get('/advertisers', rejectUnauthenticated, (req, res) => {
  const sqlQuery = `SELECT 
                      "id",
                      "companyName"
                    FROM "Users"
                    WHERE "companyName" IS NOT NULL AND "isActive" = TRUE
                    ORDER BY "companyName" ASC
                    `;
  pool
    .query(sqlQuery)
    .then(dbRes => {
      res.send(dbRes.rows)
    })
    .catch(error => {
      console.log('Failed to retrieve advertisers', error);
      res.sendStatus(500);
    });
});

//route to get all companies, but eliminating repeat instances of companies
router.get('/adReps', rejectUnauthenticated, (req, res) => {
  const sqlQuery = `SELECT 
                      "id",
                      "name"
                    FROM "Users"
                    WHERE "authLevel" = 'ad rep' AND "isActive" = TRUE
                    ORDER BY "name" ASC
                    `;
  pool
    .query(sqlQuery)
    .then(dbRes => {
      res.send(dbRes.rows)
    })
    .catch(error => {
      console.log('Failed to retrieve ad reps', error);
      res.sendStatus(500);
    });
});

//route to get all companies, but eliminating repeat instances of companies
router.get('/designers', rejectUnauthenticated, (req, res) => {
  const sqlQuery = `SELECT 
                      "id",
                      "name"
                    FROM "Users"
                    WHERE "authLevel" = 'print designer' AND "isActive" = TRUE
                    ORDER BY "name" ASC
                    `;
  pool
    .query(sqlQuery)
    .then(dbRes => {
      res.send(dbRes.rows)
    })
    .catch(error => {
      console.log('Failed to retrieve designers', error);
      res.sendStatus(500);
    });
});

router.get('/edit/:id', rejectUnauthenticated, (req, res) => {
  if (req.user.authLevel === 'admin') {
    const sqlQuery = `SELECT "id", "email","name","authLevel",
                        "contactPreference","acceptAchPayment","companyName",
                        "doNotDisturb","isActive", "advertiserUrl",
                        "address", "primaryName", "primaryTitle",
                        "primaryEmail","primaryDirectPhone","primaryMobilePhone",
                        "secondaryName", "secondaryTitle","secondaryEmail",
                        "secondaryDirectPhone","secondaryMobilePhone", "notes", "inviteCode" 
                      FROM "Users"
                      WHERE "id" = $1`;
    const sqlParams = [req.params.id];
    pool
      .query(sqlQuery, sqlParams)
      .then(dbRes => {
        res.send(dbRes.rows[0])
      })
      .catch(error => {
        console.log(`Failed to retrieve user ${req.user.id}:`, error)
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
})

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', rejectUnauthenticated, (req, res) => {
  if (req.user.authLevel === 'admin') {

    req.body.inviteCode = generateCode(30)
    properties = strFromObj(req.body, ', ', element => `"${element}"`)
    values = strFromObj(req.body, ', ', (element, i) => `$${i + 1}`)

    const queryText = `INSERT INTO "Users" (${properties})
                       VALUES (${values}) 
                       RETURNING id`;
    const sqlParams = Object.values(req.body);
    pool
      .query(queryText, sqlParams)
      .then(() => {
        sendEmail(req.body.email, req.body.inviteCode)
        res.sendStatus(201)
      })
      .catch((err) => {
        console.log('User registration failed: ', err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

// rejectUnauthenticated left off because the user needs to 
// be able to update their password without being logged in
// for updating user passwords
router.put('/set-password/:inviteCode', (req, res) => {
  let sqlQuery = `UPDATE "Users" 
                  SET "password" = $1
                  WHERE "inviteCode" = $2`
  let sqlParams = [encryptLib.encryptPassword(req.body.password), req.params.inviteCode]
  pool
    .query(sqlQuery, sqlParams)
    .then(dbRes => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(`Failed to update user's password: `, error)
      res.sendStatus(500);
    });
});

// for editing user's non-password information.
router.put('/edit/:id', rejectUnauthenticated, (req, res) => {
  if (req.user.authLevel === 'admin') { 
    sqlQuery = `UPDATE "Users" SET "email" = $1, "name" = $2 ,"authLevel" = $3,
                  "contactPreference" = $4,"acceptAchPayment" = $5,"companyName" = $6,
                  "doNotDisturb" = $7, "advertiserUrl" = $8,
                  "address" = $9, "primaryName" = $10, "primaryTitle" = $11,
                  "primaryEmail" = $12,"primaryDirectPhone" = $13,"primaryMobilePhone" = $14,
                  "secondaryName" = $15, "secondaryTitle" = $16,"secondaryEmail" = $17,
                  "secondaryDirectPhone" = $18,"secondaryMobilePhone" = $19, "notes" = $20 
                WHERE "id" = $21`;
    const sqlParams = [
      req.body.email,
      req.body.name,
      req.body.authLevel,
      req.body.contactPreference,
      req.body.acceptAchPayment,
      req.body.companyName,
      req.body.doNotDisturb,
      req.body.advertiserUrl,
      req.body.address,
      req.body.primaryName,
      req.body.primaryTitle,
      req.body.primaryEmail,
      req.body.primaryDirectPhone,
      req.body.primaryMobilePhone,
      req.body.secondaryName,
      req.body.secondaryTitle,
      req.body.secondaryEmail,
      req.body.secondaryDirectPhone,
      req.body.secondaryMobilePhone,
      req.body.notes,
      req.params.id,
    ]  

    pool
      .query(sqlQuery, sqlParams)
      .then(dbRes => {
        res.sendStatus(200);
      })
      .catch(error => {
        console.log(`Failed to update user`, error)
        res.sendStatus(500);
      });
  }
});

router.put('delete/:id', (req, res) => {
  const sqlQuery = `UPDATE "Users"
                    SET "isActive" = FALSE
                    WHERE "id" = $1`;
  const sqlParams = [req.params.id];
  pool
    .query(sqlQuery, sqlParams)
    .then(dbRes => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(`Failed to delete user ${req.params.id}`, error)
      res.sendStatus(500);
    });
})

module.exports = router;
