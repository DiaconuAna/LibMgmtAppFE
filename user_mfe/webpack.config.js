// webpack.config.js (Book Remote)

const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

const UserModuleFederationConfigPlugin = withModuleFederationPlugin({

  name: 'user',

  exposes: {
    './UserModule': 'E:\\Business\\Master\\Sem3\\SOA\\LibMgmtAppFE\\user_mfe\\src\\app\\user\\user.module.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});

UserModuleFederationConfigPlugin.output.publicPath = 'http://localhost:4203/'
module.exports = UserModuleFederationConfigPlugin;
