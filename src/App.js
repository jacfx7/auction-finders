import React, { Component } from "react";
import { Admin, Resource } from "react-admin";
import {
  FirebaseDataProvider,
  FirebaseRealTimeSaga,
  FirebaseAuthProvider
} from "react-admin-firebase";

import "@/App.css";
import { FirebaseConfig } from "@/config/keys";
import users from "@/components/users";
import CustomLoginPageView from "@/template/CustomLoginPage";
import { AuthProvider } from "@/auth/AuthProvider";
import auctions from "@/components/auctions";
import auctionItems from "@/components/auctionItems";
import auctionHouse from "@/components/auctionHouse";
import Dashboard from "@/components/dashboard/Dashboard";
import CustomLayout from "@/template/CustomLayout";

const options = {
  logging: true,
  watch: ["auctions", "auctionItems", "users", "phoneNumbers", "auctionHouses"]
};

const dataProvider = FirebaseDataProvider(FirebaseConfig, options);
//const firebaseRealTime = FirebaseRealTimeSaga(dataProvider, options);
const authProvider = FirebaseAuthProvider(FirebaseConfig, options);

class App extends Component {
  render() {
    return (
      <Admin
        dashboard={Dashboard}
        loginPage={CustomLoginPageView}
        dataProvider={dataProvider}
        authProvider={authProvider}
        appLayout={CustomLayout}
        //customSagas={[firebaseRealTime]}
      >
        {permissions => [
          <Resource name="auctions" {...auctions} permissions={permissions} />,
          <Resource name="auctionItems" {...auctionItems} />,
          <Resource name="addresses" />,
          <Resource name="phoneNumbers" />,
          <Resource name="userTypes" />,
          <Resource name="states" />,
          (permissions && permissions.role) === "admin" ? (
            <Resource name="users" {...users} permissions={permissions} />
          ) : null,
          (permissions && permissions.role) === "admin" ? (
            <Resource
              name="auctionHouses"
              options={{ label: "Auction Houses" }}
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
