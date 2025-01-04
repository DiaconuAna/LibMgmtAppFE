const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

const AuthModuleFederationConfigPlugin = withModuleFederationPlugin({

  name: 'auth',

  remotes: {
    "authentification": "http://localhost:4201/remoteEntry.js",
  },

  exposes: {
    './AuthModule': './src/app/app.module.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});

AuthModuleFederationConfigPlugin.output.publicPath = 'http://localhost:4201/'
module.exports = AuthModuleFederationConfigPlugin;
