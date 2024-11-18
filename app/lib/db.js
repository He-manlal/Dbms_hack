import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,      // e.g., 'localhost'
  user: process.env.DB_USER,      // e.g., 'root'
  password: process.env.DB_PASSWORD,  // e.g., 'password'
  database: process.env.DB_NAME,  // e.g., 'my_database'
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
