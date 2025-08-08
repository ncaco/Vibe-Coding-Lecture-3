@echo off
echo 🧹 Cleaning build cache...

echo Stopping Node.js processes...
taskkill /f /im node.exe >nul 2>&1

echo Removing .next directory...
if exist ".next" (
    rmdir /s /q ".next" 2>nul
    echo ✅ Removed: .next
) else (
    echo ℹ️  Not found: .next
)

echo Removing node_modules/.cache...
if exist "node_modules\.cache" (
    rmdir /s /q "node_modules\.cache" 2>nul
    echo ✅ Removed: node_modules\.cache
) else (
    echo ℹ️  Not found: node_modules\.cache
)

echo Removing out directory...
if exist "out" (
    rmdir /s /q "out" 2>nul
    echo ✅ Removed: out
) else (
    echo ℹ️  Not found: out
)

echo Removing .next-env.d.ts...
if exist ".next-env.d.ts" (
    del ".next-env.d.ts" 2>nul
    echo ✅ Removed: .next-env.d.ts
) else (
    echo ℹ️  Not found: .next-env.d.ts
)

echo.
echo ✨ Cleanup completed!
echo 💡 Run "npm install" and "npm run dev" to restart.
pause
