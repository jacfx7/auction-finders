import React from 'react';
import {
  Create,
  TextInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  required
} from 'react-admin';
import { parse } from 'query-string';

const today = new Date();

const ItemCreate = props => {
  const { auction_id: auction_id_string } = parse(props.location.search);
  const auction_id = auction_id_string;
  const redirect = auction_id ? `/auctions/${auction_id}/show/items` : false;

  return (
    <Create {...props}>
      <SimpleForm defaultValue={{ created_at: today, auction_id }} redirect={redirect}>
        <ReferenceInput source="auction_id" reference="auctions" allowEmpty validate={required()}>
          <SelectInput optionText="description" />
        </ReferenceInput>
        <TextInput disabled source="created_at" />
        <TextInput source="title" />
        <TextInput source="description" />
      </SimpleForm>
    </Create>
  );
};

export default ItemCreate;
