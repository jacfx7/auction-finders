import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Edit,
  DisabledInput,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  required
} from "react-admin";

import { AuctioneerFields, UserTitle } from "@/components/users/UserCommon";

class UserEditView extends Component {
  render() {
    const { hasCreate, hasShow, ...rest } = this.props;
    return (
      <Edit title={<UserTitle />} {...rest}>
        <SimpleForm>
          <DisabledInput source="id" />
          <ReferenceInput
            source="userTypeId"
            reference="userTypes"
            allowEmpty
            validate={required()}
          >
            <SelectInput optionText="name" />
          </ReferenceInput>
          <DisabledInput source="createdate" />
          <DisabledInput source="lastupdate" />
          <TextInput source="name" validate={required()} />
          <TextInput source="email" validate={required()} />
          <AuctioneerFields {...rest} />
        </SimpleForm>
      </Edit>
    );
  }
}

const mapStateToProps = state => {
  const formField = state.form["record-form"]
    ? state.form["record-form"].values
    : { userTypeId: "0" };
  return { userType: formField.userTypeId };
};

const UserEdit = connect(mapStateToProps)(UserEditView);

export default UserEdit;
