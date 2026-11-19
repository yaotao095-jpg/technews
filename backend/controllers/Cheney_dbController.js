/**
 * 姓名：蒋瑞龙 | 学号：24001010210 | 时间：2026-11-19 | 大模型：deepseek-flash
 * 文件：backend/controllers/Cheney_dbController.js
 * 说明：数据库连接测试控制器。接收前端传来的用户名、密码，
 *       用一次性连接尝试登录 MySQL，并把版本号与库中的表返回给前端。
 */
const mysql = require('mysql2/promise');

const Cheney_allowedHosts = ['127.0.0.1', 'localhost'];

async function Cheney_testConnection(Cheney_req, Cheney_res) {
  const Cheney_user = String(Cheney_req.body.user || '').trim();
  const Cheney_password = String(Cheney_req.body.password || '');
  const Cheney_host = String(Cheney_req.body.host || '127.0.0.1').trim();
  const Cheney_port = Number(Cheney_req.body.port) || 3306;
  const Cheney_database = String(Cheney_req.body.database || process.env.DB_NAME || '').trim();

  if (!Cheney_user) {
    return Cheney_res.json({ code: 1, msg: '请输入用户名', data: null });
  }
  if (!Cheney_allowedHosts.includes(Cheney_host)) {
    return Cheney_res.json({ code: 1, msg: '仅支持连接本机 MySQL（127.0.0.1 / localhost）', data: null });
  }

  let Cheney_conn = null;
  try {
    Cheney_conn = await mysql.createConnection({
      host: Cheney_host,
      port: Cheney_port,
      user: Cheney_user,
      password: Cheney_password,
      database: Cheney_database || undefined,
      connectTimeout: 5000
    });

    const [Cheney_versionRows] = await Cheney_conn.query('SELECT VERSION() AS Cheney_version, @@port AS Cheney_port');
    const [Cheney_tableRows] = Cheney_database
      ? await Cheney_conn.query('SHOW TABLES')
      : [[]];

    const Cheney_tables = Cheney_tableRows.map((Cheney_row) => Object.values(Cheney_row)[0]);

    Cheney_res.json({
      code: 0,
      msg: '数据库连接成功',
      data: {
        user: Cheney_user,
        host: Cheney_host,
        port: Cheney_versionRows[0].Cheney_port,
        database: Cheney_database || '（未指定，已连接到 MySQL 服务）',
        version: Cheney_versionRows[0].Cheney_version,
        tables: Cheney_tables
      }
    });
  } catch (Cheney_err) {
    console.error('[Cheney_testConnection]', Cheney_err.code, Cheney_err.message);
    const Cheney_hint = Cheney_err.code === 'ER_ACCESS_DENIED_ERROR'
      ? '用户名或密码错误，请重试'
      : Cheney_err.code === 'ER_BAD_DB_ERROR'
        ? `数据库 ${Cheney_database} 不存在`
        : '连接失败：' + Cheney_err.message;
    Cheney_res.json({ code: 1, msg: Cheney_hint, data: { code: Cheney_err.code || 'UNKNOWN' } });
  } finally {
    if (Cheney_conn) {
      try { await Cheney_conn.end(); } catch (Cheney_ignore) { /* 关闭异常忽略 */ }
    }
  }
}

module.exports = { Cheney_testConnection };
