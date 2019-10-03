import * as React from 'react';
import { Edit, DisabledInput, SimpleForm, TextInput } from 'react-admin';

export const UserEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <DisabledInput source="createdate" />
      <DisabledInput source="lastupdate" />
      <TextInput source="name" />
      <TextInput source="email" />
    </SimpleForm>
  </Edit>
);

export default UserEdit;
