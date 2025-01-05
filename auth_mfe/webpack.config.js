const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

const AuthModuleFederationConfigPlugin = withModuleFederationPlugin({

  name: 'auth',
  filename: 'remoteEntry.js',
  remotes: {
    "authentification": "http://localhost:4201/remoteEntry.js",
  },

  exposes: {
    './Module': './src/app/login/login.module.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});

AuthModuleFederationConfigPlugin.output.publicPath = 'http://localhost:4201/'
module.exports = AuthModuleFederationConfigPlugin;
