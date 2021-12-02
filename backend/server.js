const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
// add router in express app
app.use("/",router);

//
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { pool } = require("./dbConfig.js");
const bcrypt = require("bcrypt");
//

// create application/json parser
const jsonParser = bodyParser.json()


router.post('/users/register', jsonParser, async (req, res) => {

    let { nickname, email, password, password2 } = req.body;

    //TODO: validation password - password2

  //encrypt pass
  hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of rounds for the hash

  // check if the email already exists in our db
  pool.query(
      `SELECT * FROM users
          WHERE email = $1`,
      [email],
      (err, results) => {
          if (err) {
              console.log(err);
          }
          // if results.rows.length > 0  -----> account already exists
          if (results.rows.length > 0) {
              res.send({ emailExists: true })
          } else {
              // if the e-mail does not already exist in the db, we can add a new user to the db
              pool.query(
                  `INSERT INTO users (name, email, password)
                  VALUES ($1, $2, $3)
                  RETURNING id, name, email,  password`,
                  [nickname, email, hashedPassword], // these are the values $1 $2 $3, we give them names
                  (err, results) => {
                      if (err) {
                          throw err;
                      }
                  }
              );
          }
      }
  );


});

// handle POST from LOGIN page
app.post("/users/login", jsonParser,  async (req, res) => {

  let { email, password } = req.body;

  pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email],
    (err, results) => {
        // if the e-mail exists in the DB, the user exist -> go further
        if (results.rows.length > 0) {
            const user = results.rows[0];

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (isMatch) {
                    // password matches with the decrypted password in db
                    res.send({ passwordIsCorrect: true, username: user.name })
                }
                else {
                    // password does not match with the one in db
                    // TODO: handle validation
                    res.send({ passwordIsCorrect: false })
                }
            });
        }
        else {
            //if the email does not exist
            console.log("EMAIL DOES NOT EXIST in DB");
            // TODO: validation
        }
    }
);

  
});

// chat messages - Websockets communication
io.on('connection', socket => {
    socket.on('message', ({ name, message }) => {
      io.emit('message', { name, message })
    })
  })

app.listen(3001,() => {
console.log("Started on PORT 3001");
})



















/*const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { pool } = require("./dbConfig.js");
const bcrypt = require("bcrypt");

// chat messages - Websockets communication
io.on('connection', socket => {
  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message })
  })
})

// Middleware
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// register && login
app.post('/users/register', async (req, res) => {

  let { nickname, email, password, password2 } = req.body;

  //TODO: validation password - password2

  //encrypt pass
  hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of rounds for the hash

  // check if the email already exists in our db
  pool.query(
      `SELECT * FROM users
          WHERE email = $1`,
      [email],
      (err, results) => {
          if (err) {
              console.log(err);
          }
          // if results.rows.length > 0  -----> account already exists
          if (results.rows.length > 0) {
              res.send({ emailExists: true })
          } else {
              // if the e-mail does not already exist in the db, we can add a new user to the db
              pool.query(
                  `INSERT INTO users (name, email, password)
                  VALUES ($1, $2, $3)
                  RETURNING id, name, email,  password`,
                  [nickname, email, hashedPassword], // these are the values $1 $2 $3, we give them names
                  (err, results) => {
                      if (err) {
                          throw err;
                      }
                  }
              );
          }
      }
  );


});

// handle POST from LOGIN page
app.post("/users/login", async (req, res) => {

  let { name, email, password } = req.body;

  pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (err, results) => {
          // if the e-mail exists in the DB, the user exist -> go further
          if (results.rows.length > 0) {
              const user = results.rows[0];

              bcrypt.compare(password, user.password, (err, isMatch) => {
                  if (isMatch) {
                      // password matches with the decrypted password in db
                      res.send({ passwordIsCorrect: true, username: user.name })
                  }
                  else {
                      // password does not match with the one in db
                      // TODO: handle validation
                      res.send({ passwordIsCorrect: false })
                  }
              });
          }
          else {
              //if the email does not exist
              console.log("EMAIL DOES NOT EXIST in DB");
              // TODO: validation
          }
      }
  );
});

http.listen(3001, function() {
  console.log('listening on port 3001')
})

{ 
    "nickname": "user1", 
    "email": "user1@ffhs.ch", 
    "password": "123456", 
    "password2": "123456" 
}

*/