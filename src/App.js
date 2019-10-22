import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';
import { FirebaseDataProvider } from 'react-admin-firebase';

import './App.css';
import { FirebaseConfig } from './config/keys';
import users from './components/users';
import CustomLoginPageView from './template/CustomLoginPage';
import { AuthProvider } from './auth/AuthProvider';
import auctions from './components/auctions';
import auctionItems from './components/auctionItems';
import auctionHouse from './components/auctionHouse';
import Dashboard from './components/dashboard/Dashboard';
import CustomLayout from './template/CustomLayout';

const options = {
  logging: true,
  watch: ['auctions', 'auctionItems', 'users']
};

const dataProvider = FirebaseDataProvider(FirebaseConfig, options);
const authProvider = AuthProvider(FirebaseConfig, options);

class App extends Component {
  render() {
    return (
      <Admin
        dashboard={Dashboard}
        loginPage={CustomLoginPageView}
        dataProvider={dataProvider}
        authProvider={authProvider}
        appLayout={CustomLayout}
      >
        {permissions => [
          <Resource name="auctions" {...auctions} permissions={permissions} />,
          <Resource name="auctionItems" {...auctionItems} />,
          <Resource name="addresses" />,
          (permissions && permissions.role) === 'admin' ? (
            <Resource name="users" {...users} permissions={permissions} />
          ) : null,
          (permissions && permissions.role) === 'admin' ? (
            <Resource
              name="auctionHouses"
              options={{ label: 'Auction Houses' }}
              {...auctionHouse}
              permissions={permissions}
            />
          ) : null,
          <Resource name="userTypes" />
        ]}
      </Admin>
    );
  }
}

export default App;
