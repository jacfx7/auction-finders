import React from 'react';
import { Admin, Resource } from 'react-admin';
import { FirebaseDataProvider } from 'react-admin-firebase';
import UserIcon from '@material-ui/icons/People';

import './App.css';
import { FirebaseConfig } from './config/keys';
import { PostList, PostShow, PostCreate, PostEdit } from './models/posts';
import { UserList, UserShow, UserCreate, UserEdit } from './models/users';
import CustomLoginPage from './CustomLoginPage';
import { AuthProvider } from './auth/AuthProvider';

const options = {
  logging: true
  //rootRef: "auction-finders-dev/users"
  // app: firebaseAppInstance
  // watch: ['posts'];
  // dontwatch: ['comments'];
};

const dataProvider = FirebaseDataProvider(FirebaseConfig, options);
const authProvider = AuthProvider(FirebaseConfig, options);

class App extends React.Component {
  render() {
    return (
      <Admin loginPage={CustomLoginPage} dataProvider={dataProvider} authProvider={authProvider}>
        {permissions => [
          <Resource
            name="posts"
            list={PostList}
            show={PostShow}
            create={PostCreate}
            edit={PostEdit}
          />,
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
