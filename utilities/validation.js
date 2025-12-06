const { body, validationResult } = require("express-validator");

let validateClassification = [

  body("classification_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please provide a classification name.")
    .matches(/^[A-Za-z0-9]+$/)
    .withMessage("No spaces or special characters allowed."),

  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = req.app.locals.nav

      return res.render("inventory/add-classification", {
        title: "Add Classification",
        nav,
        errors: errors.array(),
      })
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

  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {

      const {
        inv_make, inv_model, inv_year, inv_description,
        inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id
      } = req.body

      return utilities.buildClassificationList(classification_id)
        .then((classificationList) => {
          let nav = req.app.locals.nav

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
        })
    }
    next()
  }
]

module.exports = {
  validateClassification,
  validateInventory
}

