import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  refreshView,
  Datagrid,
  ShowButton,
  ReferenceManyField,
  Show,
  Tab,
  TabbedShowLayout,
  TextField,
  SimpleList
} from "react-admin";
import { Divider } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";

import {
  EditHouseButton,
  AuctionHouseTitle
} from "@/components/auctionHouse/HouseCommon";
import PhoneNumberQuickCreateButton from "@/components/phoneNumber/PhoneNumberQuickCreateButton";
import AddressQuickCreateButton from "@/components/addresses/AddressQuickCreateButton";
import { compose } from "recompose";

const styles = theme => ({
  bold: {
    fontWeight: "bold"
  },
  padFive: {
    paddingTop: "5px"
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
  },
  avatar: {
    backgroundColor: red[500]
  },
  inlineFlex: {
    display: "inline-flex"
  }
});

class HouseShow extends Component {
  //= withStyles(styles)(({ permissions, classes, ...props }) => {

  render() {
    const { classes, refreshView } = this.props;

    const refreshEvent = () => {
      refreshView();
    };

    return (
      <Show title={<AuctionHouseTitle />} {...this.props}>
        <TabbedShowLayout>
          <Tab label="Summary">
            <TextField label="Name" source="name" />
            <Divider class={classes.padFive} />
            <Fragment>
              <div class={classes.inlineFlex}>Phone Numbers:</div>
              <PhoneNumberQuickCreateButton
                refreshCallback={refreshEvent}
                {...this.props}
              />
            </Fragment>
            <ReferenceManyField
              addLabel={false}
              reference="phoneNumbers"
              target="auctionHouse_id"
            >
              <SimpleList
                linkType="none"
                primaryText={rec => rec.phoneNumber}
                tertiaryText={rec => rec.type}
              ></SimpleList>
            </ReferenceManyField>
            <Divider class={classes.padFive} />
            <Fragment>
              <div class={classes.inlineFlex}>Addresses:</div>
              <AddressQuickCreateButton
                refreshCallback={refreshEvent}
                {...this.props}
              />
            </Fragment>
            <ReferenceManyField
              addLabel={false}
              reference="addresses"
              target="auctionHouse_id"
            >
              <SimpleList
                primaryText={rec => rec.addressLine1}
                tertiaryText={rec => `${rec.city}, ${rec.state}`}
              ></SimpleList>
            </ReferenceManyField>
            <Divider class={classes.padFive} />
            <EditHouseButton />
          </Tab>
          <Tab label="Users" path="users">
            <ReferenceManyField
              addLabel={false}
              reference="users"
              target="auctionHouse_id"
              sort={{ field: "name", order: "DESC" }}
            >
              <Datagrid>
                <TextField source="name" />
                <TextField source="email" />
                <TextField source="licenseNumber" />
                <ShowButton />
              </Datagrid>
            </ReferenceManyField>
          </Tab>
        </TabbedShowLayout>
      </Show>
    );
  }
}

export default compose(
  withStyles(styles),
  connect(null, { refreshView })
)(HouseShow);
