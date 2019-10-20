import * as React from "react";
import {
  Edit,
  DisabledInput,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  required
} from "react-admin";

export const UserEdit = props => {
  console.log("Props:", props);
  return (
    <Edit {...props}>
      <SimpleForm>
        <DisabledInput source="id" />
        <ReferenceInput source="userTypeId" reference="userTypes" allowEmpty validate={required()}>
          <SelectInput optionText="name" />
        </ReferenceInput>
        <DisabledInput source="createdate" />
        <DisabledInput source="lastupdate" />
        <TextInput source="name" />
        <TextInput source="email" />
        <AuctioneerFields {...props} />
      </SimpleForm>
    </Edit>
  );
};

export default UserEdit;

const AuctioneerFields = ({ record, ...rest }) =>
  record && record.userTypeId === "Sq3wCWFRvfQH5E0OVKFE" ? (
    <TextInput source="licenseNumber" record={record} {...rest} />
  ) : null;
