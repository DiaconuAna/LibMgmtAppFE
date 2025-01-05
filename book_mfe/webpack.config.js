// webpack.config.js (Book Remote)

const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

const BookModuleFederationConfigPlugin = withModuleFederationPlugin({

  name: 'book',
  filename: 'remoteEntry.js',
  remotes: {
    "book": "http://localhost:4202/remoteEntry.js",
  },

  exposes: {
    './Module': './src/app/book/book.module.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});

BookModuleFederationConfigPlugin.output.publicPath = 'http://localhost:4202/'
module.exports = BookModuleFederationConfigPlugin;
