import React from 'react';
import {
  Datagrid,
  DateField,
  ShowButton,
  ReferenceManyField,
  Show,
  Tab,
  TabbedShowLayout,
  TextField,
  Button,
  Link
} from 'react-admin';
import EditIcon from '@material-ui/icons/Edit';
import AddItemButton from './AddItemButton';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  button: {
    marginTop: '1em'
  }
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

const AuctionShow = props => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="Summary">
        <TextField label="Auction Id" source="id" />
        <DateField
          label="Auction Date"
          source="date"
          showTime
          options={{
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          }}
        />
        <TextField lable="Description" source="description" />
        <EditAuctionButton />
      </Tab>
      <Tab label="Items" path="items">
        <ReferenceManyField
          addLabel={false}
          reference="auctionItems"
          target="auction_id"
          sort={{ field: 'title', order: 'DESC' }}
        >
          <Datagrid>
            <DateField source="created_at" />
            <TextField source="title" />
            <TextField source="description" />
            <ShowButton />
          </Datagrid>
        </ReferenceManyField>
        <AddItemButton />
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default AuctionShow;
