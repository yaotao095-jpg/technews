/**
 * 姓名：蒋瑞龙 | 学号：24001010210 | 时间：2026-11-19 | 大模型：deepseek-flash
 * 文件：backend/controllers/Cheney_newsController.js
 * 说明：科技新闻控制器，负责接收请求、调用模型、按统一 JSON 格式返回。
 */
const Cheney_newsModel = require('../models/Cheney_newsModel');

async function Cheney_listNews(Cheney_req, Cheney_res) {
  try {
    const Cheney_list = await Cheney_newsModel.Cheney_findAllNews();
    Cheney_res.json({
      code: 0,
      msg: '科技新闻列表获取成功',
      data: { total: Cheney_list.length, list: Cheney_list }
    });
  } catch (Cheney_err) {
    console.error('[Cheney_listNews]', Cheney_err.message);
    Cheney_res.status(500).json({ code: 500, msg: '新闻列表查询失败：' + Cheney_err.message, data: null });
  }
}

module.exports = { Cheney_listNews };
