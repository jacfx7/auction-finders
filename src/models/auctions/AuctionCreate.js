import React from 'react';
import { Create, DateTimeInput, LongTextInput, SimpleForm, required } from 'react-admin';

const today = new Date();

const AuctionCreate = props => {
  return (
    <Create {...props}>
      <SimpleForm defaultValue={{ date: today }}>
        <DateTimeInput source="date" validate={required()} />
        <LongTextInput source="description" />
      </SimpleForm>
    </Create>
  );
};

export default AuctionCreate;
