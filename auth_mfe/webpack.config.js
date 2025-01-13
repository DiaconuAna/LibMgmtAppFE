const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

const AuthModuleFederationConfigPlugin = withModuleFederationPlugin({
  name: 'auth',
  exposes: {
    './LoginModule': './src/app/login/login.module.ts',  // Expose LoginModule correctly
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});

AuthModuleFederationConfigPlugin.output.publicPath = 'http://localhost:4201/';
module.exports = AuthModuleFederationConfigPlugin;
