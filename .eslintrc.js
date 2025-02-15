/*
 Copyright (C) 2025 Michael Lim - React Native Todo App 
 This software is free to use, modify, and share under 
 the terms of the GNU General Public License v3.
*/
module.exports = {
  extends: 'expo',
  plugins: ['header'],
  rules: {
    'header/header': [2, 'copyright/header.js'],
  },
  env: {
    node: true,
  },
};
