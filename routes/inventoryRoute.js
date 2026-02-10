const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const invValidate = require("../utilities/validation")

router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildByInvId))

router.get("/error", utilities.handleErrors(invController.triggerError))

router.get("/edit/:inv_id", utilities.checkAdminOrEmployee, utilities.handleErrors(invController.editInventoryView))

router.post(
  "/update/",
  utilities.checkAdminOrEmployee,
  invValidate.newInventoryRules(),
  invValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
)

router.get("/", utilities.checkAdminOrEmployee, utilities.handleErrors(invController.buildManagementView))

router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))


router.get(
  "/add-classification",
  utilities.checkAdminOrEmployee,
  utilities.handleErrors(invController.buildAddClassification)
)

router.post(
  "/add-classification",
  utilities.checkAdminOrEmployee,
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

router.get(
  "/add-inventory",
  utilities.checkAdminOrEmployee,
  utilities.handleErrors(invController.buildAddInventory)
)

router.post(
  "/add-inventory",
  utilities.checkAdminOrEmployee,
  invValidate.newInventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)



module.exports = router
