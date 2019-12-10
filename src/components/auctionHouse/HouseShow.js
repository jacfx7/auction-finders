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
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { compose } from "recompose";

import {
  EditHouseButton,
  AuctionHouseTitle
} from "@/components/auctionHouse/HouseCommon";
import PhoneNumberQuickCreateButton from "@/components/phoneNumber/PhoneNumberQuickCreateButton";
import AddressQuickCreateButton from "@/components/addresses/AddressQuickCreateButton";

const styles = {
  bold: {
    fontWeight: "bold"
  },
  padFive: {
    paddingTop: "5px",
    paddingBottom: "3px"
  },
  inlineFlex: {
    display: "inline-flex"
  }
};

class HouseShow extends Component {
  render() {
    const { classes, refreshView, ...rest } = this.props;

    const refreshEvent = () => {
      refreshView();
    };

    return (
      <Show title={<AuctionHouseTitle />} {...rest}>
        <TabbedShowLayout>
          <Tab label="Summary">
            <TextField label="Name" source="name" />
            <Divider className={clsx(classes.padFive)} />
            <Fragment>
              <div className={clsx(classes.inlineFlex)}>Phone Numbers:</div>
              <PhoneNumberQuickCreateButton
                refreshCallback={refreshEvent}
                {...rest}
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
            <Divider className={clsx(classes.padFive)} />
            <Fragment>
              <div className={clsx(classes.inlineFlex)}>Addresses:</div>
              <AddressQuickCreateButton
                refreshCallback={refreshEvent}
                {...rest}
              />
            </Fragment>
            <ReferenceManyField
              addLabel={false}
              reference="addresses"
              target="auctionHouse_id"
            >
              <SimpleList
                primaryText={rec => rec.addressLine1}
                tertiaryText={rec => `${rec.city}, ${rec.stateId}`}
              ></SimpleList>
            </ReferenceManyField>
            <Divider className={clsx(classes.padFive)} />
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
