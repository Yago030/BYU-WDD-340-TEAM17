const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const regValidate = require("../utilities/account-validation")
const utilities = require("../utilities/")

router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement))
router.get("/login", utilities.handleErrors(accountController.buildLogin))
router.get("/register", utilities.handleErrors(accountController.buildRegister))



router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)


router.get("/logout", utilities.handleErrors(accountController.accountLogout))

module.exports = router

