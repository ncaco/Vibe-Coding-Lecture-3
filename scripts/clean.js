const fs = require('fs');
const path = require('path');

console.log('🧹 Cleaning build cache...');

// 삭제할 디렉토리들
const dirsToClean = [
  '.next',
  'node_modules/.cache',
  'out'
];

// 삭제할 파일들
const filesToClean = [
  '.next-env.d.ts'
];

function removeDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    try {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`✅ Removed: ${dirPath}`);
    } catch (error) {
      console.log(`⚠️  Could not remove: ${dirPath} - ${error.message}`);
    }
  } else {
    console.log(`ℹ️  Not found: ${dirPath}`);
  }
}

function removeFile(filePath) {
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`✅ Removed: ${filePath}`);
    } catch (error) {
      console.log(`⚠️  Could not remove: ${filePath} - ${error.message}`);
    }
  } else {
    console.log(`ℹ️  Not found: ${filePath}`);
  }
}

// 디렉토리 정리
dirsToClean.forEach(dir => {
  removeDir(dir);
});

// 파일 정리
filesToClean.forEach(file => {
  removeFile(file);
});

console.log('✨ Cleanup completed!');
console.log('💡 Run "npm install" and "npm run dev" to restart.');
