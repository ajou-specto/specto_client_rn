module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['nativewind/babel'],
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@assets': './src/assets',
          '@api': './src/api',
          '@components': './src/components',
          '@screens': './src/screens',
          '@stackNav': './src/stackNav',
          '@tabNav': './src/tabNav',
        },
      },
    ],
  ],
};
