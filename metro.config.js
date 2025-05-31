const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const baseConfig = mergeConfig(getDefaultConfig(__dirname), {
  // your custom config if any
});

module.exports = wrapWithReanimatedMetroConfig(baseConfig);
