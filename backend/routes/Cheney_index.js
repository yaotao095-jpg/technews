/**
 * 姓名：蒋瑞龙 | 学号：24001010210 | 时间：2026-11-19 | 大模型：deepseek-flash
 * 文件：backend/routes/Cheney_index.js
 * 说明：接口路由汇总，统一挂在 /api 前缀下（RESTful 风格）。
 */
const express = require('express');
const Cheney_newsController = require('../controllers/Cheney_newsController');
const Cheney_galleryController = require('../controllers/Cheney_galleryController');
const Cheney_dbController = require('../controllers/Cheney_dbController');

const Cheney_router = express.Router();

// 科技新闻列表
Cheney_router.get('/news', Cheney_newsController.Cheney_listNews);

// 图文列表
Cheney_router.get('/gallery', Cheney_galleryController.Cheney_listGallery);

// 数据库连接测试
Cheney_router.post('/db/test', Cheney_dbController.Cheney_testConnection);

module.exports = Cheney_router;
