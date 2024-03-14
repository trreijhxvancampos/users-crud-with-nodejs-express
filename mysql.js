// Get the client
require('dotenv').config();
const mysql = require('mysql2/promise');

async function query(q, values) {

    // Create the connection to database
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    });

    // Using placeholders
    try {
        const [results] = await connection.query(q, values);
        return results

    } catch (err) {
        console.log(err);
    }

}

module.exports = {query};