# Cheney_interface.md · 接口记录

> 姓名：蒋瑞龙 | 学号：24001010210 | 时间：2026-11-19 | 大模型：deepseek-flash
>
> 说明：本文件按时间顺序**只追加**记录每次创建或修改的接口，格式固定为
> 「接口路径 | HTTP 方法 | 请求参数（含示例）| 响应格式（含 JSON 示例）| 修改时间」。
> 统一响应结构：`{ "code": 0, "msg": "提示信息", "data": {...} }`，`code=0` 成功，非 0 失败。

**服务地址**：`http://localhost:8325`　**接口前缀**：`/api/`

---

## 1. 科技新闻列表

- **接口路径**：`/api/news`
- **HTTP 方法**：`GET`
- **请求参数**：无
- **请求示例**：

```text
GET http://localhost:8325/api/news
Accept: application/json
```

- **响应格式**：

```json
{
  "code": 0,
  "msg": "科技新闻列表获取成功",
  "data": {
    "total": 8,
    "list": [
      {
        "Cheney_id": 1,
        "Cheney_title": "国产大模型推理成本再降四成，中小企业接入门槛持续走低",
        "Cheney_summary": "多家云厂商同步下调推理实例价格，配合量化与蒸馏方案，单次调用成本已接近传统接口水平……",
        "Cheney_source": "科技日报",
        "Cheney_publish_time": "2026-11-18 09:20",
        "Cheney_cover_url": "/images/Cheney_cover_1.svg"
      }
    ]
  }
}
```

- **失败示例**：

```json
{ "code": 500, "msg": "新闻列表查询失败：<具体原因>", "data": null }
```

- **数据来源**：MySQL 表 `Cheney_news`，按 `Cheney_publish_time` 倒序
- **修改时间**：2026-11-19 13:25

---

## 2. 图文列表

- **接口路径**：`/api/gallery`
- **HTTP 方法**：`GET`
- **请求参数**：无
- **请求示例**：

```text
GET http://localhost:8325/api/gallery
Accept: application/json
```

- **响应格式**：

```json
{
  "code": 0,
  "msg": "图文列表获取成功",
  "data": {
    "total": 8,
    "list": [
      {
        "Cheney_id": 1,
        "Cheney_title": "校园夜景",
        "Cheney_image_url": "/images/Cheney_gallery_1.svg",
        "Cheney_intro": "图书馆与教学楼的灯光在雨后地面拉出长长的倒影，是每晚十点最熟悉的一幕。",
        "Cheney_created_at": "2026-11-19 13:25"
      }
    ]
  }
}
```

- **失败示例**：

```json
{ "code": 500, "msg": "图文列表查询失败：<具体原因>", "data": null }
```

- **数据来源**：MySQL 表 `Cheney_gallery`，按 `Cheney_id` 升序
- **修改时间**：2026-11-19 13:25

---

## 3. 数据库连接测试

- **接口路径**：`/api/db/test`
- **HTTP 方法**：`POST`
- **请求参数**（JSON 请求体）：

| 参数 | 类型 | 必填 | 示例 | 说明 |
| --- | --- | --- | --- | --- |
| `user` | string | 是 | `"root"` | MySQL 用户名 |
| `password` | string | 是 | `"root"` | MySQL 密码 |
| `host` | string | 否 | `"127.0.0.1"` | 仅允许 127.0.0.1 / localhost，默认取 .env |
| `port` | number | 否 | `3306` | 端口，默认取 .env |
| `database` | string | 否 | `"cheney_tech_site"` | 库名，默认取 .env |

- **请求示例**：

```text
POST http://localhost:8325/api/db/test
Content-Type: application/json

{ "user": "root", "password": "root" }
```

- **成功响应**：

```json
{
  "code": 0,
  "msg": "数据库连接成功",
  "data": {
    "user": "root",
    "host": "127.0.0.1",
    "port": 3306,
    "database": "cheney_tech_site",
    "version": "8.4.6",
    "tables": ["cheney_gallery", "cheney_news"]
  }
}
```

- **失败响应（密码错误）**：

```json
{
  "code": 1,
  "msg": "用户名或密码错误，请重试",
  "data": { "code": "ER_ACCESS_DENIED_ERROR" }
}
```

- **失败响应（数据库不存在）**：

```json
{
  "code": 1,
  "msg": "指定的数据库不存在，请先执行 Cheney_database.md 中的建库语句",
  "data": { "code": "ER_BAD_DB_ERROR" }
}
```

- **说明**：每次请求创建一次性连接，用完即关闭，不污染主连接池；主机只允许本机，避免把接口当作任意数据库代理
- **修改时间**：2026-11-19 13:25

---

## 4. 统一异常响应

- **接口路径**：`/api/*`（未匹配的接口）
- **HTTP 方法**：任意
- **修改时间**：2026-11-19 13:25

```json
{ "code": 404, "msg": "接口不存在", "data": null }
```

服务端异常时统一返回：

```json
{ "code": 500, "msg": "服务器内部错误", "data": null }
```
