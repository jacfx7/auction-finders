import UserIcon from "@material-ui/icons/People";

import UserList from "@/components/users/UserList";
import UserShow from "@/components/users/UserShow";
import UserEdit from "@/components/users/UserEdit";

const UserViews = {
  list: UserList,
  edit: UserEdit,
  show: UserShow,
  icon: UserIcon
};

export default UserViews;
