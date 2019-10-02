import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import {
  Datagrid,
  List,
  Responsive,
  ShowButton,
  SimpleList,
  TextField,
  DateField
} from 'react-admin';

const styles = theme => ({
  title: {
    maxWidth: '20em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});

const AuctionList = withStyles(styles)(({ classes, ...props }) => (
  <List {...props} sort={{ field: 'auctionDate', order: 'DESC' }}>
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
          <ShowButton />
        </Datagrid>
      }
    />
  </List>
));

export default AuctionList;
