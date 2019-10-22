import React, { Component } from 'react';
import { connect } from 'react-redux';
import { crudGetAll, UserMenu } from 'react-admin';

class CustomUserMenuView extends Component {
  componentDidMount() {
    //this.fetchProfile();
  }

  render() {
    const { crudGetAll, permissions, profile, ...props } = this.props;
    console.log('profile:', profile);
    const icon =
      profile && profile.picture ? (
        <img src={profile.picture} alt="profile" width="48" height="48" />
      ) : (
        undefined
      );

    return <UserMenu label={profile ? profile.name : 'unknown'} icon={icon} {...props} />;
  }
}

const mapStateToProps = (state, props) => {
  const resource = 'users';
  const id = props.permissions ? props.permissions.userId : '';
  console.log('userid:', props);
  const profileState = state.admin.resources[resource];

  return {
    profile: profileState ? profileState.data[id] : null
  };
};

const CustomUserMenu = connect(
  mapStateToProps,
  { crudGetAll }
)(CustomUserMenuView);
export default CustomUserMenu;
