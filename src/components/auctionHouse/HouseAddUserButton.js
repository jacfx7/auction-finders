import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { TextField } from "react-admin";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { compose } from "recompose";

const styles = {};

class HouseAddUserButton extends Component {
  render() {
    return <div></div>;
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps() {
  return {};
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps(), mapDispatchToProps())
)(HouseAddUserButton);
