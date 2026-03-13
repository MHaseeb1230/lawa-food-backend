# Database Setup Script for Lawa Delivery
$psqlPath = "C:\Program Files\PostgreSQL\18\bin\psql.exe"

Write-Host "================================" -ForegroundColor Green
Write-Host "Lawa Delivery Database Setup" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""

Write-Host "Step 1: Checking if database exists..." -ForegroundColor Yellow

# Check if database exists
$checkDB = & $psqlPath -U postgres -lqt | Select-String -Pattern "lawa_delivery"

if ($checkDB) {
    Write-Host "Database 'lawa_delivery' already exists!" -ForegroundColor Yellow
    Write-Host ""
    $response = Read-Host "Do you want to drop and recreate it? (y/n)"
    if ($response -eq "y" -or $response -eq "Y") {
        Write-Host "Dropping database..." -ForegroundColor Yellow
        & $psqlPath -U postgres -c "DROP DATABASE lawa_delivery;"
        Write-Host "Creating fresh database..." -ForegroundColor Yellow
        & $psqlPath -U postgres -c "CREATE DATABASE lawa_delivery;"
    }
} else {
    Write-Host "Creating database 'lawa_delivery'..." -ForegroundColor Yellow
    & $psqlPath -U postgres -c "CREATE DATABASE lawa_delivery;"
}

Write-Host ""
Write-Host "Step 2: Creating tables in database..." -ForegroundColor Yellow
& $psqlPath -U postgres -d lawa_delivery -f "$PSScriptRoot\models\schema.sql"

Write-Host ""
Write-Host "Step 3: Verifying tables..." -ForegroundColor Yellow
& $psqlPath -U postgres -d lawa_delivery -c "\dt"

Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "You can now run: npm run dev" -ForegroundColor Cyan
Write-Host ""
