@echo off
chcp 65001 >nul
title 科技资讯站 - 后端服务（端口 8210）

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

echo [2/4] 未找到 backend\.env，现在按你的输入生成一份（只存在本机，已被 .gitignore 排除）。
echo.
set "DB_HOST=127.0.0.1"
set "DB_PORT=3306"
set "DB_USER=root"
set "DB_NAME=cheney_tech_site"
set /p "DB_PASSWORD=请输入本机 MySQL 密码（直接回车默认 root）："
if not defined DB_PASSWORD set "DB_PASSWORD=root"

> ".env" (
  echo DB_HOST=%DB_HOST%
  echo DB_PORT=%DB_PORT%
  echo DB_USER=%DB_USER%
  echo DB_PASSWORD=%DB_PASSWORD%
  echo DB_NAME=%DB_NAME%
)
echo [2/4] 已生成 backend\.env：数据库 %DB_NAME%，账号 %DB_USER%@%DB_HOST%:%DB_PORT%
echo.

:run
echo [3/4] 启动服务：http://localhost:8210
echo        按 Ctrl + C 可停止服务。
echo.

start "" http://localhost:8210
node app.js

echo.
echo [4/4] 服务已退出。
pause
