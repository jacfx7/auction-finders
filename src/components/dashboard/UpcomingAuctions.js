import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import Icon from '@material-ui/core/Icon';

const styles = {
  card: { borderLeft: 'solid 4px #4caf50', flex: 1, marginLeft: '1em' },
  icon: { float: 'right', width: 64, height: 64, padding: 16, color: '#4caf50' }
};

export default ({ value }) => (
  <Card style={styles.card}>
    <Icon style={styles.icon}>gavel</Icon>
    <CardTitle title={value} subtitle={'Auctions Happening in the Next 30 Days'} />
  </Card>
);
