// LoginPage.js
import React, { Component } from 'react';
import { Login, LoginForm } from 'react-admin';
import { connect } from 'react-redux';
import { userLogin } from 'react-admin';

const CustomLoginForm = props => (
  <div>
    <div style={{ fontFamily: 'monospace', marginLeft: '15px' }}>
      <p>Username: test@example.com</p>
      <p>Password: password</p>
    </div>
    <LoginForm {...props} />
  </div>
);

class CustomLoginPageView extends Component {
  submit = e => {
    e.preventDefault();
    // gather your data/credentials here
    const { email, password } = this.state;
    debugger;
    this.props.userLogin({ username: email, password: password, mode: 'email' });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    //const { email, password } = this.state;
    return (
      <form onSubmit={this.submit}>
        <div className="input-group my-3">
          <input
            className="form-control"
            name="email"
            type="text"
            placeholder="Email Address"
            onChange={this.onChange}
          />
        </div>
        <div className="input-group my-3">
          <input
            className="form-control"
            name="password"
            type="password"
            placeholder="Password"
            onChange={this.onChange}
          />
        </div>
        <button className="btn btn-lg btn-outline-primary btn-block my-3" type="submit">
          Sign In
        </button>
      </form>
    );
  }
}

const CustomLoginPage = props => <Login loginForm={<CustomLoginForm {...props} />} {...props} />;

export default connect(
  undefined,
  { userLogin }
)(CustomLoginPage);
