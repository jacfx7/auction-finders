import React from "react";
import { Edit, SimpleForm, DisabledInput } from "react-admin";

const HouseEdit = props => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <DisabledInput source="name" />
      </SimpleForm>
    </Edit>
  );
};

export default HouseEdit;
