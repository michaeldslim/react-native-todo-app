/*
 Copyright (C) 2025 Michael Lim - React Native Todo App 
 This software is free to use, modify, and share under 
 the terms of the GNU General Public License v3.
*/
const fs = require('fs');
const path = require('path');

const header = `/*
 Copyright (C) 2025 Michael Lim - React Native Todo App 
 This software is free to use, modify, and share under 
 the terms of the GNU General Public License v3.
*/
`;

function updateFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove existing header if it exists (anything between /* and */)
    content = content.replace(/\/\*[\s\S]*?\*\/\s*/, '');

    // Add new header
    content = header + content;

    fs.writeFileSync(filePath, content);
    console.log(`Updated header in: ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (
      stat.isDirectory() &&
      !file.startsWith('.') &&
      file !== 'node_modules'
    ) {
      processDirectory(fullPath);
    } else if (stat.isFile()) {
      const ext = path.extname(file);
      if (
        ['.js', '.jsx', '.ts', '.tsx'].includes(ext) &&
        file !== 'update-headers.js'
      ) {
        updateFile(fullPath);
      }
    }
  });
}

// Start processing from the root directory
processDirectory(process.cwd());
