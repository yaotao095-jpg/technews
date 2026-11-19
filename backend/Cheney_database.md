# Cheney_database.md · 数据库结构记录

> 姓名：蒋瑞龙 | 学号：24001010210 | 时间：2026-11-19 | 大模型：deepseek-flash
> 说明：本文件按执行顺序追加所有建库、建表、插入测试数据的 SQL。
> 仅凭本文件即可在新机器上完整重建本项目数据库（MySQL 8.x）。

## 第 1 次执行 · 2026-11-19 · 建库

```sql
CREATE DATABASE IF NOT EXISTS cheney_tech_site
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_general_ci;

USE cheney_tech_site;
```

## 第 2 次执行 · 2026-11-19 · 建科技新闻表 Cheney_news

用途：首页「科技新闻列表」页面的数据源，字段覆盖标题、摘要、来源、发布时间、封面图。

```sql
CREATE TABLE IF NOT EXISTS Cheney_news (
  Cheney_id           INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  Cheney_title        VARCHAR(120) NOT NULL                COMMENT '新闻标题',
  Cheney_summary      VARCHAR(500) NOT NULL                COMMENT '新闻摘要',
  Cheney_source       VARCHAR(60)  NOT NULL                COMMENT '新闻来源',
  Cheney_publish_time DATETIME     NOT NULL                COMMENT '发布时间',
  Cheney_cover_url    VARCHAR(255) NOT NULL DEFAULT ''     COMMENT '封面图地址',
  Cheney_created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '入库时间',
  PRIMARY KEY (Cheney_id),
  KEY Cheney_idx_publish_time (Cheney_publish_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='科技新闻表';
```

## 第 3 次执行 · 2026-11-19 · 向 Cheney_news 插入 8 条测试数据

```sql
INSERT INTO Cheney_news
  (Cheney_title, Cheney_summary, Cheney_source, Cheney_publish_time, Cheney_cover_url)
VALUES
  ('国产大模型推理成本再降四成，中小企业接入门槛持续走低',
   '多家云厂商同步下调推理实例价格，配合量化与蒸馏方案，单次调用成本已接近传统接口水平，中小团队开始把大模型接入客服与内容审核流程。',
   '科技日报', '2026-11-18 09:20:00', '/images/Cheney_cover_1.svg'),
  ('6G 试验网完成多地组网验证，单用户峰值速率突破 100Gbps',
   '试验网在三个城市完成连续覆盖测试，空口时延稳定在亚毫秒级，为全息通信与低空经济场景提供了实测数据。',
   '新华社', '2026-11-17 15:40:00', '/images/Cheney_cover_2.svg'),
  ('开源社区发布 RISC-V 笔记本参考设计，整机成本下探至千元级',
   '该方案包含主板原理图、外壳结构与固件，采用 8 核 RISC-V 处理器，可运行主流 Linux 发行版，首批开发者样机已开始寄送。',
   'InfoQ', '2026-11-16 10:05:00', '/images/Cheney_cover_3.svg'),
  ('国家算力枢纽新增三个节点，绿电使用占比提升至 65%',
   '新增节点优先布局在风光资源富集地区，通过跨省调度把训练任务与清洁能源曲线对齐，PUE 控制在 1.2 以下。',
   '人民网', '2026-11-15 18:30:00', '/images/Cheney_cover_4.svg'),
  ('浏览器原生 AI 接口进入草案阶段，前端可直接调用本地小模型',
   '草案定义了模型能力探测、会话与流式输出三类接口，浏览器可在用户授权后调用设备端模型，网页无需再依赖云端推理。',
   'MDN 博客', '2026-11-14 08:50:00', '/images/Cheney_cover_5.svg'),
  ('高校 AI 通识课扩面，非计算机专业选课人数同比翻倍',
   '多所高校把人工智能导论设为通识必修，课程强调工具使用与伦理边界，配套的实验平台支持零代码完成小模型微调。',
   '中国教育报', '2026-11-13 14:15:00', '/images/Cheney_cover_6.svg'),
  ('固态电池中试线正式投产，单体能量密度达到 400Wh/kg',
   '中试线年产能规划为 2GWh，采用硫化物电解质路线，循环 1000 次后容量保持率仍在 90% 以上。',
   '第一财经', '2026-11-12 11:25:00', '/images/Cheney_cover_7.svg'),
  ('卫星互联网手机直连完成首次商用通话，时延低于 200ms',
   '通话由低轨星座与地面核心网协同完成，普通 5G 手机无需外接天线即可接入，后续将开放短信与低速数据业务。',
   '央视新闻', '2026-11-11 20:10:00', '/images/Cheney_cover_8.svg');
```

## 第 4 次执行 · 2026-11-19 · 建图文表 Cheney_gallery

用途：首页「图文列表」页面的数据源，图片保存在 frontend/images/ 下，随项目一起提交。

```sql
CREATE TABLE IF NOT EXISTS Cheney_gallery (
  Cheney_id         INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  Cheney_title      VARCHAR(120) NOT NULL                COMMENT '图文标题',
  Cheney_image_url  VARCHAR(255) NOT NULL                COMMENT '图片地址',
  Cheney_intro      VARCHAR(500) NOT NULL                COMMENT '图文简介',
  Cheney_created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '入库时间',
  PRIMARY KEY (Cheney_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='图文列表';
```

## 第 5 次执行 · 2026-11-19 · 向 Cheney_gallery 插入 8 条测试数据

```sql
INSERT INTO Cheney_gallery
  (Cheney_title, Cheney_image_url, Cheney_intro)
VALUES
  ('校园夜景',   '/images/Cheney_gallery_1.svg', '图书馆与教学楼的灯光在雨后地面拉出长长的倒影，是每晚十点最熟悉的一幕。'),
  ('实验室一角', '/images/Cheney_gallery_2.svg', '示波器与开发板并排摆放，屏幕上跳动的波形记录着一次调通的瞬间。'),
  ('城市天际线', '/images/Cheney_gallery_3.svg', '傍晚的玻璃幕墙反射出橙蓝色渐变，把天空切成规则的格子。'),
  ('芯片显微影像', '/images/Cheney_gallery_4.svg', '封装内部的金线在显微镜下呈规则排列，肉眼看不到的秩序感。'),
  ('数据中心机房', '/images/Cheney_gallery_5.svg', '成排机柜的指示灯连成一条呼吸般的绿线，安静却一直在运转。'),
  ('智能小车',   '/images/Cheney_gallery_6.svg', '循迹小车在赛道上完成一次 90 度转弯，轮子与地面的摩擦声很轻。'),
  ('代码与咖啡', '/images/Cheney_gallery_7.svg', '深夜屏幕上的编辑器与手边的马克杯，是一天里效率最高的两小时。'),
  ('海边日落',   '/images/Cheney_gallery_8.svg', '海平面把天空分成暖色与冷色两半，风把云推得很慢。');
```

## 校验

```sql
USE cheney_tech_site;
SELECT COUNT(*) AS news_total FROM Cheney_news;       -- 期望 8
SELECT COUNT(*) AS gallery_total FROM Cheney_gallery; -- 期望 8
```
