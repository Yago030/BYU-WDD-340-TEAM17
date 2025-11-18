const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory item detail view Ccars
 *************************** */
invCont.buildByInvId = async function (req, res, next) {
  const inv_id = req.params.inv_id
  const vehicleData = await invModel.getVehicleById(inv_id)
  const nav = await utilities.getNav()
  const detail = await utilities.buildVehicleDetail(vehicleData)

  const itemName = `${vehicleData.inv_make} ${vehicleData.inv_model}`

  res.render("inventory/detail", {
    title: itemName,
    nav,
    detail
  })
}


/* ***************************
 *  Trigger intentional 500 error demo !! 
 *************************** */
invCont.triggerError = async function (req, res, next) {
  throw new Error("Intentional server crash for testing purposes")
}

  module.exports = invCont
