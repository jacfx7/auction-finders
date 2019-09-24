import app from 'firebase/app';
import 'firebase/auth';
//import 'firebase/database';
import 'firebase/firestore';
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS } from 'react-admin';
import { FirebaseDataProvider } from 'react-admin-firebase';
import { config } from 'rxjs';

class AuthClient {
  constructor(firebaseConfig, options) {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.auth = app.auth();
    this.db = app.firestore();

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  async HandleAuthLogin(params) {
    const { username, password, mode } = params;
    debugger;
    try {
      let login;

      switch (mode) {
        case 'facebook':
          login = await this.auth.signInWithPopup(this.facebookProvider);
          break;
        case 'google':
          login = await this.auth.signInWithPopup(this.googleProvider);
          break;
        case 'twitter':
          login = await this.auth.signInWithPopup(this.twitterProvider);
          break;
        default:
          login = await this.auth.signInWithEmailAndPassword(username, password);
          break;
      }

      debugger;
      return await this.mergeUserDbUser(login.user);
    } catch (e) {
      throw new Error('Login error: invalid credentials');
    }
  }

  async HandleAuthLogout(params) {
    await this.auth.signOut();
  }

  async HandleAuthError(params) {}

  async HandleAuthCheck(params) {
    try {
      const user = await this.getUserLogin();
    } catch (e) {
      throw new Error('Auth check error: ' + e);
    }
  }

  async getUserLogin() {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          this.user(authUser.uid)
            .get()
            .then(async snapshot => {
              let dbUser = snapshot.data();

              if (!dbUser) {
                dbUser = await this.createDbUser(authUser);
              }
              // default empty roles
              if (dbUser && !dbUser.roles) {
                dbUser.roles = {};
              }

              // merge auth and db user
              authUser = {
                uid: authUser.uid,
                email: authUser.email,
                emailVerified: authUser.emailVerified,
                providerData: authUser.providerData,
                ...dbUser
              };

              await this.updateUserLastLogin(authUser);

              resolve(authUser);
            });
        } else {
          reject('User not logged in');
        }
      });
    });
  }

  async createDbUser(user) {
    return this.user(user.uid).set(
      {
        username: user.email,
        email: user.email,
        createDate: new Date(Date.now()),
        lastLoginDate: new Date(Date.now()),
        permissions: 'user'
      },
      { merge: true }
    );
  }

  async mergeUserDbUser(user) {
    this.user(user.uid)
      .get()
      .then(async snapshot => {
        debugger;
        let dbUser = snapshot.data();

        if (!dbUser) {
          dbUser = await this.createDbUser(user);
        }
        // default empty roles
        if (dbUser && !dbUser.roles) {
          dbUser.roles = {};
        }

        // merge auth and db user
        user = {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          providerData: user.providerData,
          ...dbUser
        };

        await this.updateUserLastLogin(user);

        return user;
      });
  }

  async updateUserLastLogin(authUser) {
    const createdDate = authUser.createDate ? authUser.createDate : new Date(Date.now);
    this.user(authUser.uid).set(
      {
        createDate: createdDate,
        lastLoginDate: new Date(Date.now())
      },
      { merge: true }
    );
  }

  async HandleGetCurrent() {
    try {
      const user = await this.getUserLogin();
      return user;
    } catch (e) {
      return null;
    }
  }

  async HandleGetPermissions() {
    try {
      return this.getUserLogin().then(user => {
        if (user.roles['ADMIN']) {
          return 'admin';
        }
        if (user.roles['SUPER']) {
          return 'super';
        }
        return 'user';
      });
    } catch (e) {
      return null;
    }
  }

  user = uid => this.db.doc(`users/${uid}`);

  users = () => this.db.collection('users');
}

export function AuthProvider(firebaseConfig, options) {
  VerifyAuthProviderArgs(firebaseConfig, options);
  const auth = new AuthClient(firebaseConfig, options);

  return async (type, params) => {
    switch (type) {
      case AUTH_LOGIN:
        return auth.HandleAuthLogin(params);
      case AUTH_LOGOUT:
        return auth.HandleAuthLogout(params);
      case AUTH_ERROR:
        return auth.HandleAuthError(params);
      case AUTH_CHECK:
        return auth.HandleAuthCheck(params);
      case 'AUTH_GETCURRENT':
        return auth.HandleGetCurrent();
      case AUTH_GET_PERMISSIONS:
        return auth.HandleGetPermissions();
      default:
        throw new Error('Unhandled auth type:' + type);
    }
  };
}

function VerifyAuthProviderArgs(firebaseConfig, options) {
  const hasNoApp = !options || !options.app;
  const hasNoConfig = !firebaseConfig;
  if (hasNoConfig && hasNoApp) {
    throw new Error(
      'Please pass the Firebase firebaseConfig object or options.app to the FirebaseAuthProvider'
    );
  }
}
