import React from 'react';
import {
  Edit,
  DateTimeInput,
  LongTextInput,
  SimpleForm,
  required,
  DisabledInput
} from 'react-admin';

const today = new Date();

const AuctionEdit = props => {
  return (
    <Edit {...props}>
      <SimpleForm defaultValue={{ date: today }}>
        <DisabledInput label="Id" source="id" />
        <DateTimeInput source="date" validate={required()} />
        <LongTextInput source="description" />
      </SimpleForm>
    </Edit>
  );
};

export default AuctionEdit;
