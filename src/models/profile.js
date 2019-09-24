import React from 'react';
import { Edit, TextInput, SimpleForm, required } from 'react-admin';

export const ProfileEdit = ({ staticContext, ...props }) => {
  return (
    <Edit
      id="my-profile"
      resource="profile"
      title="My Profile"
      redirect={false} // I don't need any redirection here, there's no list page
      {...props}
    >
      <SimpleForm>
        <TextInput source="nickname" validate={required()} />
      </SimpleForm>
    </Edit>
  );
};
