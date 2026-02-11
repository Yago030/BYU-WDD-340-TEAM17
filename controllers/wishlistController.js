const wishlistModel = require("../models/wishlist-model")
const utilities = require("../utilities/")

const wishlistCont = {}

/* ***************************
 *  Add vehicle to wishlist
 * ************************** */
wishlistCont.addFavorite = async function (req, res) {
  const inv_id = req.params.inv_id
  const account_id = res.locals.accountData.account_id
  
  const result = await wishlistModel.addFavorite(account_id, inv_id)
  
  if (result) {
    req.flash("notice", "Vehicle added to your wishlist.")
  } else {
    req.flash("notice", "Sorry, there was an error adding the vehicle to your wishlist.")
  }
  res.redirect("/inv/detail/" + inv_id)
}

/* ***************************
 *  Remove vehicle from wishlist
 * ************************** */
wishlistCont.removeFavorite = async function (req, res) {
  const inv_id = req.params.inv_id
  const account_id = res.locals.accountData.account_id
  
  const result = await wishlistModel.removeFavorite(account_id, inv_id)
  
  if (result) {
    req.flash("notice", "Vehicle removed from your wishlist.")
  } else {
    req.flash("notice", "Sorry, there was an error removing the vehicle.")
  }
  
  // Decide where to redirect based on where the request came from
  const referer = req.get("Referer")
  if (referer && referer.includes("/account")) {
    res.redirect("/account/")
  } else {
    res.redirect("/inv/detail/" + inv_id)
  }
}

module.exports = wishlistCont
