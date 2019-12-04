import React from "react";
import {
  Datagrid,
  ShowButton,
  ReferenceManyField,
  Show,
  Tab,
  TabbedShowLayout,
  TextField
} from "react-admin";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";

import { EditHouseButton, AuctionHouseTitle } from "./HouseCommon";

const styles = theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

const HouseShow = withStyles(styles)(({ permissions, classes, ...props }) => {
  return (
    <Show title={<AuctionHouseTitle />} {...props}>
      <TabbedShowLayout>
        <Tab label="Summary">
          <TextField label="Name" source="name" />
          <Card classes={classes.card} {...props}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  P
                </Avatar>
              }
              title="Phone Numbers:"
            ></CardHeader>
            <CardContent {...props}>
              {/* <ReferenceManyField
                addLabel={false}
                reference="phoneNumbers"
                target="auctionHouse_id"
              >
                <Datagrid></Datagrid>
              </ReferenceManyField> */}
            </CardContent>
          </Card>
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
});

export default HouseShow;
