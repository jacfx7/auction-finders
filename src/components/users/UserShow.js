import * as React from 'react';
import { Show, SimpleShowLayout, TextField } from 'react-admin';

export const UserShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="email" />
    </SimpleShowLayout>
  </Show>
);

export default UserShow;
