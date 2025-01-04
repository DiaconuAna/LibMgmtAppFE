const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

const HostConfigModuleFederationPlugin = withModuleFederationPlugin({

  remotes: {
    "authentification": "http://localhost:4201/remoteEntry.js",
    // "books": "http://localhost:4202/remoteEntry.js",
    // "user": "http://localhost:4203/remoteEntry.js",
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
HostConfigModuleFederationPlugin.output.publicPath = 'http://localhost:4200/';
module.exports = HostConfigModuleFederationPlugin;
