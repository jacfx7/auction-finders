import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';
import { FirebaseDataProvider } from 'react-admin-firebase';
import { Route } from 'react-router-dom';

import './App.css';
import { FirebaseConfig } from './config/keys';
import users from './components/users';
import CustomLoginPageView from './template/CustomLoginPage';
import { AuthProvider } from './auth/AuthProvider';
import { ProfileEdit } from './components/profile';
import auctions from './components/auctions';
import auctionItems from './components/auctionItems';
import auctionHouse from './components/auctionHouse';

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
        loginPage={CustomLoginPageView}
        dataProvider={dataProvider}
        authProvider={authProvider}
        customRoutes={[<Route key="my-profile" path="/my-profile" component={ProfileEdit} />]}
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
          ) : null
        ]}
      </Admin>
    );
  }
}

export default App;
