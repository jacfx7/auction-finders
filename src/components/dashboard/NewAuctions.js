import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import Icon from '@material-ui/core/Icon';

const styles = {
  card: { borderLeft: 'solid 4px #ff9800', flex: 1, marginLeft: '1em' },
  icon: { float: 'right', width: 64, height: 64, padding: 16, color: '#ff9800' }
};

const CardExport = ({ value }) => (
  <Card style={styles.card}>
    <Icon style={styles.icon}>gavel</Icon>
    <CardTitle title={value} subtitle={'Auctions Created in Last 30 Days'} />
  </Card>
);

export default CardExport;
