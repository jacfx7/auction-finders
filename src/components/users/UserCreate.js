import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Create,
  TextField,
  TextInput,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  required
} from 'react-admin';

class UserCreateView extends Component {
  render() {
    return (
      <Create {...this.props}>
        <SimpleForm>
          <TextInput source="id" />
          <ReferenceInput
            source="userTypeId"
            reference="userTypes"
            allowEmpty
            validate={required()}
          >
            <SelectInput optionText="name" />
          </ReferenceInput>
          <TextInput source="name" />
          <TextField source="email" />
        </SimpleForm>
      </Create>
    );
  }
}

const mapStateToProps = props => {};

const UserCreate = connect(mapStateToProps)(UserCreateView);

export default UserCreate;
