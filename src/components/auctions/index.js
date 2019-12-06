import BookIcon from "@material-ui/icons/Book";
import AuctionList from "@/components/auctions/AuctionList";
import AuctionShow from "@/components/auctions/AuctionShow";
import AuctionCreate from "@/components/auctions/AuctionCreate";
import AuctionEdit from "@/components/auctions/AuctionEdit";

export default {
  create: AuctionCreate,
  list: AuctionList,
  edit: AuctionEdit,
  show: AuctionShow,
  icon: BookIcon
};
