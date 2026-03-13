@echo off
echo ================================
echo Lawa Delivery Database Setup
echo ================================
echo.

echo Step 1: Creating database...
psql -U postgres -c "CREATE DATABASE lawa_delivery;"
echo.

echo Step 2: Creating tables...
psql -U postgres -d lawa_delivery -f models\schema.sql
echo.

echo ================================
echo Setup Complete!
echo ================================
echo.
echo Now run: npm run dev
echo.
pause
