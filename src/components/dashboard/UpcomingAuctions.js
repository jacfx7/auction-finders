import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
  card: { borderLeft: 'solid 4px #4caf50', flex: 1, marginLeft: '1em' },
  icon: { float: 'right', width: 64, height: 64, padding: 16, color: '#4caf50' }
};

const CardExport = ({ value, title, auctionList = [] }) => (
  <Card style={styles.card}>
    <Icon style={styles.icon}>gavel</Icon>
    <CardTitle title={value} subtitle={title} />
    <List>
      {auctionList.map(record => (
        <ListItem button component="a" href={`#/auctions/${record.id}/show`} key={record.id}>
          <ListItemText primary={record.description} secondary={record.date.toLocaleDateString()} />
        </ListItem>
      ))}
    </List>
  </Card>
);

export default CardExport;
