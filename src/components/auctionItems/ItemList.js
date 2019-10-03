import React from 'react';
import {
  Datagrid,
  DateField,
  List,
  ReferenceField,
  Responsive,
  ShowButton,
  SimpleList,
  TextField
} from 'react-admin';

const ItemList = props => (
  <List {...props}>
    <Responsive
      small={<SimpleList linkType="show" primaryText={record => record.title} />}
      medium={
        <Datagrid>
          <TextField source="id" />
          <DateField source="created_at" />
          <TextField source="title" />
          <TextField source="description" />
          <ReferenceField resource="items" source="auction_id" reference="auctions">
            <TextField source="description" />
          </ReferenceField>
          <ShowButton />
        </Datagrid>
      }
    />
  </List>
);

export default ItemList;
