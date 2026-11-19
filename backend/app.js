/**
 * 姓名：蒋瑞龙 | 学号：24001010210 | 时间：2026-11-19 | 大模型：deepseek-flash
 * 文件：backend/app.js
 * 说明：科技资讯站后端入口。Express + RESTful/MVC，接口统一 /api 前缀，
 *       端口固定 8325，以 express.static 托管 frontend/，并允许所有跨域访问。
 */
const path = require('path');
const express = require('express');
const cors = require('cors');

// 读取 .env（凭据只放在这里，不写进代码）
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Cheney_apiRoutes = require('./routes/Cheney_index');
const { Cheney_checkConnection } = require('./config/Cheney_db');

const Cheney_app = express();
const Cheney_PORT = 8325;

// 允许所有跨域访问
Cheney_app.use(cors());
Cheney_app.use(express.json());
Cheney_app.use(express.urlencoded({ extended: false }));

// 静态托管前端
Cheney_app.use(express.static(path.join(__dirname, '..', 'frontend')));

// 业务接口：/api/news、/api/gallery、/api/db/test
Cheney_app.use('/api', Cheney_apiRoutes);

// 接口 404（统一 JSON 格式）
Cheney_app.use('/api', (Cheney_req, Cheney_res) => {
  Cheney_res.status(404).json({ code: 404, msg: '接口不存在', data: null });
});

// 统一错误处理（统一 JSON 格式）
Cheney_app.use((Cheney_err, Cheney_req, Cheney_res, Cheney_next) => {
  console.error('[Cheney_error]', Cheney_err);
  Cheney_res.status(500).json({ code: 500, msg: '服务器内部错误', data: null });
});

// 端口被占用时给出可读提示
Cheney_app.on('error', (Cheney_err) => {
  if (Cheney_err.code === 'EADDRINUSE') {
    console.error(`[Cheney_error] 端口 ${Cheney_PORT} 已被占用，请先关闭占用它的程序。`);
    process.exit(1);
  }
  throw Cheney_err;
});

Cheney_app.listen(Cheney_PORT, () => {
  console.log(`科技资讯站后端已启动：http://localhost:${Cheney_PORT}`);
  console.log(`静态目录：${path.join(__dirname, '..', 'frontend')}`);
  // 启动后异步预检数据库，不影响服务启动
  Cheney_checkConnection();
});
