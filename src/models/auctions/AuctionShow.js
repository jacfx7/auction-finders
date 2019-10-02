import React from 'react';
import {
  Datagrid,
  DateField,
  ShowButton,
  ReferenceManyField,
  Show,
  Tab,
  TabbedShowLayout,
  TextField
} from 'react-admin';
import AddItemButton from './AddItemButton';

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
