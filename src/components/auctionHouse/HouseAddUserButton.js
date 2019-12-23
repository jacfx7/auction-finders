import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { change, submit, isSubmitting } from "redux-form";
import {
  crudGetMatching,
  fetchStart,
  fetchEnd,
  showNotification,
  SaveButton,
  Button,
  SimpleForm,
  CREATE,
  REDUX_FORM_NAME
} from "react-admin";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { compose } from "recompose";
import IconContentAdd from "@material-ui/icons/Add";
import IconCancel from "@material-ui/icons/Cancel";
import { FirebaseDataProvider } from "react-admin-firebase";

import { FirebaseConfig } from "@/config/keys";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";

const options = {
  logging: false,
  watch: []
};
const dataProvider = FirebaseDataProvider(FirebaseConfig, options);

const styles = {
  bold: {
    fontWeight: "bold"
  },
  padFive: {
    paddingTop: "5px",
    paddingBottom: "3px"
  },
  padTop: {
    paddingTop: "10px"
  },
  inlineFlex: {
    display: "inline-flex"
  }
};

class HouseAddUserButton extends Component {
  state = {
    error: false,
    showDialog: false
  };

  handleClick = () => {
    this.setState({ showDialog: true });
  };

  handleCloseClick = () => {
    this.setState({ showDialog: false });
  };

  handleSaveClick = () => {
    const { submit } = this.props;
    submit("house-use-add");
  };

  refresh = () => {
    this.props.refreshCallback();
  };

  handleSubmit = values => {
    const {
      change,
      crudGetMatching,
      fetchStart,
      fetchEnd,
      showNotification
    } = this.props;

    fetchStart();

    dataProvider(CREATE, "phoneNumbers", { data: values })
      .then(({ data }) => {
        crudGetMatching(
          "phoneNumbers",
          "auctionHouses@id",
          { page: 1, perPage: 25 },
          { field: "id", order: "DESC" },
          {}
        );

        change(REDUX_FORM_NAME, "phoneNumber_id", data.id);
        this.refresh();
        this.setState({ showDialog: false });
      })
      .catch(error => {
        showNotification(error.message, "error");
      })
      .finally(() => {
        fetchEnd();
      });
  };

  render() {
    const { showDialog } = this.state;
    const { classes, isSubmitting } = this.props;

    return (
      <Fragment>
        <div className={clsx(classes.padTop)}>
          <Button onClick={this.handleClick} label="ra.action.add">
            <IconContentAdd />
          </Button>
        </div>
        <Dialog
          fullWidth
          open={showDialog}
          onCLose={this.handleCloseClick}
          aria-label="Add User"
        >
          <DialogTitle>Add User</DialogTitle>
          <DialogContent>
            <SimpleForm
              form="house-use-add"
              resource=""
              onSubmit={this.handleSubmit}
              toolbar={null}
            ></SimpleForm>
          </DialogContent>
          <DialogActions>
            <SaveButton saving={isSubmitting} onClick={this.handleSaveClick} />
            <Button label="ra.action.cancel" onClick={this.handleCloseClick}>
              <IconCancel />
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  const auctionHouse_id = props.id;
  return {
    auctionHouse_id: auctionHouse_id,
    isSubmitting: isSubmitting("house-use-add")(state)
  };
}

function mapDispatchToProps() {
  return {
    change,
    crudGetMatching,
    fetchEnd,
    fetchStart,
    showNotification,
    submit
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(HouseAddUserButton);
