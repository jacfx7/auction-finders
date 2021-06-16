import React from "react";
import { Edit, SimpleForm, TextInput } from "react-admin";

const HouseEdit = props => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled source="name" />
      </SimpleForm>
    </Edit>
  );
};

export default HouseEdit;
