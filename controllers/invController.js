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

invCont.buildAddClassification = async function (req, res, next) {
  console.log("Función buildAddClassification llamada!")
  try {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: null
    })
  } catch (error) {
    next(error)
  }
}

invCont.addClassification = async function (req, res, next) {
  try {
    const { classification_name } = req.body

    const result = await invModel.addClassification(classification_name)

    if (result) {
      req.flash("notice", "Classification added successfully.")

      let nav = await utilities.getNav()

      return res.status(201).render("inventory/management", {
        title: "Inventory Management",
        nav,
        errors: null
      })
    }

    req.flash("notice", "Failed to add classification.")
    res.status(500).render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: null
    })

  } catch (error) {
    next(error)
  }
}


invCont.buildManagementView = async function (req, res, next) {
  try {
    let nav = await utilities.getNav();
    res.render("inventory/management", {
      title: "Inventory Management",
      nav,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
};


/* ***************************
 *  Trigger intentional 500 error demo !! 
 *************************** */
invCont.triggerError = async function (req, res, next) {
  throw new Error("Intentional server crash for testing purposes")
}

invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classificationList = await utilities.buildClassificationList()
  res.render("inventory/add-inventory", {
    title: "Add New Inventory Item",
    nav,
    classificationList,
    errors: null,
  })
}

invCont.addInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classificationList = await utilities.buildClassificationList()
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body

  if (!inv_make || !inv_model || !inv_year || !inv_description || !inv_image || !inv_thumbnail || !inv_price || !inv_miles || !inv_color || !classification_id) {
    req.flash("notice", "Please provide values for all required fields.")
    return res.status(400).render("inventory/add-inventory", {
      title: "Add New Inventory Item",
      nav,
      classificationList,
      errors: null, 
    })
  }

  try {
    const result = await invModel.addInventory(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)

    if (result) {
      req.flash("notice", `Successfully added ${inv_make} ${inv_model}.`)
      return res.status(201).render("inventory/management", {
        title: "Inventory Management",
        nav,
        errors: null
      })
    } else {
      req.flash("notice", "Failed to add inventory item.")
      return res.status(500).render("inventory/add-inventory", {
        title: "Add New Inventory Item",
        nav,
        classificationList,
        errors: null,
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = invCont
