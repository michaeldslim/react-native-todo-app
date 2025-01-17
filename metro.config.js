/*
Copyright (C) 2024 Michael Lim - React Native Todo App - This software is free to use, modify, and share under the terms of the GNU General Public License v3.
*/
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push('cjs');

module.exports = defaultConfig;