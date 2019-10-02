import React from 'react';
import { Link } from 'react-router-dom';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { withStyles } from '@material-ui/core/styles';
import { Button } from 'react-admin';

const styles = {
  button: {
    marginTop: '1em'
  }
};

const AddItemButton = ({ classes, record }) => (
  <Button
    className={classes.button}
    variant="raised"
    component={Link}
    to={`/auctionItems/create?auction_id=${record.id}`}
    label="Add an item"
    title="Add an item"
  >
    <AddBoxIcon />
  </Button>
);

export default withStyles(styles)(AddItemButton);
