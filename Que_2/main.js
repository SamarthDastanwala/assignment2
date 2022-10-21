const express = require('express');
const app = express();
var session = require('express-session');
var FileStore = require('session-file-store')(session);
const port = 3000;

app.use(session({ secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new FileStore,
    cookie: { maxAge: 3600000,secure: false, httpOnly: true }
  })
);

// let correct_username = "samarth_28";
// let correct_password = "12345";

let username;
let password;

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use((req, res, next) => {
    req.session.username = "samarth_28";
    req.session.password = "12345"
    username = req.body.username;
    password = req.body.password;
    if(username === req.session.username && password === req.session.password)
    {
        next();
    }
    else
    {
        res.send("Invalid Username or Password Try Again...");
    }
});

app.post('/validate', (req, res) => {
    res.send("Welcome " + username + " is Login Successfully.");
    res.end();
});

app.listen(port, () => {
    console.log("The App is listening on the port number -> " + port);
});