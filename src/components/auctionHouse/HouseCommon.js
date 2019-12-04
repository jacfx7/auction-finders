import React from "react";
import { Button, Link } from "react-admin";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  button: {
    marginTop: "1em"
  }
};

const EditHouseButton = withStyles(styles)(({ classes, record }) => (
  <Button
    className={classes.button}
    color="primary"
    component={Link}
    to={`/auctionHouses/${record.id}`}
    label="Edit"
    title="Edit"
  >
    <EditIcon />
  </Button>
));

const AuctionHouseTitle = data => {
  return <div>Auction House: {data.record ? `${data.record.name}` : ""}</div>;
};

export { EditHouseButton, AuctionHouseTitle };
