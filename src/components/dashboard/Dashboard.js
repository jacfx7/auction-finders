import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Title } from 'react-admin';
import { connect } from 'react-redux';
import { crudGetMany } from 'react-admin';

class DashBoardView extends Component {
  componentDidMount() {
    this.fetchAuctions();
  }

  fetchAuctions = () => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    const { auctions, crudGetMany } = this.props;
    crudGetMany('auctions', 'createdate >' + d);

    console.log('auctions', auctions);
  };

  render() {
    return (
      <Card>
        <Title title="Welcome to the administration" />
        <CardContent>New content coming soon...</CardContent>
      </Card>
    );
  }
}

const mapStateToProps = (state, props) => {
  const id = 'auctions';
  const auctions = state.admin.resources[id];
  console.log('map', state.admin.resources[id]);
  return {
    auctions
  };
};

const Dashboard = connect(
  mapStateToProps,
  { crudGetMany }
)(DashBoardView);
export default Dashboard;
