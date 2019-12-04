import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Datagrid,
  List,
  Filter,
  TextField,
  TextInput,
  ShowButton
} from "react-admin";

const styles = theme => ({
  title: {
    maxWidth: "20em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
});

const HouseFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="title" alwaysOn />
  </Filter>
);

export const HouseList = withStyles(styles)(
  ({ permissions, classes, ...props }) => {
    return (
      <List title="Auction Houses" {...props} filters={<HouseFilter />}>
        <Datagrid>
          <TextField source="name" />
          <ShowButton />
        </Datagrid>
      </List>
    );
  }
);

export default HouseList;
