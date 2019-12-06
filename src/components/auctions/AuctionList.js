import { withStyles } from "@material-ui/core/styles";
import React from "react";
import {
  Datagrid,
  List,
  Responsive,
  ShowButton,
  SimpleList,
  TextField,
  DateField,
  ReferenceManyField
} from "react-admin";
import { ItemCount } from "@/components/common";

const styles = theme => ({
  title: {
    maxWidth: "20em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
});

const AuctionList = withStyles(styles)(({ permissions, classes, ...props }) => {
  let filterBy = "admin123";
  if (permissions) {
    filterBy = permissions.role === "admin" ? "" : permissions.email;
  }

  return (
    <List
      {...props}
      sort={{ field: "auctionDate", order: "DESC" }}
      filter={{ createdby: filterBy }}
    >
      <Responsive
        small={
          <SimpleList
            linkType="show"
            primaryText={rec => rec.description}
            tertiaryText={record => new Date(record.date).toLocaleDateString()}
          />
        }
        medium={
          <Datagrid>
            <TextField source="id" />
            <TextField source="description" cellClassName={classes.title} />
            <DateField source="date" showTime />
            <ReferenceManyField
              label="Items"
              reference="auctionItems"
              target="auction_id"
            >
              <ItemCount {...props} />
            </ReferenceManyField>
            <ShowButton />
          </Datagrid>
        }
      />
    </List>
  );
});

export default AuctionList;
