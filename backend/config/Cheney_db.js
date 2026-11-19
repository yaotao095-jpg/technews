/**
 * 姓名：蒋瑞龙 | 学号：24001010210 | 时间：2026-11-19 | 大模型：deepseek-flash
 * 文件：backend/config/Cheney_db.js
 * 说明：MySQL 连接池。凭据全部来自 backend/.env，代码中不出现账号密码。
 */
const mysql = require('mysql2/promise');

const Cheney_pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
});

// 启动时预检一次连接，缺凭据或库不存在时给出明确提示
async function Cheney_checkConnection() {
  if (!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
    console.warn('[Cheney_db] 未读取到数据库凭据，请检查 backend/.env 是否存在并按 .env.example 填写。');
    return false;
  }
  try {
    await Cheney_pool.query('SELECT 1');
    console.log(`[Cheney_db] 数据库连接成功：${process.env.DB_NAME}`);
    return true;
  } catch (Cheney_err) {
    console.error('[Cheney_db] 数据库连接失败：', Cheney_err.message);
    return false;
  }
}

module.exports = { Cheney_pool, Cheney_checkConnection };
