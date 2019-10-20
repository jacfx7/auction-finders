import * as React from "react";
import {
  Create,
  TextField,
  TextInput,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  required
} from "react-admin";

export const UserCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <ReferenceInput source="userTypeId" reference="userTypes" allowEmpty validate={required()}>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="name" />
      <TextField source="email" />
    </SimpleForm>
  </Create>
);

export default UserCreate;
