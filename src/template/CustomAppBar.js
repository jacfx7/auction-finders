import React from "react";
import { AppBar } from "react-admin";

import CustomUserMenu from "@/template/CustomUserMenu";

const CustomAppBar = props => (
  <AppBar {...props} userMenu={<CustomUserMenu />} />
);
export default CustomAppBar;
