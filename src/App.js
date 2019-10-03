import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';
import { FirebaseDataProvider } from 'react-admin-firebase';
import UserIcon from '@material-ui/icons/People';
import { Route } from 'react-router-dom';

import './App.css';
import { FirebaseConfig } from './config/keys';
import { UserList, UserShow, UserCreate, UserEdit } from './models/users';
import CustomLoginPageView from './template/CustomLoginPage';
import { AuthProvider } from './auth/AuthProvider';
import { ProfileEdit } from './models/profile';
import auctions from './models/auctions';
import auctionItems from './models/auctionItems';

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
          permissions.role === 'admin' ? (
            <Resource
              name="users"
              icon={UserIcon}
              list={UserList}
              show={UserShow}
              create={UserCreate}
              edit={UserEdit}
            />
          ) : null
        ]}
      </Admin>
    );
  }
}

export default App;
