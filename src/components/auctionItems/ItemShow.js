import React from 'react';
import { DateField, ReferenceField, Show, SimpleShowLayout, TextField } from 'react-admin';

const ItemShow = props => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="id" />
        <ReferenceField source="auction_id" reference="auctions" linkType="show">
          <TextField source="description" />
        </ReferenceField>
        <ReferenceField
          label="Auction Date"
          source="auction_id"
          reference="auctions"
          linkType={false}
        >
          <DateField source="date" showTime />
        </ReferenceField>
        <DateField source="created_at" />
        <TextField source="title" />
        <TextField source="description" />
      </SimpleShowLayout>
    </Show>
  );
};

export default ItemShow;
