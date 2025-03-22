
const { Pool } = require('pg')
require('dotenv').config()

const query = (sql, values = []) => {
    return new Promise(async(resolve, reject) => {
        try {
            const pool = openDb()
            const result = await pool.query(sql, values)
            resolve(result)
        } catch(error) {
            console.error('Database query error:', error);
            reject(error.message)
        }
    })
}

const openDb = () => {
    const pool = new Pool ({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME, 
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT || 5432,
    })
    return pool
}

module.exports = {
     query
}

