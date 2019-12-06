import * as React from "react";
import { Show, SimpleShowLayout, TextField } from "react-admin";

import { UserTitle } from "@/components/users/UserCommon";

export const UserShow = props => (
  <Show title={<UserTitle />} {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="email" />
    </SimpleShowLayout>
  </Show>
);

export default UserShow;
