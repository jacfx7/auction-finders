import React from "react";
import { Button, Link } from "react-admin";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  button: {
    marginTop: "1em"
  }
};

const AuctionTitle = data => {
  return <div>Auction: {data.record ? `${data.record.description}` : ""}</div>;
};

const EditAuctionButton = withStyles(styles)(({ classes, record }) => (
  <Button
    className={classes.button}
    color="primary"
    component={Link}
    to={`/auctions/${record.id}`}
    label="Edit"
    title="Edit"
  >
    <EditIcon />
  </Button>
));

export { AuctionTitle, EditAuctionButton };
