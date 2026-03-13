@echo off
cls
echo ============================================
echo   Lawa Delivery - Database Tables Setup
echo ============================================
echo.
echo Ye script tables banayega database mein.
echo PostgreSQL password puchega - daal dena!
echo.
echo ============================================
echo.

set PSQL="C:\Program Files\PostgreSQL\18\bin\psql.exe"

echo Step 1: Database bana rahe hain...
echo.
%PSQL% -U postgres -c "CREATE DATABASE lawa_delivery;" 2>nul
if errorlevel 1 (
    echo Database already exists ya error aayi - continue kar rahe hain...
) else (
    echo Database ban gaya!
)
echo.

echo Step 2: Tables bana rahe hain...
echo.
%PSQL% -U postgres -d lawa_delivery -f models\schema.sql
echo.

echo Step 3: Tables check kar rahe hain...
echo.
%PSQL% -U postgres -d lawa_delivery -c "\dt"
echo.

echo ============================================
echo   Setup Complete!
echo ============================================
echo.
echo Ab backend restart karo: npm run dev
echo.
pause
