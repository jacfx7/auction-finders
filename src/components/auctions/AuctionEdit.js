import React from "react";
import {
  Edit,
  DateTimeInput,
  TextInput,
  SimpleForm,
  required
} from "react-admin";
import { AuctionTitle } from "@/components/auctions/AuctionCommon";

const today = new Date();

const AuctionEdit = props => {
  return (
    <Edit title={<AuctionTitle />} {...props}>
      <SimpleForm defaultValue={{ date: today }}>
        <TextInput disabled label="Id" source="id" />
        <DateTimeInput source="date" validate={required()} />
        <TextInput multiline source="description" />
      </SimpleForm>
    </Edit>
  );
};

export default AuctionEdit;
