import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Datagrid,
  List,
  Filter,
  DateField,
  TextField,
  TextInput,
  ShowButton,
  EditButton,
  DeleteButton
} from "react-admin";

const styles = theme => ({
  title: {
    maxWidth: "20em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
});

const UserFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="title" alwaysOn />
  </Filter>
);

export const UserList = withStyles(styles)(
  ({ permissions, classes, ...props }) => {
    return (
      <List {...props} filters={<UserFilter />}>
        <Datagrid>
          <TextField source="name" />
          <TextField source="email" />
          <DateField source="createDate" showTime label="Created" />
          <DateField source="lastLoginDate" showTime label="Last Login" />
          <ShowButton />
          <EditButton />
          <DeleteButton redirect={false} />
        </Datagrid>
      </List>
    );
  }
);

export default UserList;
