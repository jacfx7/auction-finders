import * as React from 'react';
import { Create, TextField, TextInput, SimpleForm } from 'react-admin';

export const UserCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="name" />
      <TextField source="email" />
    </SimpleForm>
  </Create>
);

export default UserCreate;
