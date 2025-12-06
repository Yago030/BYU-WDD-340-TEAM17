const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const { validateClassification, validateInventory } = require("../utilities/validation")

router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildByInvId))

router.get("/error", utilities.handleErrors(invController.triggerError))

router.get("/", invController.buildManagementView)

router.get(
  "/add-classification",
  utilities.handleErrors(invController.buildAddClassification)
)

router.post(
  "/add-classification",
  validateClassification,
  utilities.handleErrors(invController.addClassification)
)

router.get(
  "/add-inventory",
  utilities.handleErrors(invController.buildAddInventory)
)

router.post(
  "/add-inventory",
  validateInventory,
  utilities.handleErrors(invController.addInventory)
)

module.exports = router
