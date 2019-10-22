import React, { Component } from 'react';
import { connect } from 'react-redux';
import { crudGetAll } from 'react-admin';
import { MuiThemeProvider } from 'material-ui/styles';

import NewAuctions from './NewAuctions';
import UpcomingAuctions from './UpcomingAuctions';
import ItemList from './ItemList';

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
    this.fetchAuctionItems();
  }

  fetchAuctions = () => {
    this.props.crudGetAll('auctions', {}, {}, 5000);
  };

  fetchAuctionItems = () => {
    this.props.crudGetAll('auctionItems', {}, {}, 5000);
  };

  render() {
    const thirtyDaysAgo = new Date();
    const thirtyDaysFuture = new Date();
    const sevenDaysFuture = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysFuture.setDate(thirtyDaysFuture.getDate() + 30);
    sevenDaysFuture.setDate(sevenDaysFuture.getDate() + 7);
    const { auctions, auctionItems, permissions } = this.props;
    let newAuctionCnt = 0;
    let thirtyDayAuctionCnt = 0;
    let sevenDayAuctionCnt = 0;

    const upcomingItems = [];
    let auctionList = auctions.filter(a => permissions && a.createdby === permissions.email);
    if (permissions && permissions.role === 'admin') {
      auctionList = auctions;
    }
    const sevenDayAuctionList = [];

    if (auctionList) {
      auctionList.map(a => {
        if (a.createdate > thirtyDaysAgo) {
          newAuctionCnt++;
        }
        if (a.date > Date.now() && a.date < thirtyDaysFuture) {
          thirtyDayAuctionCnt++;
          const f = auctionItems.filter(i => i.auction_id === a.id);

          if (f) {
            f.map(r =>
              upcomingItems.push({
                auctionId: a.id,
                auctionTitle: a.description,
                itemId: r.id,
                itemTitle: r.title,
                itemDescription: r.description
              })
            );
          }
        }
        if (a.date > Date.now() && a.date < sevenDaysFuture) {
          sevenDayAuctionCnt++;
          sevenDayAuctionList.push(a);
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
              <UpcomingAuctions
                value={thirtyDayAuctionCnt}
                title={'Auctions Happening in the Next 30 Days'}
              />
            </div>
            <div style={styles.singleCol}>
              <UpcomingAuctions
                value={sevenDayAuctionCnt}
                title={'Auctions Happening in the Next 7 Days'}
                auctionList={sevenDayAuctionList}
              />
            </div>
          </div>
          <div style={styles.rightCol}>
            <div style={styles.flex}>
              <ItemList
                items={upcomingItems}
                nb={upcomingItems.length}
                title={'Items on Auctions in the Next 30 Days'}
              />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state, props) => {
  const id = 'auctions';
  const auctions = state.admin.resources[id];
  const auctionList = [];
  for (let key in auctions.data) {
    auctionList.push(auctions.data[key]);
  }

  const itemsId = 'auctionItems';
  const items = state.admin.resources[itemsId];
  const itemList = [];
  for (let key in items.data) {
    itemList.push(items.data[key]);
  }
  return {
    auctions: auctionList,
    auctionItems: itemList,
    permissions: props.permissions
  };
};

const Dashboard = connect(
  mapStateToProps,
  { crudGetAll }
)(DashBoardView);

export default Dashboard;
