import React from 'react';
import { Create, DateTimeInput, TextInput, SimpleForm, required } from 'react-admin';

const today = new Date();

const AuctionCreate = props => {
  return (
    <Create {...props}>
      <SimpleForm defaultValue={{ date: today }}>
        <DateTimeInput source="date" validate={required()} />
        <TextInput multiline source="description" />
      </SimpleForm>
    </Create>
  );
};

export default AuctionCreate;
