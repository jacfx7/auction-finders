import React, { Component } from 'react';
import { connect } from 'react-redux';
import { crudGetOne, UserMenu } from 'react-admin';

class CustomUserMenuView extends Component {
  componentDidMount() {
    this.fetchProfile();
  }

  fetchProfile = () => {
    this.props.crudGetOne('profile', 'my-profile', '/my-profile', false);
  };

  render() {
    const { crudGetOne, profile, ...props } = this.props;

    const icon =
      profile && profile.picture ? (
        <img src={profile.picture} alt="profile" width="48" height="48" />
      ) : (
        undefined
      );

    return <UserMenu label={profile ? profile.name : 'unknown'} icon={icon} {...props} />;
  }
}

const mapStateToProps = state => {
  const resource = 'profile';
  const id = 'my-profile';
  const profileState = state.admin.resources[resource];

  return {
    profile: profileState ? profileState.data[id] : null
  };
};

const CustomUserMenu = connect(
  mapStateToProps,
  { crudGetOne }
)(CustomUserMenuView);
export default CustomUserMenu;
