import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Datagrid, List, Filter, TextField, TextInput, ShowButton, EditButton } from 'react-admin';

const styles = theme => ({
  title: {
    maxWidth: '20em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});

const HouseFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="title" alwaysOn />
  </Filter>
);

export const HouseList = withStyles(styles)(({ permissions, classes, ...props }) => {
  return (
    <List {...props} filters={<HouseFilter />}>
      <Datagrid>
        <TextField source="name" />
        <ShowButton label="" />
        <EditButton label="" />
      </Datagrid>
    </List>
  );
});

export default HouseList;
