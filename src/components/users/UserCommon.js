import React from "react";
import { TextInput, required } from "react-admin";

const UserTitle = data => {
  return <div>User: {data.record ? `${data.record.email}` : ""}</div>;
};

const AuctioneerFields = ({ record, ...rest }) => {
  const { userType } = rest;
  return userType && userType === "Sq3wCWFRvfQH5E0OVKFE" ? (
    <TextInput
      source="licenseNumber"
      record={record}
      {...rest}
      validate={required()}
    />
  ) : null;
};

export { AuctioneerFields, UserTitle };
