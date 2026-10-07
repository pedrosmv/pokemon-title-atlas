@echo off
setlocal
cd /d "%~dp0.."
call pnpm run desktop
if errorlevel 1 pause
endlocal
