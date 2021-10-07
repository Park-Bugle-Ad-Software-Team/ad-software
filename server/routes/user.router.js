const generateToken = require('../modules/registrationToken');
const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
let {transporter, mailOptions, emailErrorCatcher} = require ('../constants/email');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  // console.log('user is ', req.user.email);
  
  res.send(req.user);
});

router.get('/all', rejectUnauthenticated, (req, res) => {
  if (req.user.authLevel === 'admin') {
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
})

router.get('/edit/:id', rejectUnauthenticated, (req, res) => {
  console.log('req.body in edit router is', req.body);
  if (req.user.authLevel === 'admin') {
    const sqlQuery = `SELECT "id", "email","name","authLevel",
                        "contactPreference","acceptAchPayment","companyName",
                        "doNotDisturb","isActive", "advertiserUrl",
                        "address", "primaryName", "primaryTitle",
                        "primaryEmail","primaryDirectPhone","primaryMobilePhone",
                        "secondaryName", "secondaryTitle","secondaryEmail",
                        "secondaryDirectPhone","secondaryMobilePhone", "notes" 
                      FROM "Users"
                      WHERE "id" = $1`;
    const sqlParams = [req.params.id];
    pool
      .query(sqlQuery, sqlParams)
      .then(dbRes => {
        res.send(dbRes.rows[0])
      })
      .catch(error => {
        console.log(`Failed to retrieve user ${req.user.id}: `, error)
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
  console.log('req.body is: ', req.body);
  // unpack the object in order
  const properties = `"name", "email", "authLevel", 
                        "contactPreference", "acceptAchPayment", "companyName",
                        "doNotDisturb", "advertiserUrl", "address",
                        "primaryName", "primaryTitle", "primaryEmail", 
                        "primaryDirectPhone", "primaryMobilePhone", "secondaryName", 
                        "secondaryTitle", "secondaryEmail", "secondaryDirectPhone", 
                        "secondaryMobilePhone", "notes", "inviteCode"`;
  const inviteToken = generateToken(30);
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
    inviteToken // reg token to be sent in the invitation email.
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
    .then(() => {
      // send email off here
      mailOptions.to = req.body.email;
      mailOptions.text += inviteToken;
      transporter.sendMail(mailOptions, emailErrorCatcher)
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
router.put('/edit/:inviteToken', (req, res) => {
  // need help on this one - wouldn't we want the route 
  // to be something like /api/user/edit/:id for editing a specific user?
  // and the route /api/user/edit/inviteToken (or even drop the /edit/ part)
  // for the first login when they set their password?
  // or should we just include the user's id in the body of the put request?

  // allow edit only if user is admin or the ad person themselves
  const sqlQuery = ``;
  const sqlParams = []
  if (inviteToken) {
    // check if it's in the db - if it is, let them update
    sqlQuery = `SELECT * FROM "Users"
                WHERE "inviteCode" = $1`;
    sqlParams = [req.params.inviteToken];
    pool
      .query(sqlQuery, sqlParams)
      .then(dbRes => {
        if (dbRes.rowCount) {
          sqlQuery = `INSERT INTO "Users" ("password")
                      VALUES $1
                      WHERE "id" = $2`
          sqlParams = [encryptLib.encryptPassword(req.body.password), dbRes.rows[0].id]
          pool
            .query(sqlQuery, sqlParams)
            .then(dbRes => {
              res.sendStatus(200);
            })
            .catch(error => {
              console.log(`Failed to update user ${dbRes.rows[0].id}'s password: `, error)
              res.sendStatus(500);
            });
        }
      })
      .catch(error => {
        console.log('Error while checking if inviteToken is valid: ', error);
        res.sendStatus(500);
      });
    // if not, deny them
  } else if (req.user.authLevel === 'admin') {
    // should admin be able to update user's passwords, too?
    // I feel like we should also be checking a user's isActive value at some point
    // I forget what isActive's purpose was. 

    // need to be able to update arbitrary fields...
    const properties = `"name", "email", "authLevel", 
    "contactPreference", "acceptAchPayment", "companyName",
    "doNotDisturb", "advertiserUrl", "address",
    "primaryName", "primaryTitle", "primaryEmail", 
    "primaryDirectPhone", "primaryMobilePhone", "secondaryName", 
    "secondaryTitle", "secondaryEmail", "secondaryDirectPhone", 
    "secondaryMobilePhone", "notes"`;
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
    req.body.id
    ]
    const queryText = `UPDATE "Users" (${properties})
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 
    $9, $10, $11, $12, $13, $14, $15, $16,
    $17, $18, $19, $20)
    WHERE id = $21`;
    pool
    .query(queryText, sqlParams)
    .then(dbRes => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(`Failed while updating user ${req.body.id}'s information: `, error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }
})

router.delete('/:id', (req, res) => {
  const sqlQuery = `DELETE FROM "Users"
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
