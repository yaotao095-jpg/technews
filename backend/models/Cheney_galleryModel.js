/**
 * 姓名：蒋瑞龙 | 学号：24001010210 | 时间：2026-11-19 | 大模型：deepseek-flash
 * 文件：backend/models/Cheney_galleryModel.js
 * 说明：图文列表数据访问层，只负责与 Cheney_gallery 表交互。
 */
const { Cheney_pool } = require('../config/Cheney_db');

// 查询全部图文，按创建时间倒序
async function Cheney_findAllGallery() {
  const Cheney_sql = `
    SELECT
      Cheney_id,
      Cheney_title,
      Cheney_image_url,
      Cheney_intro,
      DATE_FORMAT(Cheney_created_at, '%Y-%m-%d %H:%i') AS Cheney_created_at
    FROM Cheney_gallery
    ORDER BY Cheney_id ASC
  `;
  const [Cheney_rows] = await Cheney_pool.query(Cheney_sql);
  return Cheney_rows;
}

module.exports = { Cheney_findAllGallery };
