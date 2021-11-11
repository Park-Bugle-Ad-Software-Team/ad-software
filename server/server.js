require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const aws = require('aws-sdk');
const upload = multer({ 
  storage: multer.memoryStorage()
 })

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const chatRouter = require('./routes/chat.router');
const contractsRouter = require('./routes/contracts.router');
const ratesRouter = require('./routes/rates.router');
const adSizeRouter = require('./routes/adSize.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/contracts', contractsRouter);
app.use('/api/rates', ratesRouter);
app.use('/api/ad-size', adSizeRouter)

// Serve static files
app.use(express.static('build'));


// File upload
const s3 = new aws.S3();
app.post('/api/file', upload.single('file'), async(req, res) => {
  try {
    const s3Res = await s3.upload({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `${Date.now()}-${req.file.originalname}`,
      Body: req.file.buffer,
      ACL: 'public-read',
    }).promise();

    res.send({
      location: s3Res.Location
    });
  }
  catch (err) {
    console.error('Upload failed', err);
    res.sendStatus(500);
  }
})

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
