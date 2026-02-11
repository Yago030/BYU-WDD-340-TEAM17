const pool = require("../database/")

/* *****************************
*   Add vehicle to wishlist
* *************************** */
async function addFavorite(account_id, inv_id) {
  try {
    const sql = "INSERT INTO wishlist (account_id, inv_id) VALUES ($1, $2) RETURNING *"
    return await pool.query(sql, [account_id, inv_id])
  } catch (error) {
    return error.message
  }
}

/* *****************************
*   Remove vehicle from wishlist
* *************************** */
async function removeFavorite(account_id, inv_id) {
  try {
    const sql = "DELETE FROM wishlist WHERE account_id = $1 AND inv_id = $2"
    return await pool.query(sql, [account_id, inv_id])
  } catch (error) {
    return error.message
  }
}

/* *****************************
*   Get all favorites for an account
* *************************** */
async function getWishlistByAccountId(account_id) {
  try {
    const sql = `SELECT i.* FROM inventory AS i 
                 JOIN wishlist AS w ON i.inv_id = w.inv_id 
                 WHERE w.account_id = $1`
    const data = await pool.query(sql, [account_id])
    return data.rows
  } catch (error) {
    return new Error("Error fetching wishlist")
  }
}

/* *****************************
*   Check if vehicle is in wishlist
* *************************** */
async function checkFavorite(account_id, inv_id) {
  try {
    const sql = "SELECT * FROM wishlist WHERE account_id = $1 AND inv_id = $2"
    const data = await pool.query(sql, [account_id, inv_id])
    return data.rowCount > 0
  } catch (error) {
    return false
  }
}

module.exports = { addFavorite, removeFavorite, getWishlistByAccountId, checkFavorite }
