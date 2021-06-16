import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

const styles = {
  card: { borderLeft: 'solid 4px #4caf50', flex: 1, marginLeft: '1em' },
  icon: { float: 'right', width: 64, height: 64, padding: 16, color: '#4caf50' }
};

const CardExport = ({ items = [], nb, title }) => (
  <Card style={styles.card}>
    <Icon style={styles.icon}>ballot</Icon>
    <CardTitle title={nb} subtitle={title} />
    <List>
      {items.map(record => (
        <ListItem
          button
          component="a"
          href={`#/auctions/${record.auctionId}/show/items`}
          key={record.itemId}
        >
          <ListItemText primary={record.itemTitle} secondary={record.itemDescription} />
        </ListItem>
      ))}
    </List>
  </Card>
);

export default CardExport;
