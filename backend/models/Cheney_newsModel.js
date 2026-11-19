/**
 * 姓名：蒋瑞龙 | 学号：24001010210 | 时间：2026-11-19 | 大模型：deepseek-flash
 * 文件：backend/models/Cheney_newsModel.js
 * 说明：科技新闻数据访问层，只负责与 Cheney_news 表交互。
 */
const { Cheney_pool } = require('../config/Cheney_db');

// 查询全部新闻，按发布时间倒序
async function Cheney_findAllNews() {
  const Cheney_sql = `
    SELECT
      Cheney_id,
      Cheney_title,
      Cheney_summary,
      Cheney_source,
      DATE_FORMAT(Cheney_publish_time, '%Y-%m-%d %H:%i') AS Cheney_publish_time,
      Cheney_cover_url
    FROM Cheney_news
    ORDER BY Cheney_publish_time DESC
  `;
  const [Cheney_rows] = await Cheney_pool.query(Cheney_sql);
  return Cheney_rows;
}

module.exports = { Cheney_findAllNews };
