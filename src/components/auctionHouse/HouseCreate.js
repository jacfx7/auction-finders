import React from "react";
import { Create, SimpleForm, TextInput, required } from "react-admin";

const HouseCreate = props => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="name" validate={required()} />
      </SimpleForm>
    </Create>
  );
};

export default HouseCreate;
