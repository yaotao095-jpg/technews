# 科技资讯站

> 学号：24001010210
> 姓名：蒋瑞龙
> 项目类别：自选
> 技术栈：原生 HTML/CSS/JavaScript + Node.js/Express + MySQL
> 完成时间：2026-11-19

## 项目简介

「科技资讯站」是一个前后端分离（同一端口托管）的信息展示型站点，包含：

- 首页：Canvas 粒子背景动画 + 页面导航
- 科技新闻列表：数据来自 MySQL 的 `Cheney_news` 表，页面同时展示后端接口地址与接口返回内容
- 图文列表：数据来自 MySQL 的 `Cheney_gallery` 表，图片使用本地 `frontend/images/` 下的 SVG 图
- 数据库连接测试：输入用户名、密码连接 MySQL，成功与失败均有明确提示

## 目录结构

```
technews/
├─ AGENTS.md               # 项目开发规则（AI 生成代码的依据）
├─ readme.md               # 项目说明
├─ Cheney_prompt.md        # 提示词记录（只追加）
├─ 启动.bat                # 一键启动后端并打开首页
├─ frontend/               # 前端原生页面
│  ├─ index.html           # 首页（Canvas 背景动画 + 导航）
│  ├─ news.html            # 科技新闻列表
│  ├─ gallery.html         # 图文列表
│  ├─ database.html        # 数据库连接测试
│  ├─ css/Cheney_style.css
│  ├─ js/Cheney_*.js
│  ├─ images/              # 本地 SVG 配图
│  └─ fonts/               # iconfont 图标目录（本项未使用）
└─ backend/                # Node.js + Express（RESTful + MVC）
   ├─ app.js               # 入口，端口 8325，托管 frontend
   ├─ .env.example          # 数据库凭据模板（复制为 .env 后填写，.env 已加入 .gitignore）
   ├─ config/              # 数据库连接池
   ├─ models/              # 数据访问层
   ├─ controllers/         # 控制器
   ├─ routes/              # 路由（统一 /api 前缀）
   ├─ Cheney_interface.md  # 接口记录（只追加）
   └─ Cheney_database.md   # 建库建表与测试数据 SQL（只追加）
```

## 运行方式

环境要求：Node.js 24 及以上、MySQL 8.x（服务已启动）。

1. 首次运行先在 `backend/` 下安装依赖：

   ```
   cd backend
   npm i
   ```

2. 数据库凭据：把 `backend/.env.example` 复制为 `backend/.env`，填写本机 MySQL 的 `DB_USER`、`DB_PASSWORD` 等信息（`.env` 不会提交到仓库）。
   不建 `.env` 时，`启动.bat` 会临时询问密码，仅对本次进程生效。
3. 按 `backend/Cheney_database.md` 中的 SQL 重建数据库（仅换机器时需要）。
4. 双击根目录的 `启动.bat`，或在 `backend/` 下执行 `node app.js`。
5. 浏览器打开 <http://localhost:8325>。

## 接口一览

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | /api/news | 科技新闻列表 |
| GET | /api/gallery | 图文列表 |
| POST | /api/db/test | 数据库连接测试（body：user、password、host、port、database） |

统一响应格式：`{ "code": 0, "msg": "提示信息", "data": {...} }`，`code=0` 表示成功。
