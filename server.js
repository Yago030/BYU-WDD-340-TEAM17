/* ******************************************
* This server.js file is the primary file of the
* application. It is used to control the project.
*******************************************/
/* ***********************
* Require Statements
*************************/
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const env = require("dotenv").config();
const app = express();
const static = require("./routes/static");
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute")
const accountRoute = require("./routes/accountRoute")

const utilities = require("./utilities/")
const session = require("express-session")
const pool = require('./database/')
const cookieParser = require("cookie-parser")

/* ***********************
* View Engine and Templates
*************************/

/* ***********************
 * Middleware
 * ************************/
 app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))
app.use(cookieParser())


// Express Messages Middleware
app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})

app.use(express.json())                       
app.use(express.urlencoded({ extended: true }))
app.use(utilities.checkJWTToken)


app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");




/* ***********************
* Routes
*************************/
app.use(express.static("public"))
app.use(static);
app.use("/inv", inventoryRoute)
app.use("/account", accountRoute)



// app.use("/", (req, res) => {
// res.render("index", { title: "Home" });
// });
app.get("/", utilities.handleErrors(baseController.buildHome))



app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)

  let message
  let img

  if (err.status == 404) {
    message = "Sorry, we appear to have lost that page."
    img = "/images/site/404error.gif"
  } 
  else {
    message = "Yikes! Something went wrong on the server. Please try again or come back later."
    img = "/images/site/500error.gif"
  }

  res.render("errors/error", {
    title: err.status || "Server Error",
    message,
    nav,
    img
  })
})





/* ***********************
* Local Server Information
* Values from .env (environment) file
*************************/
const port = process.env.PORT;
const host = process.env.HOST;

/* ***********************
* Log statement to confirm server operation
*************************/
app.listen(port, () => {
console.log(`app listening on ${host}:${port}`);
});
