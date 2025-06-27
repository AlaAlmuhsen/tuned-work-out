import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

let connection;

/**
 * @returns {mysql.Connection}
 */
async function initDB() {
    if (connection) {
        return connection;
    }

    try {
        connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME,
            port: DB_PORT,
        });

        console.log("MySQL connected");
        return connection;
    } catch (error) {
        console.error("❌ MySQL connection failed:", error);
        throw error;
    }
}
export default initDB;
