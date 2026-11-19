@echo off
chcp 65001 >nul
title 科技资讯站 - 后端服务（端口 210）

rem ============================================================
rem  姓名：蒋瑞龙 | 学号：24001010210 | 时间：2026-11-19 | 大模型：deepseek-flash
rem  用途：双击即可启动后端 Express 服务，并自动用浏览器打开首页
rem ============================================================

cd /d "%~dp0backend"

if not exist "node_modules" (
  echo [1/4] 未发现 node_modules，正在安装依赖……
  call npm install
  if errorlevel 1 (
    echo [错误] 依赖安装失败，请检查网络或 Node.js 环境。
    pause
    exit /b 1
  )
)

if exist ".env" goto run

echo [2/4] 未找到 backend\.env，改用本次会话的环境变量启动（不会写入任何文件）。
echo        如需固定配置，请把 .env.example 复制为 .env 并填写密码。
echo.
set "DB_HOST=127.0.0.1"
set "DB_PORT=3306"
set "DB_USER=root"
set "DB_NAME=cheney_tech_site"
set /p "DB_PASSWORD=请输入本机 MySQL 密码（直接回车默认 root）："
if not defined DB_PASSWORD set "DB_PASSWORD=root"

:run
echo [3/4] 启动服务：http://localhost:210
echo        按 Ctrl + C 可停止服务。
echo.

start "" http://localhost:210
node app.js

echo.
echo [4/4] 服务已退出。
pause
