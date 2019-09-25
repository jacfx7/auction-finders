import React, { Component } from 'react';
import { connect } from 'react-redux';
//import Typography from '@material-ui/core/Typography';
import { crudGetOne, UserMenu, MenuItemLink } from 'react-admin';
import SettingsIcon from '@material-ui/icons/Settings';

class CustomUserMenuView extends Component {
  componentDidMount() {
    this.fetchProfile();
  }

  fetchProfile = () => {
    this.props.crudGetOne('profile', 'my-profile', '/my-profile', false);
  };

  render() {
    const { crudGetOne, profile, ...props } = this.props;

    return (
      <UserMenu label={profile ? profile.nickname : ''} {...props}>
        <MenuItemLink to="/my-profile" primaryText="My profile" leftIcon={<SettingsIcon />} />
      </UserMenu>
    );
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
