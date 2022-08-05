module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      ///This Plugin should be last
      'react-native-reanimated/plugin',
      ],
  }

};
