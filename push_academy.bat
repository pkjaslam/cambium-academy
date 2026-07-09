@echo off
REM Push the Cambium Academy repo. First run initializes git.
cd /d %~dp0

where git >nul 2>nul
if errorlevel 1 (echo git is not installed or not on PATH & pause & exit /b 1)

REM The D: drive does not record file ownership, so git needs this folder
REM marked safe once. Add it only when git actually complains.
git status >nul 2>nul
if errorlevel 1 git config --global --add safe.directory D:/IFC_SSD2/idaho_sae/Cambium/cambium-academy

if not exist .git git init -b main

git remote get-url origin >nul 2>nul
if errorlevel 1 git remote add origin https://github.com/pkjaslam/cambium-academy.git

REM Commit identity: use the GitHub account email if git has none configured
git config user.name >nul 2>nul
if errorlevel 1 git config user.name "Jaslam Poolakkal"
git config user.email >nul 2>nul
if errorlevel 1 git config user.email "mjaslam@uidaho.edu"

git add -A
set MSG=%*
if "%MSG%"=="" set MSG=Academy update
git commit -m "%MSG%"
git push -u origin main
pause
