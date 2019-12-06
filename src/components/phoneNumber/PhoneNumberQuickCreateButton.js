import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { change, submit, isSubmitting } from "redux-form";
import {
  fetchEnd,
  fetchStart,
  required,
  showNotification,
  crudGetMatching,
  Button,
  SaveButton,
  SimpleForm,
  TextInput,
  CREATE,
  REDUX_FORM_NAME
} from "react-admin";
import IconContentAdd from "@material-ui/icons/Add";
import IconCancel from "@material-ui/icons/Cancel";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { FirebaseDataProvider } from "react-admin-firebase";

import { FirebaseConfig } from "@/config/keys";

const options = {
  logging: false,
  watch: []
};
const dataProvider = FirebaseDataProvider(FirebaseConfig, options);

class PhoneNumberQuickCreateButton extends Component {
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
    submit("phoneNumber-quick-create");
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
    const { isSubmitting, auctionHouse_id } = this.props;

    return (
      <Fragment>
        <Button onClick={this.handleClick} label="ra.action.add">
          <IconContentAdd />
        </Button>
        <Dialog
          fullWidth
          open={showDialog}
          onClose={this.handleCloseClick}
          aria-label="Add Phone Number"
        >
          <DialogTitle>Create Phone Number</DialogTitle>
          <DialogContent>
            <SimpleForm
              defaultValue={{ auctionHouse_id }}
              form="phoneNumber-quick-create"
              resource="phoneNumbers"
              onSubmit={this.handleSubmit}
              toolbar={null}
            >
              <TextInput source="phoneNumber" validate={required()} />
              <TextInput source="type" validate={required()} />
            </SimpleForm>
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

const mapStateToProps = (state, props) => {
  const auctionHouse_id = props.id;
  return {
    auctionHouse_id: auctionHouse_id,
    isSubmitting: isSubmitting("phoneNumber-quick-create")(state)
  };
};

const mapDispatchToProps = {
  change,
  crudGetMatching,
  fetchEnd,
  fetchStart,
  showNotification,
  submit
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhoneNumberQuickCreateButton);
