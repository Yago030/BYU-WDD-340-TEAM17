const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://cse340ssb:mBALxfmUBirElKm6JbnCk3vnu4Aa4Phb@dpg-d5ob1j7gi27c73ej2me0-a.oregon-postgres.render.com/cse340ssb',
  ssl: { rejectUnauthorized: false }
});

async function updateAccounts() {
  try {
    // Update Happy Employee
    const res1 = await pool.query(
      "UPDATE account SET account_type = 'Employee' WHERE account_email = 'happy@340.edu'"
    );
    console.log(`Updated Happy Employee: ${res1.rowCount} row(s) affected`);

    const res2 = await pool.query(
      "UPDATE account SET account_type = 'Admin' WHERE account_email = 'manager@340.edu'"
    );
    console.log(`Updated Manager User: ${res2.rowCount} row(s) affected`);

  } catch (err) {
    console.error("Error updating accounts:", err);
  } finally {
    await pool.end();
  }
}

updateAccounts();
