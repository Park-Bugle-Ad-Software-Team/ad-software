const generateToken = require('../modules/registrationToken');
const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  // console.log('user is ', req.user.email);
  
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', rejectUnauthenticated, (req, res) => {
  if (req.user.authLevel === 'admin') {
  console.log('req.body is: ', req.body);
  // unpack the object in order
  const properties = `"name", "email", "authLevel", 
                        "contactPreference", "acceptAchPayment", "companyName",
                        "doNotDisturb", "advertiserUrl", "address",
                        "primaryName", "primaryTitle", "primaryEmail", 
                        "primaryDirectPhone", "primaryMobilePhone", "secondaryName", 
                        "secondaryTitle", "secondaryEmail", "secondaryDirectPhone", 
                        "secondaryMobilePhone", "notes", "inviteCode"`;
  const sqlParams = [
    req.body.name,
    req.body.email,
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
    req.body.primeMobilePhone,
    req.body.secondaryName,
    req.body.secondaryTitle,
    req.body.secondaryEmail,
    req.body.secondaryDirectPhone,
    req.body.secondaryMobilePhone,
    req.body.notes,
    generateToken(30) // reg token to be sent in the invitation email.
  ]

  // const propertiesArray = properties.split(', ');
  // let sqlParams = []
  // let i = 1;
  // injectionPlaceHolders = '';
  // for (let property of properties.split(', ')) {
  //   console.log('property', req.body[property]);
    
  //   sqlParams.push(req.body[property]);
  //   if (i >= properties.split(', ').length) {
  //     injectionPlaceHolders += `$${i + 1}`
  //   } else {
  //     injectionPlaceHolders += `$${i}, `
  //   }
  //   i++;
  // }
  // for (let i = 0; i < propertiesArray.length; i++) {
  //   // sqlParams.push(req.body[propertiesArray[i]]);
  //   if (i < propertiesArray.length) {
  //     injectionPlaceHolders += `$${i + 1}, `
  //   } else {
  //     injectionPlaceHolders += `$${i + 1}`
  //   }
  // }

  // const password = encryptLib.encryptPassword(req.body.password);
  // let injectionPlaceHolders = ``;
  // for (let i = 1; i < properties.split(', ').length + 1; i++) {
  //   if (i === 21) {
  //     injection += `$${i}`
  //   } else {
  //     injection += `$${i}, `
  //   }
  // }
  const queryText = `INSERT INTO "Users" (${properties})
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 
                    $9, $10, $11, $12, $13, $14, $15, $16,
                    $17, $18, $19, $20, $21) RETURNING id`;

  // console.log('query text is: ', queryText);
  // console.log('sqlParams is: ', sqlParams);
  pool
    .query(queryText, sqlParams)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }
});


router.put('/edit', rejectUnauthenticated, (req, res) => {
  // allow edit only if user is admin or the ad person themselves
  // edit happens on two conditions:
    // 1. Admin edits user's fields
    // 2. User logs in for the first time - they edit the password field - therefore they use the 

  const sqlQuery = ``
})

router.get('/all', rejectUnauthenticated, (req, res) => {
  if (req.user.authLevel === 'admin') {
  const sqlQuery = `SELECT "email","name","authLevel",
                      "contactPreference","acceptAchPayment","companyName",
                      "doNotDisturb","isActive", "advertiserUrl",
                      "address", "primaryName", "primaryTitle",
                      "primaryEmail","primaryDirectPhone","primaryMobilePhone",
                      "secondaryName", "secondaryTitle","secondaryEmail",
                      "secondaryDirectPhone","secondaryMobilePhone", "notes" 
                    FROM "Users"`;
  pool.query(sqlQuery).then(dbRes => {
    res.send(dbRes.rows);
  }).catch(error => {
    console.log('Failed to retrieve all users: ', error)
  })
  } else {
    res.sendStatus(403)
  }
})

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

router.delete('/:id', (req, res) => {
  const sqlQuery = `DELETE FROM "Users"
                    WHERE "id" = $1`;
  const sqlParams = [req.params.id];
  pool.query(sqlQuery, sqlParams).then(dbRes => {
    res.sendStatus(200);
  }).catch(error => {
    console.log(`Failed to delete user ${req.params.id}`, error)
    res.sendStatus(500);
  });
})

router.get('/:id', rejectUnauthenticated, (req, res) => {
  if (req.user.id === 'admin') {
    const sqlQuery = `SELECT "email","name","authLevel",
                        "contactPreference","acceptAchPayment","companyName",
                        "doNotDisturb","isActive", "advertiserUrl",
                        "address", "primaryName", "primaryTitle",
                        "primaryEmail","primaryDirectPhone","primaryMobilePhone",
                        "secondaryName", "secondaryTitle","secondaryEmail",
                        "secondaryDirectPhone","secondaryMobilePhone", "notes" 
                      FROM "Users"
                      WHERE "id" = $1`;
    const sqlParams = [req.params.id];
    pool.query(sqlQuery, sqlParams).then(dbRes => {
      res.send(dbRes.rows[0])
    }).catch(error => {
      console.log(`Failed to retrieve user ${req.user.id}: `, error)
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }


})

module.exports = router;
