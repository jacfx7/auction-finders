import HomeIcon from "@material-ui/icons/Home";
import HouseList from "@/components/auctionHouse/HouseList";
import HouseCreate from "@/components/auctionHouse/HouseCreate";
import HouseEdit from "@/components/auctionHouse/HouseEdit";
import HouseShow from "@/components/auctionHouse/HouseShow";

const AuctionHouseViews = {
  list: HouseList,
  create: HouseCreate,
  edit: HouseEdit,
  show: HouseShow,
  icon: HomeIcon
};

export default AuctionHouseViews; 
