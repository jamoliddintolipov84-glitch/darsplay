@echo off
chcp 65001 >nul
title Dars play
cd /d "%~dp0"
echo.
echo  ==== Dars play ====
echo.
where node >nul 2>nul
if errorlevel 1 (
  echo  Node.js topilmadi. https://nodejs.org saytidan LTS versiyasini o‘rnating,
  echo  keyin shu faylni qayta ishga tushiring.
  start https://nodejs.org
  pause
  exit /b 1
)
if not exist node_modules (
  echo  Birinchi ishga tushirish: paketlar o‘rnatilmoqda ^(1-3 daqiqa^)...
  call npm install
  if errorlevel 1 (
    echo  Paketlarni o‘rnatib bo‘lmadi. Internetni tekshiring.
    pause
    exit /b 1
  )
)
echo  Ilova ishga tushmoqda. Brauzer ozi ochiladi: http://localhost:3000
echo  To‘xtatish uchun shu oynani yoping.
start "" cmd /c "timeout /t 8 >nul & start http://localhost:3000"
call npm run dev
pause
