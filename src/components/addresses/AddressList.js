import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  title: {
    maxWidth: '20em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});

export const AddressList = withStyles(styles)(({ permissions, classes, ...props }) => {
  return <div></div>;
});

export default AddressList;
