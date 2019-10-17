import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Title } from 'react-admin';
import { connect } from 'react-redux';
import { crudGetAll } from 'react-admin';
import NewAuctions from './NewAuctions';
import { MuiThemeProvider } from 'material-ui/styles';
import UpcomingAuctions from './UpcomingAuctions';

const styles = {
  welcome: { marginBottom: '2em' },
  flex: { display: 'flex' },
  leftCol: { flex: 1, marginRight: '1em' },
  rightCol: { flex: 1, marginLeft: '1em' },
  singleCol: { marginTop: '2em' }
};

class DashBoardView extends Component {
  componentDidMount() {
    this.fetchAuctions();
  }

  fetchAuctions = () => {
    this.props.crudGetAll('auctions', {}, {}, 5000);
  };

  render() {
    const thirtyDaysAgo = new Date();
    const thirtyDaysFuture = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysFuture.setDate(thirtyDaysFuture.getDate() + 30);
    const { auctions } = this.props;
    let newAuctionCnt = 0;
    let upcomingAuctionCnt = 0;
    if (auctions) {
      auctions.map(a => {
        if (a.createdate > thirtyDaysAgo) {
          newAuctionCnt++;
        }
        debugger;
        if (a.date > Date.now() && a.date < thirtyDaysFuture) {
          upcomingAuctionCnt++;
        }
        return newAuctionCnt;
      });
    }

    return (
      <MuiThemeProvider>
        <div style={styles.flex}>
          <div style={styles.leftCol}>
            <div style={styles.flex}>
              <NewAuctions value={newAuctionCnt} />
              <UpcomingAuctions value={upcomingAuctionCnt} />
            </div>
            <div style={styles.singleCol}></div>
          </div>
          <div style={styles.rightCol}>
            <div style={styles.flex}></div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state, props) => {
  const id = 'auctions';
  const auctions = state.admin.resources[id];
  console.log('map', state.admin.resources[id]);
  const auctionList = [];
  for (let key in auctions.data) {
    auctionList.push(auctions.data[key]);
  }
  return {
    auctions: auctionList
  };
};

const Dashboard = connect(
  mapStateToProps,
  { crudGetAll }
)(DashBoardView);
export default Dashboard;
