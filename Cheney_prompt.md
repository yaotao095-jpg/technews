# Cheney_prompt.md · 开发提示词记录

> 姓名：蒋瑞龙 | 学号：24001010210 | 时间：2026-11-19 | 大模型：deepseek-flash
>
> 说明：本文件按时间顺序**只追加**记录每一次向 AI 发出的开发指令（时间 | 提示词全文 | 大模型名称），历史记录不覆盖、不修改。

---

## 记录 1

- **时间**：2026-11-19 13:21
- **大模型**：deepseek-flash
- **提示词全文**：

```text
这是我的项目根目录：D:\deepseek\dswork\technews

请先完成第 1 步初始化：
1. 在项目根目录执行 git init，并创建 .gitignore 文件，忽略 node_modules、.env 等不必要提交的文件，然后做第一次提交。
2. 按照 AGENTS.md 中的项目结构，创建 frontend/ 与 backend/ 目录骨架，安装后端所需依赖（express、mysql2、cors、dotenv）。
3. 编写 frontend/index.html 首页：必须包含姓名（蒋瑞龙）、学号（24001010210）、项目名（科技资讯站）、项目类别（自选）、全部页面超链接、canvas 背景动画、美观的导航。
4. 在项目根目录创建 readme.md，写明学号与姓名。
```

---

## 记录 2

- **时间**：2026-11-19 13:25
- **大模型**：deepseek-flash
- **提示词全文**：

```text
接着做第 4、5 步，后端与数据库：

1. backend/ 使用 Node.js + Express，RESTful + MVC 风格（routes / controllers / models / config 分层），
   所有接口以 /api/ 为前缀，端口固定 8325，用 express.static 托管 frontend/ 目录，并支持所有跨域访问。
2. MySQL 凭据只允许写入 backend/.env（DB_USER、DB_PASSWORD、DB_HOST、DB_NAME），.env 加入 .gitignore，
   代码里不得出现明文密码。
3. 接口统一返回 { "code": 0, "msg": "提示信息", "data": {...} }，服务器端的数据与错误信息输出到 console。
4. 建立数据库 cheney_tech_site，建表 Cheney_news（科技新闻）与 Cheney_gallery（图文列表），
   每张表插入至少 8 条有真实业务意义的测试数据，所有 SQL 按执行顺序追加到 backend/Cheney_database.md，
   保证仅凭该文件即可在新机器上重建数据库。
5. 提供 database.html 所需的数据库连接测试接口 POST /api/db/test：接收用户名与密码，实际连接 MySQL，
   成功返回版本号、端口与表列表，失败返回可读的错误原因。
```

---

## 记录 3

- **时间**：2026-11-19 13:41
- **大模型**：deepseek-flash
- **提示词全文**：

```text
接着做前端页面（第 3、5、6 步）：

1. 写 frontend/css/Cheney_style.css，全部类名以 Cheney_ 开头；首页为深色科技风，内页为浅色卡片风，
   要求响应式、有滚动入场动画，并兼容 prefers-reduced-motion。
2. frontend/js/Cheney_index.js：原生 Canvas 实现粒子网络背景动画，随鼠标轻微交互，窗口尺寸变化自适应。
3. frontend/js/Cheney_news.js：fetch 调用 GET /api/news，渲染科技新闻卡片列表，数据与错误输出到浏览器控制台。
4. frontend/js/Cheney_gallery.js：fetch 调用 GET /api/gallery，渲染图文卡片列表，同样输出控制台日志。
5. frontend/js/Cheney_database.js：提交用户名与密码到 POST /api/db/test，展示连接成功（版本、端口、表）或失败原因。
6. 图片不得引用外链，使用本地 frontend/images/ 下的自绘 SVG 封面图。
```

---

## 记录 4

- **时间**：2026-11-19 13:44
- **大模型**：deepseek-flash
- **提示词全文**：

```text
收尾：

1. 在项目根目录写 启动.bat，双击即可安装依赖并启动后端（端口 8325），随后自动打开浏览器首页。
2. 把每次创建或修改接口的信息按「接口路径 | HTTP 方法 | 请求参数（含示例）| 响应格式（含 JSON 示例）| 修改时间」
   追加记录到 backend/Cheney_interface.md。
3. 实际启动服务，逐个访问首页、news.html、gallery.html、database.html 与三个接口，确认返回正常、无报错。
```

---

## 记录 5

- **时间**：2026-11-19 13:39
- **大模型**：deepseek-flash
- **提示词全文**：

```text
端口改为学号后三位，如何（然后）把我的项目打开让我看一下。
```

> 执行结果：服务端口由 8325 改为 **210**（学号 24001010210 后三位），同步更新 backend/app.js、四个页面里的接口地址、三个 JS 的提示文案、启动.bat、readme.md、AGENTS.md 与 backend/Cheney_interface.md。

---

## 记录 6

- **时间**：2026-11-19 13:42
- **大模型**：deepseek-flash
- **提示词全文**：

```text
端口改为8210。
```

> 执行结果：服务端口由 210 改为 **8210**（避免使用 1024 以下的端口），同步更新 backend/app.js（端口常量与文件头说明）、frontend/index.html 页脚、三个内页的接口地址、三个 JS 的报错提示、启动.bat（窗口标题与自动打开地址）、readme.md、AGENTS.md 与 backend/Cheney_interface.md 中的服务地址。

