@echo off
rem 姓名：蒋瑞龙 | 学号：24001010210 | 时间：2026-11-19 | 大模型：deepseek-flash
rem 文件：发布到GitHub.bat
rem 说明：把本地仓库推送到 https://github.com/yaotao095-jpg/technews，
rem       推送成功后由 .github/workflows/deploy.yml 自动发布到 GitHub Pages。
chcp 65001 >nul
title 科技资讯站 - 发布到 GitHub
cd /d "%~dp0"

echo ============================================
echo  科技资讯站 · 发布到 GitHub
echo ============================================
echo.

echo [1/3] 配置远程仓库地址...
git remote set-url origin https://github.com/yaotao095-jpg/technews.git 2>nul
if errorlevel 1 git remote add origin https://github.com/yaotao095-jpg/technews.git
git remote -v
echo.

echo [2/3] 开始推送（若弹出 GitHub 登录窗口，选 “Sign in with your browser”，登录后点 Authorize）...
echo.
git push -u origin master
if errorlevel 1 goto fail

echo.
echo [3/3] 推送成功！
echo.
echo 下一步（只做一次）：
echo   打开 https://github.com/yaotao095-jpg/technews/settings/pages
echo   Build and deployment - Source 选择 “GitHub Actions”
echo   然后等 1 分钟左右，访问 https://yaotao095-jpg.github.io/technews/
echo.
pause
exit /b 0

:fail
echo.
echo [!] 推送失败，按下面顺序检查：
echo     1. GitHub 上是否已经创建了 technews 仓库（Public，不要勾选 README）
echo        https://github.com/new
echo     2. 网络能否访问 github.com（本机打不开就要先开加速工具）
echo     3. 登录弹窗是否被关掉了，关掉就重新运行本脚本
echo.
pause
exit /b 1
