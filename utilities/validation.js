const { body, validationResult } = require("express-validator");
const utilities = require(".")

let validateClassification = [

  body("classification_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please provide a classification name.")
    .matches(/^[A-Za-z0-9]+$/)
    .withMessage("No spaces or special characters allowed."),

  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("inventory/add-classification", {
        title: "Add Classification",
        nav,
        errors: errors.array(),
      })
      return
    }
    next()
  }
]




const validateInventory = [

  body("inv_make").trim().isLength({ min: 1 }).withMessage("Make is required."),
  body("inv_model").trim().isLength({ min: 1 }).withMessage("Model is required."),
  body("inv_year").isInt({ min: 1900, max: 2100 }).withMessage("Year is invalid."),
  body("inv_description").trim().isLength({ min: 1 }).withMessage("Description required."),
  body("inv_image").trim().isLength({ min: 1 }).withMessage("Image path required."),
  body("inv_thumbnail").trim().isLength({ min: 1 }).withMessage("Thumbnail path required."),
  body("inv_price").isNumeric().withMessage("Price must be a number."),
  body("inv_miles").isNumeric().withMessage("Miles must be a number."),
  body("inv_color").trim().isLength({ min: 1 }).withMessage("Color required."),
  body("classification_id").isInt().withMessage("Please choose a classification."),

  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      const {
        inv_make, inv_model, inv_year, inv_description,
        inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id
      } = req.body

      let classificationList = await utilities.buildClassificationList(classification_id)

      res.render("inventory/add-inventory", {
        title: "Add Inventory",
        nav,
        classificationList,
        errors: errors.array(),
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color
      })
      return
    }
    next()
  }
]

module.exports = {
  validateClassification,
  validateInventory
}

